class EventCommentSerializer < ActiveModel::Serializer
  attributes :id, :comment
  has_one :event_post
  has_one :user
end
