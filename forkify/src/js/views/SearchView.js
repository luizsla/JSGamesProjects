/**
 * Classe view que contém toda a lógica dos UI tricks que devem ser utilizados na View.
 */
import {elements} from './base';


export const getSearchInput = () => elements.search.input.value.trim();

/**
 * Funções que limpam certos componentes a UI e são chamadas no controller
 */
export const clearInput = () => elements.search.input.value = '';

export const clearResults = () => {
    elements.search.resultList.innerHTML = '';
    elements.search.resultPages.innerHTML = '';
};

/**
 * Método privados utilizados para ações das visões relacionadas às buscas como montagem de elementos, etc.
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) newTitle.push(curr);

            return acc + curr.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}

/**
 * Função responsável por renderizar uma receita e printar o HTML da mesma na tela para o usuário final. 
 */
const renderRecipe = recipe => {
    //Vamos criar o HTML do elemento a se inserido.
    const recipeHTMLCode = `<li>
                                <a class="results__link" href="#${recipe.recipe_id}">
                                    <figure class="results__fig">
                                        <img src="${recipe.image_url}" alt="${recipe.title}">
                                    </figure>
                                    <div class="results__data">
                                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                        <p class="results__author">${recipe.publisher}</p>
                                    </div>
                                </a>
                            </li>`;
    //Vamos colocar o novo elemento na lista de resultados.
    elements.search.resultList.insertAdjacentHTML('beforeend', recipeHTMLCode);
};

//Função que retorna o html dos botões da paginação do aplicativo a serem renderizados pela busca.
const createButton = (page, type) => `
    <button class="pagination-btn btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

/**
 * Função responsável por renderizar os botões da paginação dos resultados das receitas.
 */
const renderButtons = (page, numResults, resPerPage) => {
    //Definindo o número total de páginas a serem exibidas.
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Apenas o botão próximo
        button = createButton(page, 'next');
    } else if (page === pages && pages > 1) {
        //Apenas o botão anterior
        button = createButton(page, 'prev');
    } else {
        // Os dois botões, próximo e anterior
        button = `${createButton(page, 'prev')} ${createButton(page, 'next')}`;
    }
    //Inserindo os botões no container
    elements.search.resultPages.insertAdjacentHTML('afterbegin', button);
};

/**
 * Método responsável por receber uma lista de receitas para renderizar, iterar sobre elas e chamar 
 *  individualmente a renderização de cada receita separada. 
 */
export const renderResuts = (recipies, page = 1, resPerPage = 10) => {
    //Setando os delimitadores da paginação.
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    //Renderizando as receitas dessa página.
    recipies.slice(start, end).forEach(recipe => renderRecipe(recipe));
    //Renderizando os botões de paginação 
    renderButtons(page, recipies.length, resPerPage);
};