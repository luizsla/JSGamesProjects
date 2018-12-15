//Event listener to restart the game.
reset.addEventListener("click", function(event) {
  
  event.preventDefault();

  if (document.querySelector("a[data-mode='hard']").classList.contains('selected')) {
    displayColorGridBack();
    initHardMode(true);
  } else {
    displayColorGridBack(true)
    initEasyMode(true);
  }
  
  //Change the span's text and color.
  this.textContent = "New Colors";
  this.style.color = "#396afc";
});

//Function that displays all grids to the color elements on call.
function displayColorGridBack(easy = false) {
  //Get all the colors.
  var colorContainers = document.querySelectorAll(".color"),
      length = easy ? 3 : colorContainers.length;

  for (let index = 0; index < length; index++) {
    colorContainers[index].parentNode.style.display = "inline-block";
  }
}

function resetStatusofGuess() {
  var statusOfGuessDisplay = document.querySelector("#statusOfGuess");
  statusOfGuessDisplay.style.color = "rgb(220, 100, 0)";
  statusOfGuess.textContent = "";
}


//Setup up the difficulty of the new game.
modes[0].addEventListener("click", function() {
  this.classList.toggle("selected");
  modes[1].classList.toggle("selected");

  //Change all color grids' display property.
  displayColorGridBack(true);

  initEasyMode();
});

modes[1].addEventListener("click", function() {
  this.classList.toggle("selected");
  modes[0].classList.toggle("selected");

  //Change all color grids' display property.
  displayColorGridBack();

  initHardMode();
});
