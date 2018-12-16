var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersObj = new Schema({
    useName: String,
    passWord: String,
    articleList: Array,
    sex: String,
    image: String,
    delivery: String,
    desc: String
});
// {
//         title: String,
//         time: String,
//         views: Number,
//         answer: Number,
//         like: Number,
//         content: String,
//         images: String,
//         type: String
//     }
module.exports = mongoose.model('user',usersObj);