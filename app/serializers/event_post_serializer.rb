class EventPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :claps, :clicks, :topic, :event_date, :event_time, :all_day, :event_location, :target
  has_one :user
end
