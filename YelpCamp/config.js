module.exports = {
    port: 3000,
    viewEngine: 'ejs',
    db: {
        connection: 'mongodb://localhost:27017/yelp_camp',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    },
};
