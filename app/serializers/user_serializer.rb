class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :owner, :admin, :first_name, :last_name, :email, :password, :password_digest, :position, :phone, :extension, :active, :image, :hire_date
  has_one :organization
  has_one :department

  def hired
    return self.object.hire_date.str_fmt = "%s-%s-%s"
  end

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
