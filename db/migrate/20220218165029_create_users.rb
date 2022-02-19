class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.belongs_to :organization, null: false, foreign_key: true
      t.belongs_to :department, null: false, foreign_key: true
      t.boolean :owner
      t.boolean :admin
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :password_digest
      t.string :position
      t.string :phone
      t.string :extension
      t.boolean :active
      t.string :hire_date

      t.timestamps
    end
  end
end
