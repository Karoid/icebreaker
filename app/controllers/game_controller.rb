class GameController < WebsocketRails::BaseController
  include PgameController
  include NgameController

  def initial_connection
    if message[:text]
      send_message :connection_success, {message: 'web socket connected'}, :namespace => 'game'
    else
      send_message :connection_success, {message: 'web socket connection failed'}, :namespace => 'game'
    end
  end

  def room_connect
    connecting_room = Room.find_by_code(message)
    if connecting_room != nil && (connecting_room.action == "ready" || Player.where(room_id: connecting_room.id, user_id: current_user.id))
      puts message
      room_id = Room.select(:id).where(code: message).limit(1)[0].id
      
      unless Player.where(user_id: current_user.id, room_id: room_id).exists?
         player = current_user.player || Player.new
         player.user_id = current_user.id
         player.room_id = room_id
         player.username = current_user.username
         player.save
         WebsocketRails[("room_"+message).to_sym].trigger(:player_enter, {player_info: player})
      end
      send_message :room_connect_status, {message: 'room connection success', status:true}, :namespace => 'game'
    else
      send_message :room_connect_status, {message: 'There is no room', status:false}, :namespace => 'game'
    end
  end

  def info
    room = Room.where(code: message["room_code"]).limit(1)[0]
    send_message :info, {player_info: room.players, room_info:room}, :namespace => 'game'
  end

  def room_disconnect
    player = Player.where(user_id: current_user.id).limit(1)[0]
    room   = Room.where(code: message["room_code"]).limit(1)[0]
    if room.action == "ready" && player.destroy
      WebsocketRails[("room_"+message["room_code"]).to_sym].trigger(:player_disconnect, {player_info: player})
    end
    if room.players.length == 0
      room.destroy
    end
  end
  
  def game_state
    # 현재 room의 상태를 return 하는 메소드
    current_room = current_user.player.room
    return current_room.action
  end

  def ngame
    current_player = current_user.player
    puts Room.find(current_player.room_id).action
    case Room.find(current_player.room_id).action
      when "start" then turn_question_end
      when "question" then turn_question_end
      when "turn_question_end" then turn_answer_end
      when "turn_answer_end" then turn_questioner_answer_end
      when "turn_questioner_answer_end" then question
    end
    
  end

end
