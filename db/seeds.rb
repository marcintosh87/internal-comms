# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
puts '🌱 Seeding spices...'

org = Organization.create({name: "Sample Company"})

hr =
  Department.create(
    { name: 'Human Resources', active: true, organization_id: org.id}
  )
  sales =
  Department.create(
    { name: 'Sales', active: true, organization_id: org.id}
  )

  warehouse =
  Department.create(
    { name: 'Warehouse', active: true, organization_id: org.id}
  )
finance =
  Department.create({ name: 'Finance', active: true, organization_id: org.id })
legal =
  Department.create({ name: 'Legal', active: true, organization_id: org.id })
marketing =
  Department.create({ name: 'Marketing', active: true, organization_id: org.id})
business_development =
  Department.create(
    { name: 'Business Development', active: true, organization_id: org.id }
  )

departments = [hr.id, finance.id, legal.id, marketing.id, business_development.id, sales.id, warehouse.id]
topics = ['retirement', 'benefits', 'town hall', 'incentives', 'recruitment']
locations = ['atrium', "Mike's Desk", 'Building 50', 'Downtown Courthouse']
Marcos =
  User.create(
    {
      owner:true,
      admin: true,
      first_name: 'Marcos',
      last_name: 'Lopez',
      organization_id: org.id,
      department_id: hr.id,
      email: 'marcos@company.com',
      password: '123456',
      position: 'VP of HR',
      phone: Faker::PhoneNumber.cell_phone,
      extension: Faker::PhoneNumber.extension,
      active: true,
      hire_date: Faker::Date.between(from: '2005-09-23', to: '2022-01-25'),
     
    }
  )
5.times do
  User.create(
    {
      owner:false,
      admin: false,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      organization_id: org.id,
      email: Faker::Internet.email,
      password: '123456',
      position: Faker::Job.title,
      phone: Faker::PhoneNumber.cell_phone,
      extension: Faker::PhoneNumber.extension,
      active: true,
      hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
      department_id: hr.id,
    }
  )
end

5.times do
  User.create(
    {
        owner:false,
        admin: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        organization_id: org.id,
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department_id: sales.id,
      }
  )
end

5.times do
  User.create(
    {
        owner:false,
        admin: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        organization_id: org.id,
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department_id: finance.id,
      }
  )
end

5.times do
  User.create(
    {
        owner:false,
        admin: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        organization_id: org.id,
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department_id: legal.id,
      }
  )
end

5.times do
  User.create(
    {
        owner:false,
        admin: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        organization_id: org.id,
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department_id: departments.sample,
      }
  )
end

15.times do
  NewsPost.create(
    {
      title: Faker::Lorem.sentence(word_count: 3),
      content: Faker::Lorem.paragraph(sentence_count: 5),
      target: departments.sample,
      claps: Faker::Number.within(range: 1..300),
      clicks: Faker::Number.within(range: 1..300),
     
      user_id: Marcos.id,
      topic: topics.sample
    }
  )
end

17.times do
  EventPost.create(
    {
      title: Faker::Lorem.sentence(word_count: 3),
      content: Faker::Lorem.paragraph(sentence_count: 5),
      target: departments.sample,
      claps: Faker::Number.within(range: 1..300),
      clicks: Faker::Number.within(range: 1..300),
      topic: topics.sample,
      event_date: Faker::Date.between(from: '2022-02-18', to: '2022-3-25'),
      event_time:
        Faker::Time.between(
          from: DateTime.now - 1,
          to: DateTime.now,
          format: :long,
        ),
      all_day: false,
      event_location: locations.sample,
     
      user_id: Marcos.id,
    }
  )
end

puts '✅ Done seeding!'
