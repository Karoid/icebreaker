function do_game_from_broadcast(data){
  switch (data.state) {
    case 'ready':
      do_ready(data.player);
      break;
    case 'start':
      do_start(data.random_player);
      break;
    case 'turn_question_end':
      do_turn_question_end()
      break;
    case 'turn_answer_end':
      do_turn_answer_end();
      break;
    case 'turn_questioner_answer_end':
      do_turn_questioner_answer_end();
      break;
    case 'question':
      do_start();
      break;
  }
}

//action

function do_ready(player){
    console.log('do_ready')
    $('.id_'+player.id).css('background','#00BCD4')
}

function do_start(player){
  console.log('do_start')
  $('.users').removeClass('ready').children(".section").children("div").css("background","");
  $('.button').html("질문중...");
  $('.button').unbind("click").click(function(){
    dispatcher.trigger('game.play_turn');
  })
}

function do_turn_question_end(){
  console.log('do_turn_question_end')
  $('.button').html("답변자 답변중..");
  $('.button').unbind("click").click(function(){
    dispatcher.trigger('game.play_turn');
  })
}

function do_turn_answer_end(){
  console.log('do_turn_answer_end')
  $('.button').html("질문자 답변중..");
  $('.button').unbind("click").click(function(){
    dispatcher.trigger('game.play_turn');
  })
}

function do_turn_questioner_answer_end(){
  console.log('do_turn_questioner_answer_end')
  $('.button').html("내가 질문하기!");
  $('.button').unbind("click").click(function(){
    dispatcher.trigger('game.play_turn');
  })
  
}