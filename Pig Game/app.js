//Setup of global variables.
var scores, roundScores, activePlayer, dice;
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
})();