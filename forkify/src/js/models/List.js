/**
 * Classe responsável por toda a lógica da lista de compras.
 */
import uniqid from 'uniqid';


export default class List {
    constructor() {
        this.items = [];
    }

    /**
     * Adiciona elementos da lista de receitas.
     */
    addItem(count, unit, ingredient) {
        const newItem = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        };
        
        this.items.push(newItem);

        return newItem;
    }

    /**
     * Remove elemento da lista de receitas. 
     */
    removeItem(id) {
        //Achando o index do item que queremos deletar.
        const index = this.items.findIndex(item => item.id === id);
        //Deletando o item e modificando o objeto inicial.
        this.items.splice(index, 1);
    }

    /**
     * Método que altera a quantidade de ingredientes de uma recieta
     */
    updateCount(id, newCount) {
        this.items.find(item => item.id === id).count == newCount;
    }
}