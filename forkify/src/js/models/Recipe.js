/**
 * Modelo da aplicação responsável por realizar as buscas na API por receitas específicas após a busca por palavra chave.
 */
import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.apiAddress = 'https://forkify-api.herokuapp.com/api/get';
    }

    /**
     * Função assíncrona que realiza chamada de receita na API e popula o objeto da receita com dados externos.
     */
    async getRecipe() {
        try {
            //Fazendo a chamada da API
            const result = await axios(`${this.apiAddress}?rId=${this.id}`);
            //Populando o objeto com o resultado.
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image_url = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Método que calcula o tempo de preparo da receita seguindo a lógica básica de que 3 ingredientes levam 15 minutos para ficarem 
     *  prontos.
     */
    calcTime() {
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }

    /**
     * Método que retorna a quantidade de poçoes da refeição.
     */
    calcServings() {
        this.servings = 4;
    }

    /**
     * Função que faz o parse de todos os ingredientes que vieram da API e normalizam os mesmos de acordo com os requerimentos.
     *  O objetivo deste método é tratar a lista de ingredientes que é composta por um array com ingredientes em formato es string escrita
     *  em linguagem natural para objetos padrônizados que seguem uma estrutura padrão (quantidade, unidade e ingrediente) para facilitar 
     *  a montagem da lista de ingredientes na UI da aplicação.
     */
    parseIngredients() {
        //Mapeando as formas curtas das unidades de medida e as ocorrências delas de forma longa.
        const unitsMap = {
            tbsp: ['tablespoons', 'tablespoon'],
            oz: ['ounces', 'ounce'],
            tsp: ['teaspoon', 'teaspoons'],
            cup: ['cups'],
            pound: ['pounds'],
        };

        //Mapeando as formas longas das medidas e substituindo pelas formas curtas.
        this.ingredients = this.ingredients.map(ingredient => {
            //Passando tudo para lowercase
            ingredient = ingredient.toLowerCase();
            //Iterando nosso array e substituindo as palavras longas por suas versões curtas
            for (const shortElement in unitsMap) {
                if (unitsMap.hasOwnProperty(shortElement)) {
                    unitsMap[shortElement].forEach(longElement => {
                        ingredient = ingredient.replace(longElement, shortElement);
                    });
                }
            }
            //Removendo o conteúdos entre parêntesis do ingrediente.
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            //Fazendo parse das unidades contáveis dos ingredientes e transformando as strings dos ingredientes em objetos.
            const arrayIngredients = ingredient.split(' ');
            const unitIndex = arrayIngredients.findIndex(el => Object.keys(unitsMap).includes(el));
            let objectIngredient;

            if (unitIndex > -1) {
                //Achamos a unidade
                const arrayCount = arrayIngredients.slice(0, unitIndex);

                let count;
                if (arrayCount.length === 1) {
                    count = eval(arrayIngredients[0].replace('-', '+'));
                } else {
                    count = eval(arrayIngredients.slice(0, unitIndex).join('+'));
                }

                objectIngredient = {
                    count,
                    unit: arrayIngredients[unitIndex],
                    ingredient: arrayIngredients.slice(unitIndex + 1).join(' '),
                };
            } else if (parseInt(arrayIngredients[0], 10)) {
                //Se não acharmos o index da unidade mas o primeiro elemento do array é um número.
                objectIngredient = {
                    count: parseInt(arrayIngredients[0], 10),
                    unit: '',
                    ingredient: arrayIngredients.slice(1).join(' '),
                };
            } else if (unitIndex === -1) {
                //Se não achamos o index da unidade é porque ela não existe.
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient,
                };
            }

            return objectIngredient;
        });  
    }

    updateServings(type) {
        //Mudando a quantidade de pessoas
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        //Alterando os ingredientes
        this.ingredients.forEach(ingredient => ingredient.count *= (newServings / this.servings));
        //Alterando os servings
        this.servings = newServings;
    }
}