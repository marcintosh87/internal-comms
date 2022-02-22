class EventPostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :content, :claps, :clicks, :topic, :event_date, :event_time, :all_day, :event_location, :target, :image
  has_one :user
  has_many :event_comments
  
  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
