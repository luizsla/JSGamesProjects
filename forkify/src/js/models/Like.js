export default class Like {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image_url) {
        const like = {
            id,
            title,
            author,
            image_url,
        };

        this.likes.push(like);

        this.persistData();

        return like;
    }

    removeLike(id) {
        //Achando o index do item que queremos deletar.
        const index = this.likes.findIndex(like => like.id === id);
        //Deletando o item e modificando o objeto inicial.
        this.likes.splice(index, 1);

        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(like => like.id === id) !== -1;
    }

    getNumberOfLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        if (storage) this.likes = storage;
    }
}