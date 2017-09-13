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
      $('.id_'+data.player_info.id).remove()
    });
    
    menu_bar_initialize()
  },
  ready: function(data){
    /***** trigger *****/
    $("#readybutton").click(function(){
      dispatcher.trigger('game.ready_game');
      $('#readybutton').attr('disabled','true').html('waiting')
    });
    
    /***** bind *****/
    //방번호를 보여줍니다
    $('.room_code').html('<span>방번호:'+room_code+'</span>')
    
    // 참여된 방에서 사용자가 접속하면 사용자를 추가합니다.
    channel.bind('player_enter', function(data) {
      initial_room_state.player_info.push(data.player_info)
      index = initial_room_state.player_info.length
      el = data.player_info
      if(!el.img_url){
        el.img_url = '/images/profile/boy1.png'
      }
      var fin = false
      html_element = "<div class='user1 id_"+el.id+"'>"+
        "<img src='"+el.img_url+"' alt='boy1'/>"+
        "<div class='player_username'>"+
        "<span>"+el.username+"</span>"+
        "</div>"+
        "</div>"
      $('.section').each(function(index,value){
        if (!fin && $(value).children('.user1').length < 2) {
          fin = true
          return $(value).append(html_element)
        }
      })
      
      if (el.id != my_player_id) {
      menu_element = "<div class='menu_button id_"+el.id+"'>"+
       		"<li>"+
       			"<img src='"+el.img_url+"' id='menu_button'>"+
             "<p id='other_id'>"+el.username+": <span class='point'>"+el.point+"</span></p>"+
      	 	"</li>"+
         "</div>"
        $(".menus").append(menu_element)
      }
    });
  },
  start: function(data){
    do_start(data)
  },
  default: function(data,state){
    $('.room_code').remove()
    $('.section .ready').remove()
    $('.users').fadeOut()
    window['do_'+state](data);
  }
}

function initialize_game(data) {
  console.log(data)
  
  initial_room_state = data
  state = data.room_info.action
  initialize_player(data)
  
  var essential_data = new Object()
  essential_data.answer_player = find_player_with_player_id(data, data.room_info.answer_id)
  essential_data.question_player = find_player_with_player_id(data, data.room_info.question_id)
  switch (state) {
  case 'ready':
    Melting_Talk_Logic.ready(data);
    break;
  case 'start':
    Melting_Talk_Logic.start(essential_data);
    break;
  case 'vote_mvp':
    do_vote_mvp(data)
    break;
  default:
    Melting_Talk_Logic.default(essential_data,state);
  }
}

function initialize_player(data){
  // 플레이어 데이터를 읽어서 표시합니다.
  $('.users>div.section>div').not(".ready").remove()
  $('.menus>.menu_button').remove()
  data.player_info.forEach(function(el,index) {
    if(!el.img_url){
        el.img_url = '/images/profile/boy1.png'
      }
  html_element = "<div class='user1 id_"+el.id+"'>"+
      "<img src='"+el.img_url+"' alt='boy1'/>"+
      "<div class='player_username'>"+
      "<span>"+el.username+"</span>"+
      "</div>"+
      "</div>"

    $(".section").eq(Math.floor(index/2)).append(html_element)
    
    if (el.id != my_player_id) {
      menu_element = "<div class='menu_button id_"+el.id+"'>"+
       		"<li>"+
       			"<img src='/images/profile/boy1.png' id='menu_button'>"+
             "<p id='other_id'>"+el.username+": <span class='point'>"+el.point+"</span></p>"+
      	 	"</li>"+
         "</div>"
      $(".menus").append(menu_element)
    }else{
      $("#menu_img").attr('src',el.img_url)
    }
   
    if(el.point == 1 && data.room_info.action == 'ready'){
      do_ready(el)
    }
  });
}
