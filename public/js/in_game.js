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
function Clock(seconds) {
    var w = $('#bar').width();
    var maxWidth = $("#bar_bg").width();
    var percent = parseInt((w * 100) / maxWidth);
    var $bar = $('#bar');
    
    $bar.css('width',0).animate({
        width: maxWidth
    }, seconds*1000, function() {
        // after animate
        //$log.html('100 %');
    })
    //$('#log').html(percent + ' %');
}

$(document).ready(function() {
    Clock(100)
});
}