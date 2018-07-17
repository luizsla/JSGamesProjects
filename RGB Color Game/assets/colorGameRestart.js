//Listener to the "New Colors" button.
var reset = document.querySelector("#resetGame");
reset.addEventListener("click", resetGame);


//Funciton that resets the game once it's game over or the users choose to reset it.
function resetGame(event) {
  event.preventDefault();
  this.textContent = "New Colors";
  this.style.color = "#396afc";
  resetStatusofGuess();
  colors = createRandomColors(6);
  assignColors();
  chosenColor = defineChosenColor(5);
  displayChosenColor(chosenColor);
}

function resetStatusofGuess() {
  var statusOfGuessDisplay = document.querySelector("#statusOfGuess");
  statusOfGuessDisplay.style.color = "rgb(220, 100, 0)";
  statusOfGuess.textContent = "";
}


//Setups up the mode of the game.
var modes = document.querySelectorAll('.mode');
modes[0].addEventListener("click", function() {
  this.classList.toggle("selected");
  modes[1].classList.toggle("selected");

  initEasyMode();
});

modes[1].addEventListener("click", function() {
  this.classList.toggle("selected");
  modes[0].classList.toggle("selected");

  initHardMode();
});
