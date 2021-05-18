class AddFieldsToStories < ActiveRecord::Migration[6.1]
  def change
    add_column :stories, :synopsis, :text
    add_reference :stories, :user, null: false, foreign_key: true
  end
end
