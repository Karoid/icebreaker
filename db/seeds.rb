# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(username: "Karoid", email: 'kkk@kkk.com', password: 'kkkkkk')
User.create(username: "Sun", email: 'asdf@asdf.asdf', password: '123456')
User.create(username: "DDDDDD", email: 'aaa@aa.com', password: 'abc123')
User.create(username: "myang", email:'a1a1a1@naver.com', password: 'a1a1a1')
User.create(username: "hee", email: 'gkdlfl1237@gmail.com', password: '123qwe')

# 16,17,19,20은 event_card
# 14, 15, 21은 wide_range_card
normal = CardPackage.create(name: "기본", description:"", cost: 0)
normal.cards.create(type: "question_card", keyword: "돈", image_url:"/images/cards/card-01.png", description: "주식에 투자할 돈 100만원이 있다면 어디에 투자하고싶습니까?")
normal.cards.create(type: "question_card", keyword: "사춘기", image_url:"/images/cards/card-02.png", description: "사춘기 시절과 지금의 당신은 얼마나 다른 사람인가요?")
normal.cards.create(type: "question_card", keyword: "친구", image_url:"/images/cards/card-03.png", description: "나의 가장 친한 친구는 어떤 사람인가요?")
normal.cards.create(type: "question_card", keyword: "이별", image_url:"/images/cards/card-04.png", description:"어린시절 당신의 이별은 어땠나요?")
normal.cards.create(type: "question_card", keyword: "자랑", image_url:"/images/cards/card-05.png", description: "나의 자랑거리는 무엇인가요?")
normal.cards.create(type: "question_card", keyword: "영웅", image_url:"/images/cards/card-06.png", description:"내가 영웅으로 생각하는 인물은 누구인가요?")
normal.cards.create(type: "question_card", keyword: "갈등", image_url:"/images/cards/card-07.png", description:"나는 갈등이 생기면 어떻게 해결하나요?")
normal.cards.create(type: "question_card", keyword: "열정", image_url:"/images/cards/card-08.png", description:"당신은 어떤 일에 주로 열정적인가요?")
normal.cards.create(type: "question_card", keyword: "절망", image_url:"/images/cards/card-09.png", description:"당신은 절망적일 때 어떤 행동을 하나요?")
normal.cards.create(type: "question_card", keyword: "직업", image_url:"/images/cards/card-10.png", description:"지구가 멸망위기에 처해 다른 직업을 가진 3명만 구할 수 있다면?")
normal.cards.create(type: "question_card", keyword: "영화", image_url:"/images/cards/card-11.png", description:"어떤 영화를 가장 인상깊게 보았나요?")
normal.cards.create(type: "question_card", keyword: "분노", image_url:"/images/cards/card-12.png", description:"당신은 주로 언제 분노를 느끼나요?")
normal.cards.create(type: "question_card", keyword: "음식", image_url:"/images/cards/card-13.png", description:"당신이 먹어본 특이한 음식에는 어떤 것들이 있나요?")

normal.cards.create(type: "wide_range_card", keyword: "흑역사", image_url:"/images/cards/card-14.png", description:"당신의 부끄럽고 창피한 경험을 알려주세요")
normal.cards.create(type: "wide_range_card", keyword: "별명", image_url:"/images/cards/card-15.png", description:"나의 독특한 별명을 나누어주세요")
normal.cards.create(type: "wide_range_card", keyword: "재사용", image_url:"/images/cards/card-16.png", description:"방금 버린 카드를 다시 가져와서 사용합니다")

normal.cards.create(type: "event_card", keyword: "역전", image_url:"/images/cards/card-17.png", description:"모든 플레이어의 점수를 초기화합니다")
normal.cards.create(type: "event_card", keyword: "조커", image_url:"/images/cards/card-18.png", description:"아무 질문이 가능합니다. 답변자의 질문이 괜찮은지에 따라 얻을 포인트를 결정합니다.")
normal.cards.create(type: "event_card", keyword: "조커", image_url:"/images/cards/card-19.png", description:"아무 질문이 가능합니다. 답변자의 질문이 괜찮은지에 따라 얻을 포인트를 결정합니다.")
normal.cards.create(type: "event_card", keyword: "무인도", image_url:"/images/cards/card-20.png", description:"당신이 무인도에 갇혔을 때 같이 게임하는 사람 중 절반만 데려갈 수 있다면 누구를?")
