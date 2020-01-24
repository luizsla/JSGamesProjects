/**
 * Arquivo que contém códigos base da interface e eleementos de markup que são utilizados pelas demais View da aplicação.
 */

//Seletores utilizados pelo JS da aplicação para manipular os elementos HTML
export const elements = {
    search: {
        form: document.querySelector(".search"),
        input: document.querySelector(".search__field"),
        resultList: document.querySelector(".results__list"),
        resultContainer: document.querySelector('.results'),
        resultPages: document.querySelector('.results__pages'),
    },
    recipe: {
        recipe: document.querySelector('.recipe'),
    },
    shoppingList: {
        list: document.querySelector('.shopping__list'),
    },
    likes: {
        list: document.querySelector('.likes__field'),
        items: document.querySelector('.likes__list'),
    }
};

const elementStrings = {
    loader: 'loader',
};

//Função que renderiza o spinner que apresenta o sinal de carregado.
export const renderLoader = parent => {
    const loader = `<div class="${elementStrings.loader}">
                        <svg>
                            <use href="img/icons.svg#icon-cw"></use>
                        </svg>
                    </div>`;
    
    parent.insertAdjacentHTML('afterbegin', loader);
}

//Função que limpa o spinner que apresenta o sinal de carregando.
export const clearLoader = () => {
    //Pegando o loader que está carregado na UI.
    const loader = document.querySelector(`.${elementStrings.loader}`);
    //Se ele existir vamos excluí-lo.
    if (loader) loader.parentElement.removeChild(loader);
};