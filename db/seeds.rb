# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Event.destroy_all
Story.destroy_all

stories_json = File.read("db/stories_data.json")
events_json = File.read("db/events_data.json")

stories_data= JSON.parse(stories_json)
events_data=JSON.parse(events_json)

Event.create!(events_data)
Story.create!(stories_data)
