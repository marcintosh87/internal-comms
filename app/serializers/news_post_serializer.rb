class NewsPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :claps, :clicks, :topic, :target
  has_one :user
end
