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
            budget: 0,
            percentage: 0,
        },
    };

    //Função que calcula o total de income e expenses do usuário.
    var calculateTotalIncome = function(type) {
        var sum = 0;

        data.records[type].forEach(function(el) {
            sum += el.value;
        });

        data.total[type] = sum;
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

        //Função que calcula do budget do usuário junto com a porcentagem.
        calculateBudget: function() {
            //Vamos calcular o total de receitas e de despesas.
            calculateTotalIncome('exp');
            calculateTotalIncome('inc');
            //Depois vamos setar o budget do usuário
            data.total.budget = data.total.inc - data.total.exp;
            //Vamos calcular a porcentagem de income que foi gasta.
            if (data.total.inc > 0) {
                data.total.percentage = Math.round(data.total.exp / data.total.inc * 100);
            } else {
                data.total.percentage = -1;
            }
        },

        getBudgetDetails: function() {
            return {
                budget: data.total.budget,
                totalIncome: data.total.inc,
                totalExpense: data.total.exp,
                totalPercentage: data.total.percentage,
            };
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        incomeValue: ".budget__income--value",
        expensesValue: '.budget__expenses--value',
        budgetValue: '.budget__value',
        totalPercentaveLabel: ".budget__expenses--percentage",
        partialsContainer: ".container",
    };

    return {
        getUiSelectors: function() {
            return uiSelectors;
        },
        getInputValues: function() {
            return {
                type: document.querySelector(uiSelectors.typeSelect).value,
                description: document.querySelector(uiSelectors.inputDescription).value,
                value: parseInt(document.querySelector(uiSelectors.inputValue).value),
            };
        },
        addListItem: function(obj, type) {
            var html, container;

            if (type === 'inc') {
                //Vamos pegar do dom o container que o novo elemento será inserido.
                container = document.querySelector(uiSelectors.incomeContainer);
                //E o template do elemento.
                html = '<div class="item clearfix" id="income-%id%">' +
                            '<div class="item__description">%description%</div>' +
                            '<div class="right clearfix">' +
                                '<div class="item__value">+ %value%</div>' +
                                '<div class="item__delete">' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            } else {
                container = document.querySelector(uiSelectors.expensesContainer);
                html = '<div class="item clearfix" id="expense-%id%">' +
                            '<div class="item__description">%description%</div>' +
                            '<div class="right clearfix">' +
                                '<div class="item__value">- %value%</div>' +
                                '<div class="item__percentage">21%</div>' +
                                '<div class="item__delete">' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            }

            //Substituindo os valores desejados com o valor do objeto.
            html = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value%', obj.value);
            //Inserindo o html no DOM.
            container.insertAdjacentHTML('beforeend', html);
        },
        clearFields: function() {
            var inputFields;
            //Pegando os elementos.
            inputFields = document.querySelectorAll(uiSelectors.inputValue + ', ' + uiSelectors.inputDescription);
            //Iteramos a node list e esvaziamos os inputs.
            for (var i = 0; i < inputFields.length; i++) {
                inputFields[i].value = '';
            }
            //Vamos dar foco no primeiro input.
            inputFields[0].focus();
        },
        displayBudget: function(budgetData) {
            var currentBudget, currentExpense, currentIncome;
            //Vamos alterar os valores de acordo com o última despesa que temos.
            document.querySelector(uiSelectors.expensesValue).textContent = "- " + budgetData.totalExpense;
            document.querySelector(uiSelectors.incomeValue).textContent = "+ " + budgetData.totalIncome;
            document.querySelector(uiSelectors.budgetValue).textContent = budgetData.budget;
            if (budgetData.totalPercentage > 0) {
                document.querySelector(uiSelectors.totalPercentaveLabel).textContent = budgetData.totalPercentage + "%";
            } else {
                document.querySelector(uiSelectors.totalPercentaveLabel).textContent = "--";
            }
        },
    };
})();


//Método responsável por articular o controlador de interface e a lógica do aplicativo.
var controller = (function(budget, ui) {

    //Função responsável por delegar aos respectivos controllers as funções de calculo
    var updateBudget = function() {
        var budgetData;
        //Vamos designar o budget controller para calcular o budget.
        budget.calculateBudget();
        //Vamos pegar o budget.
        budgetData = budget.getBudgetDetails();
        //Vamos alterar os labels de budget, expenses e income.
        ui.displayBudget(budgetData);
    };

    //Vamos declarar as funções desse módulo.
    var addNewItemToInterface = function() {
        //Pegando os valores do input.
        var inputValues = ui.getInputValues();
        //Apenas vamos chamar os outros métodos caso todos os inputs sejam integros.

        if (inputValues.description !== "" && !isNaN(inputValues.value) && inputValues.value > 0) {
            //Vamos adicionar um novo item com os dados que recebemos.
            var newItem = budget.addNewItem(inputValues.type, inputValues.description, inputValues.value);
            //Vamos adicioar o novo objeto na interface do usuário.
            ui.addListItem(newItem, inputValues.type);
            //E limpar os campos de input para que o user possa inserir novos elemenos
            ui.clearFields();
            //Vamos calcular o budget total do usuário.
            updateBudget();
        }
    };

    //Vaos declarar a função que remove um novo item da calculadora e faz todas as ações necessárias.
    var removeItemFromInterface = function(event) {
        var elementID, type, id;
        //Pegando os valores.
        elementID = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id');

        if (elementID) {
            type = elementID.split('-')[0];
            id = elementID.split("-")[1];
        }
    };

    var setupEventListeners = function() {
        //Vamos pegar os marcadores do módulo de UI.
        var DOMMarkers = ui.getUiSelectors();

        //Vamos declarar os event listeners da aplicação para adicionar novos itens.
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) addNewItemToInterface();
        });

        document.querySelector(DOMMarkers.inputBtn).addEventListener('click', addNewItemToInterface);

        //E para retirar os mesmos itens.
        document.querySelector(DOMMarkers.partialsContainer).addEventListener('click', removeItemFromInterface);
    };

    //Retorno
    return {
        'init': function() {
            console.log('A aplicação está rodando!');
            //Vamos zerar os valores do HTML.
            ui.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                totalPercentage: 0,
            });
            setupEventListeners();
        }
    }
})(budgetController, uiController);


controller.init();
