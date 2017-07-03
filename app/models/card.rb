class Card < ActiveRecord::Base
  belongs_to :package, class_name: "CardPackage", dependent: :destroy
  has_many :players
  self.inheritance_column = :_type_disabled
end
