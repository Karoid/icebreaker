class GameController < WebsocketRails::BaseController
  def initial_connection
    if message[:text]
      send_message :connection_success, {message: 'web socket connected'}, :namespace => 'game'
    else
      send_message :connection_success, {message: 'web socket connection failed'}, :namespace => 'game'
    end
  end

  def room_connect
    if Room.find_by_code(message) != nil
      send_message :room_connect_status, {message: 'room connection success', status:true}, :namespace => 'game'

    else
      send_message :room_connect_status, {message: 'There is no room', status:false}, :namespace => 'game'
    end
  end

  def room_info
    room = Room.where(code: message["room_code"]).limit(1)[0]
    send_message :player_info, {player_info: room.players, room_info:room}, :namespace => 'game'
  end

  def room_disconnect
    Player.where(user_id: current_user.id).destroy_all
    WebsocketRails[("room_"+message["room_code"]).to_sym].trigger(:player_disconnect, {id: current_user.id})
    room = Room.where(code: message["room_code"]).limit(1)[0]
    if room.players.length == 0
      room.destroy
    end
  end

  def game_start

  end

end
