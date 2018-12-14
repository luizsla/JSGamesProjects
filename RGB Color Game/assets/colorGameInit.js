//States colors and chosen colors.
var colors = createRandomColors(6),
    chosenColor = defineChosenColor(5),
    reset = document.querySelector("#resetGame")
    modes = document.querySelectorAll('.mode');

//Function Calls for the first start.
(function() {
  assignColors();
  displayChosenColor(chosenColor);
  compareChosenColorAndPickedColor();
})();

//Function that initiates easyMode.
function initEasyMode(ignoreToggleClass = false) {
  //Verifies if we should toggle or not the class.
  if (!ignoreToggleClass) {
    toggleThreeLastColors();
  }

  toggleThreeLastColors();
  colors = createRandomColors(3);
  assignColors(true);
  chosenColor = defineChosenColor(2);
  displayChosenColor(chosenColor);
  resetStatusofGuess();
}

//Funciton that initiates hardMode.
function initHardMode(ignoreToggleClass = false) {
  //Verifies if we should toggle or not the class.
  if (!ignoreToggleClass) {
    toggleThreeLastColors();
  }
  
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
