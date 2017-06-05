class HomeController < ApplicationController

   $r = Random.new.rand(0...9999)
    
    def create_room
       create = Room.new
       create.code = $r
       create.save
       
       redirect_to '/home/create_player'
    end
    
    
    def create_player 
       player_create = Player.new
       player_create.user_id = current_user.id
       player_create.room_id = $r
       player_create.save
       
       redirect_to '/home/check'
    end
    
    
    def check
        @room_create = Room.all
        @player_create = Player.all
    end
    

end
