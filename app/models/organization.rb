class Organization < ApplicationRecord
    has_many :departments
    has_many :users, through: :departments
    has_many :news_posts, through: :divisions
    has_many :event_posts, through: :divisions
end
