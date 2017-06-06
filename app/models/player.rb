class Player < ActiveRecord::Base
  belongs_to :room
  has_one :user
end
