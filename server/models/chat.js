var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatObj = new Schema({
    groupPepole: String,
    groupTime: String
});
module.exports = mongoose.model('chats',chatObj);
// chatName: String,
// chatTime: String