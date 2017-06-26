function do_game_from_broadcast(data){
  switch (data.state) {
    case 'ready':
      do_ready(data.player);
      break;
    case 'start':
      do_start(data.random_player);
      break;
    case 'turn_answer_end':
      do_turn_answer_end();
  }
}

//action

function do_ready(player){
    $('.id_'+player.id).css('background','#00BCD4')
}

function do_start(){
    $('.users').removeClass('ready').children(".section").children("div").css("background","");
}

function do_turn_answer_end(){
  
}