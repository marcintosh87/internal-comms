class DepartmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :active
  has_one :organization
end
