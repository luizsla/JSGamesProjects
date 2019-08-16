(function() {
    //Vamos declarar a classe customer e a classe game.
    var Question = function(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    };

    var Game = function(questions) {
        this.score = 0;
        this.questions = questions;
    };

    //Vamos declarar os métodos da classe game.
    Game.prototype.getRandomQuestion = function () {
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    };

    Game.prototype.increaseScore = function () {
        this.score++;
    };

    Game.prototype.decreaseScore = function() {
        if (this.score > 0) this.score--;
    };

    Game.prototype.displayScore = function(win) {
        win ? console.log('Parabéns, você acertou!') : console.log('Não foi dessa vez, tente mais uma!');

        console.log('Sua pontuação atual é: ' + this.score);
    };

    Game.prototype.playGame = function() {
        //Vamos pegar uma questão aleatória.
        var randomQuestion = this.getRandomQuestion();
        //Vamos printar as questões para o usuário.
        console.log('Questões:');
        //Após isso vamos mostrar as opções.
        randomQuestion.options.forEach(function(el, index) {
            console.log(index + 1 + ': ' + el);
        });
        //Vamos printar o alert com a pergunta e capturar a resposta do usuário.
        var answer = prompt(randomQuestion.question);

        if (answer.toUpperCase().trim() !== 'SAIR') {
            //Se a resposta for a correta vamos dar um console e aumentar os pontos.
            if (randomQuestion.answer.toUpperCase() === answer.toUpperCase().trim()) {
                this.increaseScore();
                this.displayScore(true);
            } else {
                this.decreaseScore();
                this.displayScore(false);
            }

            //Vamos jogar o jogo de novo.
            this.playGame();
        } else {
            alert('Sua pontuação final e: ' + this.score);
        }
    };

    //Vamos declarar o array de questões instanciando a questão no array.
    var questions = [
        new Question(
            'Qual é a linguagem de programação mais legal do mundo?',
            [
                'PHP',
                'JavaScript',
                'Java',
                'C#',
            ],
            "JavaScript"
        ),
        new Question(
            'Programar é:',
            [
                'Incrível',
                'Tedioso',
                'Fácil',
                'Difícil',
            ],
            'Incrível'
        ),
        new Question(
            'O nome do dono deste jogo é:',
            [
                'Luiz Eduardo',
                'Felipe Luiz',
                'Luiz Paulo',
                'Luiz Renato',
            ],
            'Luiz Eduardo',
        ),
    ];

    //Vamos criar um novo objeto do tipo game.
    var game = new Game(questions);
    //Vamos iniciar um jogo.
    game.playGame();
})();
