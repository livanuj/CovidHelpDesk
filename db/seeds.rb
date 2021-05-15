# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


20.times.each do |i|
  Request.create(name: "test request #{i}", phone: "984112311#{i}", address: "test address", urgency: 2, request_type: i % 4, gender: i % 2, age: 40, no_of_requirements: 1)
end
AdminUser.create!(email: 'covid_admin@example.com', password: 'P@ssw0rd', password_confirmation: 'P@ssw0rd') if Rails.env.development?