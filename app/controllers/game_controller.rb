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
end
