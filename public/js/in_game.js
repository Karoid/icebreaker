//ready button
$(document).ready(function(){
    $("#readybutton").click(function(){
      dispatcher.trigger('game.ready_game');
      $('#readybutton').attr('disabled','true').html('waiting')
    });
})

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

//action

function do_ready(player){
    console.log(player, player.id)
    $('.id_'+player.id).css('background','#00BCD4')
}