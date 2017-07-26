function do_game_from_broadcast(data){
  
  switch (data.state) {
    case 'ready':
      do_ready(data.player);
      break;
    case 'start':
      do_start(data);
      break;
    case 'turn_question_end':
      do_turn_question_end(data);
      break;
    case 'turn_answer_end':
      do_turn_answer_end(data);
      break;
    case 'turn_questioner_answer_end':
      do_turn_questioner_answer_end();
      break;
    case 'question':
      do_start(data);
      break;
  }
}

//action

function do_ready(player){
    console.log('do_ready')
    $('.id_'+player.id).css('background','#00BCD4')
}


function do_start(data){
  var player = data.question_player
  console.log("do start")
  
  //레디상태의 화면을 플레이 화면으로 전환하고, 레디상태를 지웁니다
  $('.room_code').remove()
  $('.section .ready').remove()
  $('.users').removeClass('ready').children(".section").children("div").css("background","");

  if(my_player_id == player.id){
    $('.button').html("질문완료");
    $('.button').bind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }
  
  else{
    $('.button').html("질문중...");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }

  $('#question_player').html(data.question_player.username);
  $('#answer_player').html(data.answer_player.username);
}

function do_turn_question_end(data){
  var player = data.answer_player
  console.log("내 아이디:" + my_player_id,"답변자 아이디:" +  player.id)
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').bind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
  
  else{
    $('.button').html("답변자 답변중..");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
  console.log("check")
}


function do_turn_answer_end(data){
  var player = data.question_player
  console.log('do_turn_answer_end')
  console.log("내 아이디:" + my_player_id,"질문자 아이디:" +  player.id)
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').bind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    }) 
  }
  
  else{
    $('.button').html("질문자 답변중..");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
}


function do_turn_questioner_answer_end(data){
  console.log('do_turn_questioner_answer_end')
  $('.button').html("내가 질문하기!");
  $('.button').bind("click").click(function(){
    dispatcher.trigger('game.play_turn');
    console.log('rere')

  })
  
  
}