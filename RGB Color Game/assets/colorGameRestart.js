//Event listener to restart the game.
reset.addEventListener("click", function(event) {
  
  event.preventDefault();

  //get all color blocks back to the game.
  displayColorGridBack();

  if (document.querySelector("a[data-mode='hard']").classList.contains('selected')) {
    initHardMode(true);
  } else {
    initEasyMode(true);
  }
  
  //Change the span's text and color.
  this.textContent = "New Colors";
  this.style.color = "#396afc";
});

//Function that displays all grids to the color elements on call.
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


//Setup up the difficulty of the new game.
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
