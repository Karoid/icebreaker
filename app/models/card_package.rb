class CardPackage < ActiveRecord::Base
  has_many :cards, foreign_key: :package_id
end
