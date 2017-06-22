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
    if Room.find_by_code(message) != nil
      puts message
      room_id = Room.select(:id).where(code: message).limit(1)[0].id
      unless Player.where(user_id: current_user.id, room_id: room_id).exists?
         player = Player.new
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

  def room_info
    room = Room.where(code: message["room_code"]).limit(1)[0]
    send_message :player_info, {player_info: room.players, room_info:room}, :namespace => 'game'
  end

  def room_disconnect
    player = Player.where(user_id: current_user.id).limit(1)[0]
    room   = Room.where(code: message["room_code"]).limit(1)[0]
    if player.destroy
      WebsocketRails[("room_"+message["room_code"]).to_sym].trigger(:player_disconnect, {player_info: player})

      if room.players.length == 0
        room.destroy
      end
    end
  end

end
