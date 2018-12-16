var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuObj = new Schema({
    menuName: String,
    children: [{
        menuName: String,
        childIndex:String,
        contentChildList: Array
    }],
    type: String,
    indexNumber: String,
    contentList: Array
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
module.exports = mongoose.model('menu',menuObj);