class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :room_id, null: false
      t.integer :user_id, null: false
      t.integer :point, null: false, default: 0
      t.integer :card_id
      t.string :card_buff
      t.string :username

      t.timestamps null: false
    end
  end
end
