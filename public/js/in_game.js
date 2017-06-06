//접속시
var url = window.location.hostname+':'+window.location.port
var dispatcher = new WebSocketRails(url+'/websocket');
var url_array = window.location.pathname.split("/")
var room_code = window.location.pathname.split("/")[url_array.length - 1]
var channel = dispatcher.subscribe('room_'+room_code);
var message = {room_code: room_code}

dispatcher.trigger('game.info',message);

dispatcher.bind('game.player_info', function(text) {
  console.log(text);
});

channel.bind('player_disconnect', function(text) {
  alert(text);
});
//나갈때
$(window).bind('beforeunload', function() {
    //확인 창을 띄우지 않으려면 아무 내용도 Return 하지 마세요!! (Null조차도)
    return '게임을 나가시겠습니까?'
});
$(window).unload(function(){
  dispatcher.trigger('game.disconnect', message);
});
