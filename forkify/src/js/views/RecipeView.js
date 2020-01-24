import {elements} from './base';
import {Fraction} from 'fractional';


/**
 * Função que limpa o container da receita na UI.
 */
export const clearRecipeContainer = () => elements.recipe.recipe.innerHTML = '';

/**
 * Função que adiciona a classe highlight que apresenta efeito visual para a receita selecionada.
 */
export const highlightSelected = id => {
    //Vamos limpar a classe de todos os links
    const allRecipeLinks = Array.from(document.querySelectorAll('.results__link'));
    allRecipeLinks.forEach(el => el.classList.remove('results__link--active'));

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

const formatCount = count => {
    if (count) {
        //Tratar o número flutuante e torná-lo em um array de dois elementos.
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));
        //Se não tiver número decimal é um número inteiro
        if (!dec) return count;
        //Se int for igual a zero estamos falando de uma unidade fracionária menor que 1.
        if (int === 0) {
            return new Fraction(count).toString();
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.toString()}`;
        }
    }

    return '-';
};

/**
 * Função que renderiza os ingredientes da receita.
 *  Chamada pelo renderRecipe().
 */
const renderIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

/**
 * Função que renderiza a receita na UI.
 */
export const renderRecipe = (recipe, isLiked) => {
    //Fazendo o templating do recipe
    const htmlCode =    `<figure class="recipe__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
                            <h1 class="recipe__title">
                                <span>${recipe.title}</span>
                            </h1>
                        </figure>
                        <div class="recipe__details">
                            <div class="recipe__info">
                                <svg class="recipe__info-icon">
                                    <use href="img/icons.svg#icon-stopwatch"></use>
                                </svg>
                                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                                <span class="recipe__info-text"> minutes</span>
                            </div>
                            <div class="recipe__info">
                                <svg class="recipe__info-icon">
                                    <use href="img/icons.svg#icon-man"></use>
                                </svg>
                                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                                <span class="recipe__info-text"> servings</span>

                                <div class="recipe__info-buttons">
                                    <button class="btn-tiny btn-decrease">
                                        <svg>
                                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                                        </svg>
                                    </button>
                                    <button class="btn-tiny btn-increase">
                                        <svg>
                                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                                        </svg>
                                    </button>
                                </div>

                            </div>
                            <button class="recipe__love">
                                <svg class="header__likes">
                                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                                </svg>
                            </button>
                        </div>



                        <div class="recipe__ingredients">
                            <ul class="recipe__ingredient-list">
                                ${recipe.ingredients.map(ingredient => renderIngredient(ingredient)).join('')}
                            </ul>

                            <button class="btn-small recipe__btn add-ingredients-to-list">
                                <svg class="search__icon">
                                    <use href="img/icons.svg#icon-shopping-cart"></use>
                                </svg>
                                <span>Add to shopping list</span>
                            </button>
                        </div>

                        <div class="recipe__directions">
                            <h2 class="heading-2">How to cook it</h2>
                            <p class="recipe__directions-text">
                                This recipe was carefully designed and tested by
                                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                            </p>
                            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                                <span>Directions</span>
                                <svg class="search__icon">
                                    <use href="img/icons.svg#icon-triangle-right"></use>
                                </svg>

                            </a>
                        </div>`;
    //Adicionando o mesmo no HTML
    elements.recipe.recipe.insertAdjacentHTML('afterbegin', htmlCode);
};

/**
 * Função que realiza a alteração na UI dos servings da receita após o usuário clicar em aumentar ou diminuir os mesmos.
 */
export const updateServingsIngredients = recipe => {
    //Atualizando o número de servings na UI
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    //Atualizando os ingredientes
    const countIngredients = Array.from(document.querySelectorAll('.recipe__count'));
    countIngredients.forEach((el, index) => {
        el.textContent = formatCount(recipe.ingredients[index].count);
    });
}