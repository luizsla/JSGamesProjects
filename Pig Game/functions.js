function getRandomNumber(max) {
    return Math.floor(Math.random() * max)  + 1;
}

function setCurrentScore(value) {
  document.querySelector("#current-" + activePlayer).textContent = value;
}

function changePlayer(resetActivePlayerScore = true) {
  //Zerar os dados do player ativo.
  document.querySelector('#current-' + activePlayer).textContent = "0";
  
  if (resetActivePlayerScore) {
    document.querySelector('#score-' + activePlayer).textContent = "0";
  }

  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  
  //Setar o valor acumulado para zero.
  roundScores = 0;

  //trocar player ativo.
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //Esconder o dado.
  canvas.diceImage.style.display = "none";

  //Setar classe correta.
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

//Função que seta o placar, estilo e manipula o html para mostrar o jogador vencedor.
function setWinner() {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    canvas.diceImage.style.display = "none";
    let winner = document.querySelector('.player-' + activePlayer + '-panel').classList;
    winner.add('winner');
    winner.remove('active');

    //Depois de setar um winner retirar os event listeners botões.
    removeCanvasEventListeners();
}

function removeCanvasEventListeners() {
  //Removendo o listener do botão de rolar o dado.
  canvas.rollDiceButton.removeEventListener('click', rollDiceEvent);

  //Removendo o listener do botão de hold score.
  canvas.holdButton.removeEventListener('click', holdScoreEvent);
}

function addCanvasEventListeners() {
  canvas.rollDiceButton.addEventListener("click", rollDiceEvent);
  canvas.holdButton.addEventListener("click", holdScoreEvent);
}

function resetHTML() {
  //Zerando todos os scores necessários.
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  //Retirando a classe winner do vencedor.
  let player1 = document.querySelector(".player-0-panel");
  player1.classList.remove('winner');
  player1.classList.add('active');
  document.querySelector(".player-1-panel").classList.remove('winner');

  document.querySelector('#name-0').textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
}