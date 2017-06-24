class HomeController < ApplicationController

    def index

    end

    def create_room
       $r = Random.new.rand(0...9999)
       room = Room.new
       room.code = $r
       room.action = "ready"
       room.save
       host = Player.new
       host.user_id = current_user.id
       host.room_id = room.id
       host.username = current_user.username
       host.save

    
       redirect_to '/home/game/'+$r.to_s
    end

    def game
      unless Room.where(code: params[:room_code]).limit(1).exists?
        redirect_to '/'
      end
    end

end
