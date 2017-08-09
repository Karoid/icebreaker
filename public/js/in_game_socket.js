var url = window.location.hostname
if(window.location.port!=""){
  url+=':'+window.location.port
}
var dispatcher = new WebSocketRails(url+'/websocket');
var url_array = window.location.pathname.split("/")
var room_code = window.location.pathname.split("/")[url_array.length - 1]
var channel = dispatcher.subscribe('room_'+room_code);
var message = {room_code: room_code}
var initial_room_state = new Object()
var timer_tag = new Object()

var Melting_Talk_Logic = {
  onload: function(){
    /***** trigger *****/
    dispatcher.trigger('game.info',message);

    /***** bind *****/

    dispatcher.bind('game.info', initialize_game);
    
    dispatcher.bind('game.get_card', change_card);
    
    channel.bind('game_data', do_game_from_broadcast);
    
    channel.bind('player_disconnect', function(data) {
      $('.id_'+data.player_info.id).hide().removeClass('.id_'+data.player_info.id)
    });
  },
  ready: function(data){
    /***** trigger *****/
    $("#readybutton").click(function(){
      dispatcher.trigger('game.ready_game');
      $('#readybutton').attr('disabled','true').html('waiting')
    });
    
    /***** bind *****/
    // 참여된 방에서 사용자가 접속하면 사용자를 추가합니다.
    channel.bind('player_enter', function(data) {
      initial_room_state.player_info.push(data.player_info)
      index = initial_room_state.player_info.length
      el = data.player_info
      console.log(index,el, $('.users>.user'+(index+1)))
      $('.users>div.section>.user'+(index+1)).css("display","inline-block").addClass("id_"+el.id).children('.player_username').html(el.username)
    });
  },
  start: function(data){
   // $('.users').removeClass('ready').children(".section").children("div").css("background","");
  }
}

function initialize_game(data) {
  console.log(data)
  
  initial_room_state = data
  state = data.room_info.action
  initialize_player(data)
  
  switch (state) {
  case 'ready':
    Melting_Talk_Logic.ready(data);
    break;
  case 'start':
    Melting_Talk_Logic.start(data);
    break;
  }
  
}

function initialize_player(data){
  // 플레이어 데이터를 읽어서 표시합니다.
  $('.users>div.section>div').not(".ready").hide()
  data.player_info.forEach(function(el,index) {
    html_element = $('.users>div.section>.user'+(index+1))
    html_element.css("display","inline-block").addClass("id_"+el.id).children('.player_username').html(el.username)
    if(el.point == 1 && data.room_info.action == 'ready'){
      do_ready(el)
    }
  });
}

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
  
  console.log("모든 데이터 " + data + "\n",
  "내 카드 데이터 " + card_info + "\n",
  "질문자 데이터 " + title_info + "\n")
  //그 카드의 정보를 화면에 띄운다

  var image_url = card_info.image_url;
  var type = card_info.type;
  var point = card_info.point;
  var keyword = card_info.keyword;
  var content = card_info.description;
  $("#text_name").html(keyword)
  $("#text_content").html(content)
  $("#card_image").attr('src',image_url);
  $("#text_num").html(point)
  $("#topic").html(title_info.keyword);
  $('#c_card_image').attr('src',title_info.image_url);
  switch (type) {
      case "question_card":
          $("#text_type").html("Q")
      case "wide_rage_card":
          $("#text_type").html("☆")
      case "event_card":
          $("#text_type").html("E")
  }
}