var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var randomNumber;
var level = 0;

$(document).keypress(function() {
  $("#level-title").text("level "+level);
  nextSequence();
})


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(10);
playSound(randomChosenColor);

}


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer((userClickedPattern.length-1));

});


function playSound(name) {
  var audioElement = new Audio("sounds/" + name + ".mp3");
  audioElement.play();
}


function animatePress(currentColor) {
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+ currentColor).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
      console.log(userClickedPattern);
      console.log(gamePattern);
      setTimeout(function() {
      nextSequence(),1000});
      userClickedPattern.length = 0;
      level = level + 1;
        $("#level-title").text("level "+level);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over"),1000});
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
level = 0;
gamePattern.length = 0;
userClickedPattern.length=0;

}
