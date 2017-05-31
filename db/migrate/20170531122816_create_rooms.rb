class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.integer :code
      t.string :remain_deck
      t.string :abandon_deck
      t.integer :question_id
      t.integer :answer_id
      t.string :action
      t.datetime :timeout

      t.timestamps null: false
    end
  end
end
