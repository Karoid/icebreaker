class GameController < WebsocketRails::BaseController
  def initial_connection
    if message[:text]
      send_message :connection_success, {message: 'web socket connected'}, :namespace => 'game'
    else
      send_message :connection_success, {message: 'web socket connection failed'}, :namespace => 'game'
    end
  end

  def room_connect

    if message == '00000'
      send_message :room_connect_status, {message: 'room connection success', status:true}, :namespace => 'game'
    else
      send_message :room_connect_status, {message: 'room connection failed', status:false}, :namespace => 'game'
    end

=begin
    # 여기에 기존 코드를 작성해놓았습니다. 읽고 지워주세요
    # params 처럼 받은 정보는 message에 저장됩니다.
    code = Room.find(roomcode)

    if code != nil
      send_message :room_connect_success, {message: 'room connection success'}, :namespace => 'game'
    else
      send_message :room_connect_success, {message: 'room connection failed'}, :namespace => 'game'
    end
=end
  end
end
