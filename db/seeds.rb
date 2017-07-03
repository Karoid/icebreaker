# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Member.create(username: "관리자", email: 'kkk@kkk.com', password: 'kkkkkk')

# 16,17,19,20은 event_card
# 14, 15, 21은 wide_range_card
normal = CardPackage.create(name: "기본", description:"", cost: 0)
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-01.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-02.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-03.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-04.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-05.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-06.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-07.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-08.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-09.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-10.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-11.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-12.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-13.png")
normal.cards.create(type: "question_card", keyword: "", image_url:"/images/cards/card-18.png")

normal.cards.create(type: "wide_range_card", keyword: "", image_url:"/images/cards/card-14.png")
normal.cards.create(type: "wide_range_card", keyword: "", image_url:"/images/cards/card-15.png")
normal.cards.create(type: "wide_range_card", keyword: "", image_url:"/images/cards/card-21.png")

normal.cards.create(type: "event_card", keyword: "", image_url:"/images/cards/card-16.png")
normal.cards.create(type: "event_card", keyword: "", image_url:"/images/cards/card-17.png")
normal.cards.create(type: "event_card", keyword: "", image_url:"/images/cards/card-19.png")
normal.cards.create(type: "event_card", keyword: "", image_url:"/images/cards/card-20.png")
