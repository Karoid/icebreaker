module PgameController
  def ready_game
    if game_state == "ready"
      # 포인트 주는 코드
      current_user.player.update(point: 1)
      # 모든 플레이이어가 레디인지 확인
      current_room = current_user.player.room
      count_ready = 0
      current_room.players.each do |p|
        if p.point == 1
          count_ready += 1
        end
      end
      # 만약 시작이라면 시작하라는 BroadCast를 보낸다.
      if count_ready == current_room.players.length
        start_choose_game
      # 만약 시작이 아니라면 모든 플레이어에게 자신이 레디되었다고 보낸다
      else  
        WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "ready", player: current_user.player})
      end
    else
      # error라는 의미를 보내준다.
    end
  end
  
  
  def start_choose_game
    current_room = current_user.player.room
    
    # 각 플레이어 point 초기화
    current_room.players.each do |p|
      p.update(point: 0)
    end
    # 덱에 이번 판에 쓰일 카드정보를 랜덤으로 정렬하여 집어넣습니다
      # 모두에게 카드를 뽑아서 준다(Room(remain_deck) => Player(card_id))
      # 질문자를 랜덤으로 뽑아 설정합니다
    random_number = rand(current_room.players.length)
    if random_number != (current_room.players.length - 1)
      question_player = current_room.players[random_number]
      answer_player = current_room.players[random_number + 1]
    else 
      question_player = current_room.players[random_number]
      answer_player = current_room.players[0]
    end
    # 현재 방 정보를 ready에서 start로 바꿉니다
    current_room.update(action: "start", question_id: question_player.id, answer_id: answer_player.id)
    # 게임 시작 정보 전달
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data,
    {state: "start", question_player: question_player,answer_player: answer_player})
  end
end