//States colors and chosen colors.
var colors = createRandomColors(6),
    chosenColor = defineChosenColor(5),
    reset = document.querySelector("#resetGame");

//Function Calls for the first start.
(function() {
  assignColors();
  displayChosenColor(chosenColor);
  compareChosenColorAndPickedColor();
})();

//Function that initiates easyMode.
function initEasyMode() {
  toggleThreeLastColors();
  colors = createRandomColors(3);
  assignColors();
  chosenColor = defineChosenColor(2);
  displayChosenColor(chosenColor);
  resetStatusofGuess();
}

//Funciton that initiates hardMode.
function initHardMode() {
  toggleThreeLastColors();
  colors = createRandomColors(6);
  assignColors();
  chosenColor = defineChosenColor(5);
  displayChosenColor(chosenColor);
  resetStatusofGuess();
}

//Funciton that helps initEasyMode() and initHardMode().
function toggleThreeLastColors() {
  var invisibleBlocks = document.querySelectorAll(".hard-mode");
  for (var i = 0; i < invisibleBlocks.length; i++) {
    invisibleBlocks[i].classList.toggle("invisible-block");
  }
}
