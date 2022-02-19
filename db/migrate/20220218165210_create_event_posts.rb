class CreateEventPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :event_posts do |t|
      t.string :title
      t.text :content
      t.integer :claps
      t.integer :clicks
      t.belongs_to :user, null: false, foreign_key: true
      t.string :topic
      t.date :event_date
      t.time :event_time
      t.boolean :all_day
      t.string :event_location
      t.integer :target

      t.timestamps
    end
  end
end
