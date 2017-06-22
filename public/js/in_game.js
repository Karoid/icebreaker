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

dispatcher.trigger('game.info',message);

dispatcher.bind('game.player_info', function(data) {
  x = data
  $('.users>div.section>div').not(".ready").hide()
  data.player_info.forEach(function(el,index) {
    $('.users>div.section>.user'+(index+1)).css("display","inline-block").addClass("id_"+el.id).children('.player_username').html(el.username)
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

//Front_timer

var mq = window.matchMedia( "(min-width: 1025px)" );
if (mq.matches) {
  // window width is more than 1025px(desktop!!!)
  $(document).ready(function() {
    var maxHeight = $("#bar_bg").height();
    var duration = 6000;
    var $log = $('#log');
    var timer;
    var $bar = $('#bar');
    Horloge(maxHeight);
    timer = setInterval('Horloge('+maxHeight+')', 100);

    $bar.animate({"bottom": "0px", "height": maxHeight}, duration, function() {
        $(this).css('background-color', 'red');
        $log.html('100 %');
        clearInterval(timer);
    });

});

function Horloge(maxHeight) {
    var w = $('#bar').height();
    var percent = parseInt((w * 100) / maxHeight);
    $('#log').html(percent + ' %');
}

} else {
  // window width is less than 1025px
$(document).ready(function() {
    var maxWidth = $("#bar_bg").width();
    var duration = 6000;
    var $log = $('#log');
    var timer;
    var $bar = $('#bar');
    Clock(maxWidth);
    timer = setInterval('Clock('+maxWidth+')', 100);

    $bar.animate({
        width: maxWidth
    }, duration, function() {
        $(this).css('background-color', 'black');
        $log.html('100 %');
        clearInterval(timer);
    });
});
function Clock(maxWidth) {
    var w = $('#bar').width();
    var percent = parseInt((w * 100) / maxWidth);
    $('#log').html(percent + ' %');
}
}
