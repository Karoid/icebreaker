module PgameController
  def ready_game
    if true #game_state == "ready"
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
    # 현재 방 정보를 ready에서 start로 바꿉니다
    current_room.action = "start"
    # 게임 시작 정보 전달
    WebsocketRails[("room_"+current_room.code.to_s).to_sym].trigger(:game_data, {state: "start", random_player: current_room.players.sample})
  end
end
