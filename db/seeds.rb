# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
data= JSON.parse(File.read("db/stories_data.json", "db/events_data.json"))
Event.destroy_all
Event.create!(data)
Story.destroy_all
Story.create!(data)
