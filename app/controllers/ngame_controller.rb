module NgameController
  def turn_question_end
    puts "질문완료 실행"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    question_player = Player.find(current_room.question_id)
    answer_player = Player.find(current_room.answer_id)
    if current_user.player.id == current_room.question_id
      current_room.update(action:"turn_question_end", timeout: (Time.now + 180))
      
      # 질문이 끝났다는 정보를 Broadcast 한다.
      WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
      {state: "turn_question_end", question_player: question_player, answer_player: answer_player})
    end
  end
  
  
  def turn_answer_end
    puts "답변자 답변완료 실행"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    question_player = Player.find(current_room.question_id)
    answer_player = Player.find(current_room.answer_id)
    if current_user.player.id == current_room.answer_id
      current_room.update(action:"turn_answer_end", timeout: (Time.now + 180))
      
      # 답변이 끝났다는 정보를 Broadcast 한다
      WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
      {state: "turn_answer_end", question_player: question_player, answer_player: answer_player})
    end
  end
  
  
  def turn_questioner_answer_end
    puts "질문자 답변완료 실행"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    question_player = Player.find(current_room.question_id)
    answer_player = Player.find(current_room.answer_id)
    card_id = question_player.card_id
    card_point = Card.find_by(id: card_id).point
    point = question_player.point
    
     # 만약 버리는 카드가 광역카드인데 이미 버려진 광역 카드가 있으면 게임 종료 상태로 넘어간다.

    if current_room.abandon_deck != nil
        values = [14, 15, 16, 17, 18].to_set
        abandon_deck = JSON.parse(current_room.abandon_deck)
        if ( abandon_deck.any?{|x| values.include?(x)} && values.include?(question_player.card_id)  )|| Player.find_by(point: 3)
          return vote_mvp
        end
    end

    if current_user.player.id == current_room.question_id
      # 질문자 답변이 끝났다는 것을 받은 후
        # 질문자의 카드를 버린다(Player(card_id) => Room(abandon_deck) )
        # 질문자에게 카드를 뽑아서 준다(Room(remain_deck) => Player(card_id))
        # 방의 상태를 바꾼다(질문 받는중의 상태로)(state)
       
      current_room.update(action:"turn_questioner_answer_end")
      question_player.update(point: point + card_point )

      # 질문자 답변이 끝났다는 정보를 Broadcast 한다
      WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
      {state: "turn_questioner_answer_end", question_player: question_player, answer_player: answer_player})
    end
    give_card_to_player(current_room.question_id)
    
  end
  
  
  def question
    puts "내가 질문하기 실행"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    question_player = Player.find(current_room.question_id)
    answer_player = Player.find(current_room.answer_id)
    
    if current_user.player.id != current_room.question_id 
      # 이전의 질문자를 답변자로 설정하고
      current_room.update(answer_id: question_player.id)
      answer_player = Player.find(current_room.answer_id)
      # 현재 신청한 사람을 질문자로 설정한다.
      current_room.update(question_id: current_user.player.id)
      question_player = Player.find(current_room.question_id)

      # 질문자의 타이머 종료 시간을 방 정보에 추가한다(Room(timeout))
      # 방의 상태를 질문중으로 바꾼다
      current_room.update(action: "question")
      WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
      {state: "question", question_player: question_player, answer_player: answer_player})
    end

  end
  
  def vote_mvp
    puts "mvp 선정하기"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    all_player = Player.where(room_id: current_room.id).all
    current_room.update(action: "vote_mvp")
    
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "vote_mvp", player_info: all_player})
    #return vote_result
    
  end
  
  def vote_result
    puts "mvp 알려주기"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    all_player = Player.where(room_id: current_room.id).all
    # 꼴찌는 answer_id로 저장 후 point초기화하여 투표수 저장 
    answer_player = all_player.minimum(:point)
    current_room.players.each do |p|
      if p.point != 0
        p.point=0
      end
    end
    
    #WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "vote_mvp", player_info: mvp})
    #return game_end
  end
  
  def game_end
    puts "게임 종료 알고리즘"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    # 방의 상태를 게임 종료로 전환한다
    current_room.update(action: "game_end")
    # 게임 점수를 비교하여 꼴찌를 알려준다.
    # 만약 동점으로 점수가 낮은 사람이 여러명일 경우 랜덤으로 골라서 뽑는다.
    
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "game_end"})
  end
  
end
