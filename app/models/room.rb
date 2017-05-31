class Room < ActiveRecord::Base
  has_one :question, class: Player
  has_one :answer, class: Player
end
