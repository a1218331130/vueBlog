var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var musicObj = new Schema({
    song_id: String,
    author: String,
    title: String,
    hot: String
});
module.exports = mongoose.model('musics',musicObj);