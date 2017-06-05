class HomeController < ApplicationController
    
    def index
        
    end

    def create_room
       $r = Random.new.rand(0...9999)
       create = Room.new
       create.code = $r
       create.save
       host = Player.new
       host.user_id = current_user.id
       host.room_id = create.id
       host.point = 1
       host.save
       
       redirect_to '/home/join_room/'+$r.to_s
    end
    

    def join_room
        room_id = Room.where(code: params[:room_code]).limit(1)[0].id
        unless Player.where(user_id: current_user.id, room_id: room_id).exists?
           play = Player.new
           play.user_id = current_user.id
           play.room_id = room_id
           play.save
        end
       
       redirect_to '/home/game/'+$r.to_s
    end
    
    def game
    end

end
