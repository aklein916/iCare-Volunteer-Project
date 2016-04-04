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
event2 = Event.create!(title: "Skilled Volunteers Needed For Seniors", organizer: "AHC Inc.- Charter House", focus_area: "Seniors", address: "Silver Spring, 20910")



story1 = Story.create!(name: "Alexa Klein", age: 25, cause: "Social Justice", photo_url: "https://media.licdn.com/media/AAEAAQAAAAAAAAYHAAAAJGE2OWQ0ZDk2LTE1MTctNDc4Mi05ZWUzLTE5ZTExOTUwZTM4OA.jpg", :story "Throughout my childhood the importance of gving back has been a major part of my life. My family instilled in me the Jewish idea of 'Tikun Olam', repairing the world. I have taken this value with me through many stages of my life, and feel it is my responsibility as a citizen of the world to help those less fortunate and strive to make the world a better place for all.")
story2 = Story.create!(name: "Brittany Branson", age: 25, cause: "Art and Culture", photo_url: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAWyAAAAJDM3ZTljZjE1LTM0YTUtNDk5ZS04MTQxLWI0OTZjYjk5ZDlhMA.jpg", story: "I have always loved the arts, and have fond memories of going to art class or heading into NYC to see Broaway shows with my mom. After becoming a public charter school teacher after college, I learned first hand how important it is for young kids to have access to quality arts education and experiences. I volunteer to ensure every kid in DC does!")
story3= Story.create!(name: "Farishta Haider", age: 34, cause: "Children", photo_url: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAO_AAAAJGE3MjljM2I1LTc3NWEtNGQ2MS04MTdlLWZiZWU5NDEyZjhjMg.jpg", story: "I have been babysitting and taking care of kids since I was 14. I am a big kid myself so I can relate to them.")
