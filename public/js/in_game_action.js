function do_game_from_broadcast(data){""
//  console.log("서버로부터 정보 받음",data)
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
    case 'vote_mvp':
      do_vote_mvp(data);
      break;
    case 'game_end':
      do_game_end(data);
      break;
  }
}

//action

function do_ready(player) {
    $('.id_'+player.id).css('background','#00BCD4');
    audio_button();
}


function do_start(data){
  console.log(data)
  var player = data.question_player
  var audio = new Audio('/sounds/WooshMark.mp3');
  audio.play()
  
  $("#question").click(function(){
        $("#myModal").modal();
        $('.modal-body>p').html('타이머 양 양쪽에 질문자와 답변자가 렌덤으로 선택됩니다. 질문자는 답변자에게 유저 아이콘 위의 주제와 관련하여 질문을 하면 됩니다. 질문자는 제한 시간 3분안에 질문을 해야합니다')
    });
    
  //플레이어들이 받은 카드의 내용을 받기 위해 서버에 정보를 요청합니다
  dispatcher.trigger('game.get_card',message);

  //레디상태의 화면을 플레이 화면으로 전환하고, 레디상태를 지웁니다
  $('.room_code').remove()
  $('.section .ready').remove()
  $('.users').fadeOut()
  timer_tag = Clock(180,"left")
  if(my_player_id == player.id){
    $('.button').html("질문완료");
    $('.button').removeAttr("disabled").unbind("click").click(function(){
      dispatcher.trigger('game.play_turn');
    });
    audio_button()
  }
  
  else{
    $('.button').html(data.question_player.username + " 질문중...");
    $('.button').unbind("click").attr("disabled",true)
  }
  
  //타이머 상의 정보를 갱신
  if(!data.question_player.img_url){
    data.question_player.img_url = '/images/profile/boy1.png'
  }
  if(!data.answer_player.img_url){
    data.answer_player.img_url = '/images/profile/boy1.png'
  }
  $('label#question_player').html(data.question_player.username);
  $("#askuser img").attr('src',data.question_player.img_url);
  $('label#answer_player').html(data.answer_player.username);
  $("#answeruser img").attr('src',data.answer_player.img_url);
}

function do_turn_question_end(data){
  var player = data.answer_player
  console.log('do_turn_question_end2')
  
  $("#question").unbind("click").click(function() {
    alert('답변자는 질문자의 질문에 맞는 답변을 하면 됩니다. 아래 타이머는 권장된 시간으로 재미있는 이야기라면 시간을 정확히 지키지 않아도 됩니다!')
  })
  
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
  
  $("#question").unbind("click").click(function() {
    alert('답변자의 답변 후 질문자도 자신의 질문에 대한 답을 합니다.')
  })
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
  
  $("#question").click(function(){
        $("#myModal").modal();
        $('.modal-body>p').html('방금한 답변과 자신의 카드에 적힌 주제 두 가지와 연관된 질문을 하세요! 내가 질문하기 버튼을 빨리 누르면 내가 질문자가 됩니다!')
    });
  
  clearInterval(timer_tag)
  console.log("질문자("+player.username+")의 점수는? :"+ player.point)
  if (player.id == my_player_id) {
    $('span#user_point').html(player.point);
  }else{
    $('.id_'+player.id+' .point').html(player.point)
  }
  

  //방금 질문자의 카드를 바꿔주고, 모두 보이는 카드를 선택중으로 만듭니다
  dispatcher.trigger('game.get_card',message);
  
    
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
    audio_button();
  }
}

function do_question(data){
  
  $("#question").unbind("click").click(function() {
    alert('맨위의 주제어와 관련된 질문 완료 후 질문완료버튼을 클릭하세요')
  })
  var player = data.question_player
  console.log('question5',player)
  //질문자와 답변자가 바뀌므로 표시를 해줍니다
  $('label#question_player').html(data.question_player.username);
  $('label#answer_player').html(data.answer_player.username);
  //질문자 카드를 모두에게 갱신해줍니다
  dispatcher.trigger('game.get_card',message);
  
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

function do_vote_mvp(data){
  $('div#screen').css('display','block');
  var content = "";
  for (i = 0; i < data.player_info.length; i++) {
    content += "<div class='voted'><label for='"+data.player_info[i].id+"' class='label--radio'><input type='radio' class='radio' name='vote' id='"+data.player_info[i].id+"' value='"+data.player_info[i].id+"'>"
    +data.player_info[i].username+"</label></div>";
  }
  content+= '<br><button id="vote_button">제출</button>'
  $('#vote_content1').html(content);
  return $('#vote_button').unbind("click").click(function(){
    console.log("클릭")
    var vote_player = $(":input:radio[name=vote]:checked").val();
    if (vote_player) {
     $(this).attr("disabled",true).html("투표 수집중")
      dispatcher.trigger('game.play_turn',vote_player);
    }
  })
}

function do_game_end(data){
  // 화면을 전환
  var screen = '<div id="screen"><img/><span></span></div>'
  
  $('.notice').html("투표결과");
  $('#voted').html('<hr>');
  $('div#screen').css('display','block');
  $('div#winner').html('<p>Winner</p>');
  
  $('#vote_content1').html('<p>'+data.mvp.username+'가 mvp로 뽑혔습니다!</p>');
  $('#voted').removeClass('vote');
  console.log(data)
  $('div#loser').html('<p>Loser</p>');
  $('.exit').html("<button id='exitbutton'>게임종료</button></a>");
  $('#vote_content2').append('<p>'+data.loser.username+'가 벌칙을 당합니다!</p>');
  
 
}

