module NgameController
  $count = 0
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
    if current_user.player.id == current_room.question_id
      # 질문자 답변이 끝났다는 것을 받은 후
        # 질문자의 카드를 버린다(Player(card_id) => Room(abandon_deck) )
        # 질문자에게 카드를 뽑아서 준다(Room(remain_deck) => Player(card_id))
        # 방의 상태를 바꾼다(질문 받는중의 상태로)(state)
       
      current_room.update(action:"turn_questioner_answer_end")
      #current_room.update(action: 'new_question')
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
    $count += 1
    puts $count
  end
  
  
  def game_end
    puts "게임 종료 알고리즘"
    current_player = current_user.player
    current_room = Room.find(current_player.room_id)
    
    current_room.update(action: "game_end")
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "game_end"})
    #if current_room.state ==  && $count == 3
    #   room.destry()
    #else
    #   WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "game_end"})
    #end
    
  end
  
end
