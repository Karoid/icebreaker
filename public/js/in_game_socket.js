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

var Melting_Talk_Logic = {
  onload: function(){
    /***** trigger *****/
    dispatcher.trigger('game.info',message);

    dispatcher.bind('game.info', initialize_game);
    
    /***** bind *****/
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
  initial_room_state = data
  state = data.room_info.action
  initialize_player(data)
  
  console.log(data)
  
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