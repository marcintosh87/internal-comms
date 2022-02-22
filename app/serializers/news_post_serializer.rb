class NewsPostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :content, :claps, :clicks, :topic, :target, :image
  has_one :user
  has_many :news_comments

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
