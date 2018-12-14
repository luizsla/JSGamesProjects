//Funciton that creates an array with 6 or 3 random colors.
function createRandomColors(nColors) {
  var color;
  var colors = [];

  for (var i = 0; i < nColors; i++) {
    color = "rgb(" + getRandomIntInclusive(0, 255) + ", " + getRandomIntInclusive(0, 255) + ", " + getRandomIntInclusive(0, 255) + ")";
    colors.push(color);
  }
  return colors;
}

//Function that assgns the random colors array to the squares.
function assignColors(mode = false) {
  var colorContainers = document.querySelectorAll(".color");

  var length = mode ? 3 : colors.length; 

  for (var i = 0; i < length; i++) {
    colorContainers[i].style.backgroundColor = colors[i];
  }
}

//Define a chosen color for the array of colors.
function defineChosenColor(max) {
  var colorToBeGuessed = getRandomIntInclusive(0, max);
  return colorToBeGuessed;
}

//Display's chosen color rgb's code on the top displyer.
function displayChosenColor(chosenColor) {
  var colorToBeGuessedDisplay = document.querySelector("#colorToBeGuessed");
  colorToBeGuessedDisplay.textContent = colors[chosenColor];
}

//Set the click listeners and comapre the chosen color to the picked colors.
  //Case: True -> displayErrorMessage.
  //Case: False -> displayErrorMessage, fadeInColor.
function compareChosenColorAndPickedColor() {
  var colorsContainers = document.querySelectorAll(".color");
  for (var i = 0; i < colors.length; i++) {
    colorsContainers[i].addEventListener("click", function() {
      if (this.style.backgroundColor == colors[chosenColor]) {
        changeSquaresBackground(this.style.backgroundColor);
        displaySucessMessage();
        return true;
      } else {
        displayErrorMessage();
        fadeInColor(this);
      }
    });
  }
}

//Display error message in case user didn't guess the chosen color correctly.
function displayErrorMessage() {
  var statusOfGuess = document.querySelector("#statusOfGuess");
  statusOfGuess.textContent = "Você não acertou!";

  setTimeout(function() {
    statusOfGuess.textContent = "Tente novamente!";
  }, 750);
}

//Fades in picked square if the same is not igual, in value, to the chosen color.
function fadeInColor(colorContainer) {
  colorContainer.parentNode.style.display = "none";
}

//Display sucsess messagem in casa used guessed the chosen color correctly.
  // askForANewGame is used to ask if player wants to play a new game.
function displaySucessMessage() {
  var statusOfGuess = document.querySelector("#statusOfGuess");
  statusOfGuess.textContent = "Você acertou!";
  statusOfGuess.style.color = "green";

  setTimeout(function() {
    statusOfGuess.textContent = "Parabéns!";
  }, 750);

  setTimeout(askForANewGame, 1200);
}

// Changes all squares to the chosen color's value if the user guess it correct.
function changeSquaresBackground(color) {
  var colorsSquares = document.querySelectorAll(".color");
  for (var i = 0; i < colorsSquares.length; i++) {
    colorsSquares[i].style.backgroundColor = color;
  }
}

//Asks if the player wants to play a new game.
  // Case: Yes -> Sets up a new game.
function askForANewGame() {
  reset.textContent = "New Game?";
  reset.style.color = "green";
}

//Function that returns a random number between two specified values.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
