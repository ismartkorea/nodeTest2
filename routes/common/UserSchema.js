var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email : String,
    password : String,
    userid : String,
    username : String
});

module.exports = UserSchema;