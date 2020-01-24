/**
 * Modelo da aplicação responsável por fazer as consultas na API do 
 */
import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query;
        this.apiAddress = 'https://forkify-api.herokuapp.com/api/search';
    }

    async getResults() {
        try {
            //Fazendo a consulta usando a biblioteca axios.
            const result = await axios(`${this.apiAddress}?q=${this.query}`);
            //Guardando o resultado da busca no objeto.
            this.result = result.data.recipes;
        } catch (error) {
            console.dir(error.message);
        }
    }
}