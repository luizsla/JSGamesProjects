const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//Defining User schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
});
//Add passport mongoose's methods to the user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);