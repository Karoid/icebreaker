function do_game_from_broadcast(data){
  console.log("서버로부터 정보 받음",data)
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
    case 'game_end':
      do_game_end(data)
      break;
  }
}

//action

function do_ready(player) {
    console.log('do_ready')
    $('.id_'+player.id).css('background','#00BCD4');
    audio_button();
}


function do_start(data){
  var player = data.question_player
  console.log("do start1")
  var audio = new Audio('/sounds/WooshMark.mp3');
  audio.play()
    
  //플레이어들이 받은 카드의 내용을 받기 위해 서버에 정보를 요청합니다
  dispatcher.trigger('game.info',message);
  loadCard()

  //레디상태의 화면을 플레이 화면으로 전환하고, 레디상태를 지웁니다
  $('.room_code').remove()
  $('.section .ready').remove()
  $('.users').fadeOut()
  timer_tag = Clock(180,"left")

  if(my_player_id == player.id){
    $('.button').html("질문완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    });
    audio_button()
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

function do_turn_question_end(data){
  var player = data.answer_player
  console.log('do_turn_question_end2')
  
  clearInterval(timer_tag)
  timer_tag = Clock(180,"right")
  
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    });
    audio_button();
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
  
  clearInterval(timer_tag)
  timer_tag = Clock(180,"left")
  
  if(my_player_id == player.id){
    $('.button').html("답변완료");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    });
    audio_button();
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
  
  clearInterval(timer_tag)
  
  loadCard()
    
  if(my_player_id == player.id){
    $('.button').html("다음 질문자 선택 중");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    });
    audio_button();
  }
  else{
    $('.button').html("내가 질문하기!");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
      console.log('next question click4-1')
    });
    Player();
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
    audio_button()
  }
  else{
    $('.button').html(data.question_player.username + " 질문중...");
    $('.button').unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    })
  }
}

function do_game_end(data){
  // 화면을 전환
  var screen = '<div id="screen"><img/><span>Karoid가 MVP로 선정되었습니다!</span></div>'
  $('body').append(screen)
}

