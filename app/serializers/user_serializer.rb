class UserSerializer < ActiveModel::Serializer
  attributes :id, :owner, :admin, :first_name, :last_name, :email, :password, :password_digest, :position, :phone, :extension, :active, :hire_date
  has_one :organization
  has_one :department
end
