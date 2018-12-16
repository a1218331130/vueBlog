var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newUserObj = new Schema({
    userName: String,
    loginTime: String,
    userImage: String
});
module.exports = mongoose.model('newUser',newUserObj);