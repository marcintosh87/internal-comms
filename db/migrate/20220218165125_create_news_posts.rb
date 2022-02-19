class CreateNewsPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :news_posts do |t|
      t.string :title
      t.text :content
      t.integer :claps
      t.integer :clicks
      t.belongs_to :user, null: false, foreign_key: true
      t.string :topic
      t.integer :target

      t.timestamps
    end
  end
end
