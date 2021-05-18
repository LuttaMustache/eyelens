class CreateChapters < ActiveRecord::Migration[6.1]
  def change
    create_table :chapters do |t|
      t.string :title
      t.text :content
      t.integer :order

      t.timestamps
    end
    add_reference :chapters, :story, null: false, foreign_key: true
  end
end
