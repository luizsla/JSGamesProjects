//Function Calls for first start.
var colors = createRandomColors(6);
assignColors();
var chosenColor = defineChosenColor(5);
displayChosenColor(chosenColor);
compareChosenColorAndPickedColor();


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
