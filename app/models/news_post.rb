class NewsPost < ApplicationRecord
  has_one_attached :image
  has_many :news_comments
  
  belongs_to :user
end
