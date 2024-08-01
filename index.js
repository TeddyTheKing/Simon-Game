var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(function(){
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence () {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level)

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);

    playSound(randomChosenColor);    

}


function playSound (name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress (currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass('pressed');
    }, 100);
}



function checkAnswer(currentLevel) {

  var audio = new Audio("sounds/wrong.mp3");
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      audio.play();
      //console.log("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
};