class EventPost < ApplicationRecord
  has_one_attached :image
  
  has_many :event_comments

  belongs_to :user
  
end
