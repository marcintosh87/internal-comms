class NewsCommentSerializer < ActiveModel::Serializer
  attributes :id, :comment
  has_one :news_post
  has_one :user
end
