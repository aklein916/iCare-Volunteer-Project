# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Event.destroy_all
Story.destroy_all

event1 = Event.create!(title:  "Need volunteers to mentor DCPS/DCPCS students!", organizer: "College Bound", focus_area: "Children & Youth, Community Development", address: "128 M St NW, Washington, DC")
event2 = Event.create(title: "Skilled Volunteers Needed For Seniors", organizer: "AHC Inc.- Charter House", focus_area: "Seniors", address: "Silver Spring, 20910")
