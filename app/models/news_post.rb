class NewsPost < ApplicationRecord
  belongs_to :user
  has_many :news_comments
  has_one_attached :main_image
end
