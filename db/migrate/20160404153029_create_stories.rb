class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :name
      t.integer :age
      t.string :story
      t.string :cause
      t.string :photo_url
      t.timestamps null: false
    end
  end
end
