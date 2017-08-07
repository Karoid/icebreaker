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
      do_turn_questioner_answer_end(data);
      break;
    case 'question':
      do_question(data);
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
  console.log("do start1")
  
  //레디상태의 화면을 플레이 화면으로 전환하고, 레디상태를 지웁니다
  $('.room_code').remove()
  $('.section .ready').remove()
  $('.users').removeClass(ready).children("div");
  $('.users').removeClass('ready').children(".section").children("div").css("display","none");
  Clock(180)
  loadCard(data.player_info[0].id)

  if(my_player_id == player.id){
    $('.button').html("질문완료");
    $('.button').bind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }
  
  else{
    $('.button').html(data.question_player.username + " 질문중...");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }

  $('#question_player').html(data.question_player.username);
  $('#answer_player').html(data.answer_player.username);
}

$(document).ready(function(){
$("#readybutton").click(function(){
  $(".users").css("height", "0");
});
});

function do_turn_question_end(data){
  var player = data.answer_player
  console.log('do_turn_question_end2')
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
  
  else{
    $('.button').html(data.answer_player.username + " 답변중..");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
}


function do_turn_answer_end(data){
  var player = data.question_player
  console.log('do_turn_answer_end3')
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    }) 
  }
  
  else{
    $('.button').html(data.question_player.username + " 답변중..");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
}

function do_turn_questioner_answer_end(data){
  console.log('do_turn_questioner_answer_end4')
  var player = data.question_player
  if(my_player_id == player.id){
    $('.button').html("다음 질문자 선택 중");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })  
  }
  else{
    $('.button').html("내가 질문하기!");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
      console.log('next question click4-1')
    })  
  }
}

function do_question(data){
  var player = data.question_player
  console.log('question5',player)
  if(my_player_id == player.id){
    $('.button').html("질문완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
      console.log('이게 눌리나5-1??')
    })
  }
  else{
    $('.button').html(data.question_player.username + " 질문중...");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }
}

