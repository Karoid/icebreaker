//접속시
var url = window.location.hostname
if(window.location.port!=""){
  url+=':'+window.location.port
}
var dispatcher = new WebSocketRails(url+'/websocket');
var url_array = window.location.pathname.split("/")
var room_code = window.location.pathname.split("/")[url_array.length - 1]
var channel = dispatcher.subscribe('room_'+room_code);
var message = {room_code: room_code}
var x = new Object()

//게임 진행사항을 전달받는다.

dispatcher.trigger('game.info',message);

channel.bind('game_data', function(data) {
  console.log(data)
  switch (data.state) {
    case 'ready':
      do_ready(data.player);
      break;
    case 'start':
      $('.users').removeClass('ready').children(".section").children("div").css("background","");
      break;
  }
});

dispatcher.bind('game.player_info', function(data) {
  x = data
  $('.users>div.section>div').not(".ready").hide()
  data.player_info.forEach(function(el,index) {
    html_element = $('.users>div.section>.user'+(index+1))
    html_element.css("display","inline-block").addClass("id_"+el.id).children('.player_username').html(el.username)
    if(el.point == 1 && data.room_info.action == 'ready'){
      do_ready(el)
    }
  });
});

channel.bind('player_enter', function(data) {
  x.player_info.push(data.player_info)
  index = x.player_info.length
  el = data.player_info
  console.log(index,el, $('.users>.user'+(index+1)))
  $('.users>div.section>.user'+(index+1)).css("display","inline-block").addClass("id_"+el.id).children('.player_username').html(el.username)
});

channel.bind('player_disconnect', function(data) {
  $('.id_'+data.player_info.id).hide().removeClass('.id_'+data.player_info.id)
});

//나갈때
$(window).bind('beforeunload', function() {
    //확인 창을 띄우지 않으려면 아무 내용도 Return 하지 마세요!! (Null조차도)
    return '게임을 나가시겠습니까?'
});
$(window).unload(function(){
  dispatcher.trigger('game.disconnect', message);
});