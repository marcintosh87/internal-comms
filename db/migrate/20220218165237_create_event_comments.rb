class CreateEventComments < ActiveRecord::Migration[6.1]
  def change
    create_table :event_comments do |t|
      t.belongs_to :event_post, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.text :comment

      t.timestamps
    end
  end
end
