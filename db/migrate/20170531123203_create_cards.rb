class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :type, null: false
      t.string :image_url
      t.integer :point, null: false, default: 1
      t.string :keyword, null: false
      t.string :description
      t.integer :package_id

      t.timestamps null: false
    end
  end
end
