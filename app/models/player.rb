class Player < ActiveRecord::Base
  belongs_to :room, dependent: :destroy
  has_one :user
end
