# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
puts '🌱 Seeding spices...'

Org = Organization.create({name: "Sample Company"})

hr =
  Division.create(
    { name: 'Human Resources', active: true. organization_id: Org.id},
  )
  sales =
  Division.create(
    { name: 'Sales', active: true, organization_id: Org.id},
  )

  warehouse =
  Division.create(
    { name: 'Warehouse', active: true, organization_id: Org.id},
  )
finance =
  Division.create({ name: 'Finance', active: true, organization_id: Org.id })
legal =
  Division.create({ name: 'Legal', active: true, organization_id: Org.id })
marketing =
  Division.create({ name: 'Marketing', active: true, organization_id: Org.id})
business_development =
  Division.create(
    { name: 'Business Development', active: true, organization_id: Org.id },
  )

departments = [hr.id, finance.id, legal.id, marketing.id, business_development.id, sales.id, warehouse.id]
topics = ['retirement', 'benefits', 'town hall', 'incentives', 'recruitment']
locations = ['atrium', "Mike's Desk", 'Building 50', 'Downtown Courthouse']
Marcos =
  User.create(
    {
      owner:true  
      administrator: true,
      first_name: 'Marcos',
      last_name: 'Lopez',
     
      department_id: hr.id,
      email: 'marcos@company.com',
      password: '123456',
      position: 'VP of HR',
      phone: Faker::PhoneNumber.cell_phone,
      extension: Faker::PhoneNumber.extension,
      active: true,
      hire_date: Faker::Date.between(from: '2005-09-23', to: '2022-01-25'),
     
    },
  )
5.times do
  User.create(
    {
      owner:false
      administrator: false,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
     
      email: Faker::Internet.email,
      password: '123456',
      position: Faker::Job.title,
      phone: Faker::PhoneNumber.cell_phone,
      extension: Faker::PhoneNumber.extension,
      active: true,
      hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
      department: hr.id,
    },
  )
end

5.times do
  User.create(
    {
        owner:false
        administrator: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
       
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department: sales.id,
      },
  )
end

5.times do
  User.create(
    {
        owner:false
        administrator: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
       
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department: finance.id,
      },
  )
end

5.times do
  User.create(
    {
        owner:false
        administrator: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
       
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department: legal.id,
      },
  )
end

5.times do
  User.create(
    {
        owner:false
        administrator: false,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
       
        email: Faker::Internet.email,
        password: '123456',
        position: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        extension: Faker::PhoneNumber.extension,
        active: true,
        hire_date: Faker::Date.between(from: '2014-09-23', to: '2022-01-25'),
        department: departments.sample,
      },
  )
end

15.times do
  NewsPost.create(
    {
      title: Faker::Lorem.sentence(word_count: 3),
      content: Faker::Lorem.paragraph(sentence_count: 5),
      target: departments.sample
      claps: Faker::Number.within(range: 1..300),
      clicks: Faker::Number.within(range: 1..300),
      division_id: hr.id,
      user_id: Marcos.id,
      topic: topics.sample
    },
  )
end

17.times do
  EventPost.create(
    {
      title: Faker::Lorem.sentence(word_count: 3),
      content: Faker::Lorem.paragraph(sentence_count: 5),
      division_target: divisions.sample,
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
      division_id: hr.id,
      user_id: Marcos.id,
    },
  )
end

puts '✅ Done seeding!'
