class User < ApplicationRecord
  has_secure_password
  has_one_attached :image
  belongs_to :organization
  belongs_to :department
  has_many :news_posts
  has_many :news_comments, through: :news_posts
  has_many :event_posts
  has_many :event_comments, through: :event_posts
end
