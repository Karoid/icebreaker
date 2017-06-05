class Room < ActiveRecord::Base
    has_one :question, class_name: 'Player'
    has_one :answer, class_name: 'Player'
end
