class GameController < WebsocketRails::BaseController
  def initial_connection
    if message[:text]
      send_message :connection_success, {message: 'web socket connected'}, :namespace => 'game'
    else
      send_message :connection_success, {message: 'web socket connection failed'}, :namespace => 'game'
    end
  end
  
  def room_connect
    
    code = Room.find(roomcode)
    
    #if code != nil
    #  send_message :room_connect_success, {message: 'room connection success'}, :namespace => 'game'
    #else
    #  send_message :room_connect_success, {message: 'room connection failed'}, :namespace => 'game'
    #end
  end
end
