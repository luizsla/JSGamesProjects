//Método que controla todos os cálculos e lógica do aplicativo.
var budgetController = (function() {
    //Vamos declarar uma classe para as despesas.
    var Expenses = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Vamos declarar uma classe para as receitas
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Vamos declarar a propriedade da clase que contém todos os objetos.
    var data = {
        records: {
            exp: [],
            inc: [],
        },
        total: {
            exp: 0,
            inc: 0,
        },
    };

    //Vamos retornar o método público do controller.
    return {
        addNewItem: function(type, description, value) {
            //Declarando as variáveis do módulo.
            var id, newItem;
            //Vamos declarar os dados necessários para instanciar novos objetos no controller.
            id = data.records[type].length > 0 ? data.records[type][data.records[type].length - 1].id + 1
                : 0;

            //Adicionando novo item.
            newItem = type === 'epx' ? new Expense(id, description, value) :
                    new Income(id, description, value);

            //Vamos adicionas o objeto a fila.
            data.records[type].push(newItem);

            //Vamos retornar o novo elemento.
            return newItem;
        },
    };
})();


//Módulo que controla toda a interface do aplicativo.
var uiController = (function() {
    //Vamos declarar um objeto com todos os seletores da aplicação.
    var uiSelectors = {
        inputDescription: '.add__description',
        inputBtn: '.add__btn',
        typeSelect: '.add__type',
        inputValue: '.add__value',
    };

    return {
        getUiSelectors: function() {
            return uiSelectors;
        },
        getInputValues: function() {
            return {
                type: document.querySelector(uiSelectors.typeSelect).value,
                description: document.querySelector(uiSelectors.inputDescription).value,
                value: document.querySelector(uiSelectors.inputValue).value,
            };
        },
        setNewItem: function() {

        },
    };
})();


//Método responsável por articular o controlador de interface e a lógica do aplicativo.
var controller = (function(budget, ui) {
    //Vamos declarar as funções desse módulo.
    var updateInterface = function() {
        //Pegando os valores do input.
        var inputValues = ui.getInputValues();
        //Vamos adicionar um novo item com os dados que recebemos.
        var newItem = budget.addNewItem(inputValues.type, inputValues.description, inputValues.value);
    };

    var setupEventListeners = function() {
        //Vamos pegar os marcadores do módulo de UI.
        var DOMMarkers = ui.getUiSelectors();

        //Vamos declarar os event listeners da aplicação.
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) updateInterface();
        });

        document.querySelector(DOMMarkers.inputBtn).addEventListener('click', updateInterface);
    };

    //Retorno
    return {
        'init': function() {
            console.log('A aplicação está rodando!');
            setupEventListeners();
        }
    }
})(budgetController, uiController);


controller.init();
