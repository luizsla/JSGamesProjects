/**
 * Controller global da aplicação de acordo com um modelo MVC
 */
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import * as searchView from './views/SearchView';
import * as recipeView from './views/RecipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/**
 * O gerenciador de estado do objeto
 * - Search objects
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    //Pegando a palavra de busca do formulário
    const query = searchView.getSearchInput();
    //Se existir a query quando o usuário clicou no botão.
    if (query) {
        //Vamos marcar o estado da aplicação com o objeto do modelo de busca
        state.search = new Search(query);
        //Vamor fazer alguns tricks de UI para indicar para o usuário que estamos buscando as informações
        searchView.clearInput();
        searchView.clearResults();
        //Mostrando o spinner de carregando
        renderLoader(elements.search.resultContainer);
        //Vamos fazer a busca de forma assíncrona.
        try {
            await state.search.getResults();
            //Vamos renderizar esses resultados na UI
            clearLoader();
            searchView.renderResuts(state.search.result);
        } catch (error) {
            alert('Algo deu errado!');
            clearLoader();
        }
    }
}

/**
 * Listener no formulári de submissão dos tipos de receitas para fazer uma busca no aplicativo
 * quando o usuário digita o que quer e clica em "Search".
 */
elements.search.form.addEventListener('submit', event => {
    event.preventDefault();
    //Chamando a função do controlador para realizar a busca.
    controlSearch();
});

/**
 * Listener nos botões de paginação das receitas buscadas por palavra-chave na UI.
 */
elements.search.resultPages.addEventListener('click', event => {
    const btn = event.target.closest('.pagination-btn');

    if (btn) {
        const page = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        //Vamos renderizar os resultados paginados com a nova página
        searchView.renderResuts(state.search.result, page);
    }
});


/**
 * Recipe controller.
 */
const controlRecipe = async () => {
    const id = parseInt(window.location.hash.replace('#', ''), 10);
    //Se tivermos um id válido.
    if (id) {
        //Limpando o container da receita
        recipeView.clearRecipeContainer();
        //Renderizando o loader.
        renderLoader(elements.recipe.recipe);
        //Vamos marcar o recipe selecionado com a classe correta.
        if (state.search) recipeView.highlightSelected(id);
        //Construindo o objeto da receita escolhida.
        state.recipe = new Recipe(id);
        //Buscando os dados do mesmo.
        try {
            await state.recipe.getRecipe();
            //Calcular a quantidade de poções e tempo.
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            //Inserir a nova receita na UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(state.recipe.id));
        } catch (error) {
            alert('Erro ao processar receita!');
        }
    }
}


const controlList = () => {
    //criar nova lista
    if (!state.list) state.list = new List();
    //adicionar os ingredientes para a lista
    state.recipe.ingredients.forEach(ingredient => {
        //adicio
        const newListItem = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(newListItem);
    });
};

const controlLike = () => {
    // Instanciando novo like
    if (!state.likes) state.likes = new Like();
    // Pegando o id da receita
    const currentId = state.recipe.id;
    //Vamos ver se o usuário já adicionou o like à sua lista de receitas adoradas.
    if (!state.likes.isLiked(currentId)) {
        //Criando novo like
        const newLike = state.likes.addLike(
            currentId, 
            state.recipe.title,
            state.recipe.author,
            state.recipe.image_url,
        );
        //Marcando o botão de like como ativo.
        likesView.toggleLikeButton(true);
        //Adicionando o like à lista de likes na UI.
        likesView.renderLike(newLike);
    } else {
        //Removendo o like da lista de likes.
        state.likes.removeLike(currentId);
        //Marcando o botão de like como inativo.
        likesView.toggleLikeButton(false);
        //Removendo o like da UI da lista de likes.
        likesView.deleteLike(currentId);
    }

    //Controlando a visibilidade o menu com os likes
    likesView.toggleLikesMenu(state.likes.getNumberOfLikes());
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * Listener que escuta pelo load na página para popular os likes do usuário.
 */
window.addEventListener('load', () => {
    state.likes = new Like();

    state.likes.readStorage();

    likesView.toggleLikesMenu(state.likes.getNumberOfLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like));
});


elements.recipe.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.add-ingredients-to-list, .add-ingredients-to-list *')) {
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});

/**
 * Listener que escuta pelas ações na lista de compras para excluir um ítem da lista ou aumentar/diminuir a quantidade do mesmo.
 */
elements.shoppingList.list.addEventListener('click', event => {
    //Pegando o id do ingrediente que queremos excluir ou modificar.
    const id = event.target.closest('.shopping__item').dataset.itemId;

    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        //Deletar o ícone da lista
        state.list.removeItem(id);
        //Deletar o ícone da interface
        listView.deleteItem(id);
    } else if (event.target.matches('.shopping__count-value, .shopping__count-value *')) {
        const val = parseFloat(event.target.value);
        state.list.updateCount(id, val);
    }
});