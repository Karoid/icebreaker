module NgameController
  
  def turn_question_end
    current_room = current_user.player.room
    question_player = current_room.question_id
    answer_player = current_room.answer_id
    # 질문이 끝났다는 것을 받은 후
    if current_room.action == "question"
      
      
    end
    # 방의 상태를 바꾼다(답변중의 상태로)(state)
    # 답변자의 타이머 종료 시간을 방 정보에 추가한다(Room(timeout))
    # 질문이 끝났다는 정보를 Broadcast 한다.
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
    {state: "turn_question_end", question_player: question_player,answer_player: answer_player})
  end
  
  def turn_answer_end
    # 답변이 끝났다는 것을 받은 후
    # 방의 상태를 바꾼다(질문자 답변중의 상태로)(state)
    # 질문자 답변의 타이머 종료 시간을 방 정보에 추가한다(Room(timeout))
    # 답변이 끝났다는 정보를 Broadcast 한다
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
    {state: "turn_answer_end", question_player: question_player,answer_player: answer_player})
  end
  
  def turn_questioner_answer_end
    # 질문자 답변이 끝났다는 것을 받은 후
    # 질문자의 카드를 버린다(Player(card_id) => Room(abandon_deck) )
    # 질문자에게 카드를 뽑아서 준다(Room(remain_deck) => Player(card_id))
    # 방의 상태를 바꾼다(질문 받는중의 상태로)(state)
    # 질문자 답변이 끝났다는 정보를 Broadcast 한다
    
  end
  
  def question
    current_room = current_user.player.room
    if current_room.action == "start" #방 시작할 때는 질문자 답변자 switching이 필요없어서 상태검사하여 실행
      question_player = current_room.question_id
      answer_player = current_room.answer_id
    
      current_room.update(action: "question", question_id: question_player.id, answer_id: answer_player.id)
    else
    # 본인이 질문한다는 의사를 표시한 후
    
    # 이전의 질문자를 답변자로 설정하고, 현재 신청한 사람을 질문자로 설정한다.(Room(question_id,answer_id))
    current_room.update(answer_id: current_room.question_id)
    answer_player = current_room.answer_id
=begin
    질문 신청한 사람 정보 받아오기
    current_room.update(question_id: )
    question_player = current_room.question_id
    
=end
    # 질문자의 타이머 종료 시간을 방 정보에 추가한다(Room(timeout))
    # 방의 상태를 질문중으로 바꾼다
    current_room.update(action: "question", question_id: question_player.id, answer_id: answer_player.id)
    end
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
    {state: "question", question_player: question_player,answer_player: answer_player})
  end
  
end
