//Event listener to restart the game.
reset.addEventListener("click", function(event) {
  event.preventDefault();
  //Assign new colors to the array of colors.
  colors = createRandomColors(6);
  assignColors();

  //get all color blocks back to the game.
  displayColorGridBack();

  //Define and display chosen color.
  chosenColor = defineChosenColor(5);
  displayChosenColor(chosenColor);

  //Change the content of the guess' status.
  resetStatusofGuess();

  //Change the span's text and color.
  this.textContent = "New Colors";
  this.style.color = "#396afc";
});

function displayColorGridBack() {
  var colorContainers = document.querySelectorAll(".color");
  for (let index = 0; index < colorContainers.length; index++) {
    colorContainers[index].parentNode.style.display = "inline-block";
  }
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
