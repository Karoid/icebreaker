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
function checkOrder(){
    var slider = $("div.rkmd-slider>input")
    if(slider.attr('invert') == true){
    slider.attr('invert', false)
    } else slider.attr('invert', true)
}
function Clock(total_time){
    var slider = $("div.rkmd-slider>input")
    var time = 0
    //slider 길이를 total_time으로 바꾼다.
    slider.attr('max',total_time)
    //1초마다 값을 1씩 올린다
    var timer = setInterval(function(){
        time += 1
        $('.rkmd-slider').rkmd_rangeSlider({value: time, max: total_time});
    },1000)
    // total_time에 도달하면 인터벌을 끝낸다
    setTimeout(function() {clearInterval(timer)}, 1000*total_time);
}
function changeCard(card){
    $("#text_type").html(card.type);
    $("#text_name").html(card.keyword);
    $("#text_content").html(card.description);
    $("#card_image").attr(src, card.image_url);
}

$(document).ready(function() {
    Clock(20)
    
});