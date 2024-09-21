var level = 1;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

function nextSequence() {
    var num = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[num];
    gamePattern.push(randomChoosenColor);
    $("." + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    $("h1").text("Level " + level);
}

function handlerFunction(event) {
    var userChoosenColor = event.target.id;
    userClickedPattern.push(userChoosenColor);
    $("h1").text("Level " + level);
    animatePress(userChoosenColor);
    playSound(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            level++;
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        var gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    once = false; 
}

var once = false;
$(document).keydown(function () {
    if (!once) {
        $("h1").text("Level " + level);
        nextSequence();
        once = true;
    }
});

$(".btn").click(handlerFunction);
