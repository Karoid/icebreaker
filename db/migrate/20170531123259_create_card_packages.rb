class CreateCardPackages < ActiveRecord::Migration
  def change
    create_table :card_packages do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :cost

      t.timestamps null: false
    end
  end
end
