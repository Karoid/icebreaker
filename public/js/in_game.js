//onload
$(document).ready(Melting_Talk_Logic.onload)

//나갈때
$(window).bind('beforeunload', function() {
  //확인 창을 띄우지 않으려면 아무 내용도 Return 하지 마세요!! (Null조차도)
  return '게임을 나가시겠습니까?'
});
$(window).unload(function(){
  dispatcher.trigger('game.disconnect', message);
});

function Clock(total_time, side){
  var slider = $("div.rkmd-slider>input")
  var slider_rkmd = $("div.rkmd-slider")
  var time = 0
  //slider 길이를 total_time으로 바꾼다.
  slider.attr('max',total_time)
  // 슬라이더 초기화
  if (slider_rkmd.find('.slider-fill')) {
    var slider_fill    = slider_rkmd.find('.slider-fill');
    var slider_handle  = slider_rkmd.find('.slider-handle');
    slider_fill.attr('style','')
    slider_handle.attr('style','')
  }
  //1초마다 값을 1씩 올린다
  var timer = setInterval(function(){
    time += 1
    $('.rkmd-slider').rkmd_rangeSlider({value: time, max: total_time}, side);
  },1000)
  // total_time에 도달하면 인터벌을 끝낸다
  setTimeout(function() {clearInterval(timer)}, 1000*total_time);
  return timer
}


function audio_button () {
  var button_audio = new Audio('/sounds/ButtonPush.mp3')
  $('.button').click(function() {
    button_audio.play();
  });
}


//메뉴바
function menu_bar_initialize() {
  $(".btn").click(function() {
    $("#menu,.page_cover,html").addClass("open");
  });
  
  window.onhashchange = function() {
    if (location.hash != "#open") {
      $("#menu,.page_cover,html").removeClass("open");
    }
  }
  
  $('.close').click(function(){
    $("#menu,.page_cover,html").removeClass("open");
  })
  
  $('.page_cover').click(function(){
    $("#menu,.page_cover,html").removeClass("open");
  })
};


function change_card(data){
  //덱에서 맞는 카드를 찾는다
  var my_card_id, title_card_id
  var card_info, title_info = new Object()

  for (var j = 0; j < data.player_info.length; j++) {
    if (data.player_info[j].id == my_player_id) {
      my_card_id = data.player_info[j].card_id
    }
    if (data.player_info[j].id == data.room_info.question_id) {
      title_card_id = data.player_info[j].card_id
    }
  }
  for (var i = 0; i < data.deck_info.length; i++) {
      if (data.deck_info[i].id == my_card_id) {
          card_info = data.deck_info[i]
      }
      
      if (data.deck_info[i].id == title_card_id) {
          title_info = data.deck_info[i]
      }
  }
  
  //그 카드의 정보를 화면에 띄운다

  console.log(card_info.type)

  $("#text_name").html(card_info.keyword)
  $("#text_content").html(card_info.description)
  $("#card_image").attr('src',card_info.image_url);
  $("#text_num").html(card_info.point)
  if (data.room_info.action == 'turn_questioner_answer_end') {
    $("#topic").html('질문 선택중');
    $('#c_card_image').attr('src','/images/cards/card-16.png');
  }else{
    $("#topic").html(title_info.keyword);
    $('#c_card_image').attr('src',title_info.image_url);
  
  }
  switch (card_info.type) {
      case "question_card":
          $("#text_type").html("Q")
          break;
      case "wide_range_card":
          $("#text_type").html("★")
          break;
      case "event_card":
          $("#text_type").html("E")
          break;
  }
  var audio = new Audio('/sounds/WooshMark.mp3')
  audio.play()
}

function find_player_with_player_id(data,player_id){
  var r
  data.player_info.forEach(function(element, index){
    if (element.id == player_id) {
      r = element
    }
  })
  
  return r
}