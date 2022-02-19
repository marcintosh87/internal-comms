class User < ApplicationRecord
  has_secure_password
  belongs_to :organization
  belongs_to :department
  has_one_attached :main_image
  has_many :news_posts
  has_many :news_comments, through: :news_posts
  has_many :event_posts
  has_many :event_comments, through: :event_posts
end
