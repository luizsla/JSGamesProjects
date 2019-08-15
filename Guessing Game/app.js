(function() {
    var questions = [
      {
        title: 'Qual é a linguagem de programação mais legal do mundo?',
        options: [
            'PHP',
            'JavaScript',
            'Java',
            'C#',
        ],
        answer: "JavaScript",
      },
      {
          title: 'Programar é:',
          options: [
              'Incrível',
              'Tedioso',
              'Fácil',
              'Difícil',
          ],
          answer: 'Incrível'
      },
      {
          title: 'O nome do dono deste jogo é:',
          options: [
              'Luiz Eduardo',
              'Felipe Luiz',
              'Luiz Paulo',
              'Luiz Renato',
          ],
          answer: 'Luiz Eduardo',
      },
    ];
    var randomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    do {
        //Antes de mais nada vamos limpar o console de qualquer dado.
        console.clear();
        //Vamos escolher primeiro a Pergunta que queremos fazer de forma aleatória
        var question = questions[randomNumber(0, 2)];
        //Vamos dar o display das questões no console.
        console.log('Opções:');
        //Vamos printar todas as opções no console.
        question.options.forEach(function(el, index) {
            console.log(index + 1 + ': ' + el + '.');
        });

        //Depois disso vamos fazer a pergunta.
        var response = prompt(question.title).trim().toUpperCase();

        //Vamos ver se a resposta que vem no prompt coincide com a nossa.
        if (question.answer.toUpperCase().includes(response)) {
            alert('Parabéns, resposta correta!');
        } else {
            console.log('Não foi dessa vez, tente novamente! :(');
        }

    } while (prompt('Deseja jogar novamente (Sim/Não)', 'Sim').toUpperCase().trim() != 'NÃO');
})();
