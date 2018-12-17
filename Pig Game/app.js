//Setup of global variables.
var scores = [0, 0], roundScores = 0, activePlayer = 0, dice;
var canvas = {
    newGameButton: document.querySelector(".btn-new"),
    rollDiceButton: document.querySelector(".btn-roll"),
    holdButton: document.querySelector(".btn-hold"),
    diceImage: document.querySelector(".dice"),
};

//Ações que devem ser tomadas no primeiro carregamento da página.
(function() {
  //Desaparecendo com a imagem do dado.
  canvas.diceImage.style.display = "none";

  //Zerando todos os scores necessários.
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
})();