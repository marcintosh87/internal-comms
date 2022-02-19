class EventPost < ApplicationRecord
  belongs_to :user
  has_many :event_comments
  has_one_attached :main_image
end
