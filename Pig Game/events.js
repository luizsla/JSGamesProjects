//Arquivo que contém todos os eventos e escutadores de eventos da aplicação.

/**
 *************************************************************
 ******************** Roll Dice Event code *******************
 ************************************************************* 
 */

//Evento para rolar o dado e pontuar o player correto. Caso o player receba 1 troca o player ativo.
function rollDiceEvent(event) {
  //Prevent event default action.
  event.preventDefault();

  //Setando dado anterior. 
  var previousDice = dice;

  //Setando o valor do dado de forma aleatória.
  dice = getRandomNumber(6);

  //Alterando a imagem do dado de forma dinâmica.
  canvas.diceImage.setAttribute('src', 'dice-' + dice + '.png');

  if (canvas.diceImage.style.display == 'none') {
      canvas.diceImage.style.display = "inline-block";  
  }

  //Se o dado não for igual a 1 adicionar ao score 
  if (dice != 1 && !(dice == 6 && previousDice == 6)) {
    roundScores += dice;
    setCurrentScore(roundScores);
  } else {
    //Reseta a quantidade total de pontos do player.
    scores[activePlayer] = 0;
    changePlayer();
  }
}

/**
 *************************************************************
 ******************** Hold Score Event code ******************
 ************************************************************* 
 */

 //Função que realiza toda a lógica atrelada ao hold score.
function holdScoreEvent(event) {
  event.preventDefault();

  //Setar o score do player ativo.
  scores[activePlayer] += roundScores;

  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

  //Verificar se o player ganhou.
  if (scores[activePlayer] >= winningScore) {
    setWinner();
  } else {
    //Mudar de jogador sem resetar o score do jogadoor atual.
    changePlayer(false);
  }
}

/**
 *************************************************************
 ******************** New Game Event code ********************
 ************************************************************* 
 */

//Evento que inicia um novo game.
canvas.newGameButton.addEventListener('click', function(event) {
    event.preventDefault();

    winningScore = prompt('Defina o score necessário para ganhar o jogo:');

    if (!winningScore) {
      winningScore = 20;
    }

    //adicionando eventos para click.
    canvas.rollDiceButton.addEventListener("click", rollDiceEvent);
    canvas.holdButton.addEventListener("click", holdScoreEvent);

    //Zerando os scores acumulados.
    scores = [0, 0];

    //Setando active player para inicial.
    activePlayer = 0;

    //Zerando round score.
    roundScores = 0;

    //Dice
    dice = 0;

    resetHTML();

    addCanvasEventListeners();
  });