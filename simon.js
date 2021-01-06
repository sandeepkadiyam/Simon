//Global Variables.

var theProducedSequence = [];
var userClickedSequence = [];
var game_over = true;
var level = 0;

//Creating a Pattern.

function nextSequence() {
  var pattern = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor((Math.random()) * 4);
  theProducedSequence.push(pattern[randomNumber]);
  makeSound(pattern[randomNumber]);
  $("#" + pattern[randomNumber]).fadeOut(100).fadeIn(100);
  level += 1;
  $("h1").text("level " + level);

}

//Animation for buttons when they get clicked.

function pressAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}


function makeSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Animation for the body when something wrong happened.

function alarm() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game-over, Press any key to restart");
}

function startOver() {
  theProducedSequence = [];
  userClickedSequence = [];
  game_over = true;
  level = 0;
}
//Checking whether the user's input is matching with that of the produced Sequence.

// function sequenceCheck(arr1, arr2,) {
//   for (var i = 0; i < arr2.length; i++) {
//     if (arr2[i] != arr1[i]) {
//       startOver();
//       alarm();
//       keypress();
//       break;
//     }
//   }
//
//   if ((game_over != true) && (arr1.length === arr2.length)) {
//     userClickedSequence = [];
//     setTimeout(function() {
//       nextSequence();
//     }, 1000);
//   }
// }

function sequenceCheck(index) {

  if (userClickedSequence[index] != theProducedSequence[index]) {
    startOver();
    alarm();
    keypress();
  } else if (index === (theProducedSequence.length - 1)) {
    userClickedSequence = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

//The operation of game.
function keypress() {
  $(document).one("keypress", function() {
    nextSequence();
    game_over = false;
  });
}


keypress();

$(".btn").on("click", function() {
  if (game_over === true) {
    pressAnimation(this.id);
    alarm();
  } else {
    pressAnimation(this.id);
    makeSound(this.id);
    userClickedSequence.push(this.id);
    //sequenceCheck(theProducedSequence, userClickedSequence);
    sequenceCheck((userClickedSequence.length - 1));
  }
});
