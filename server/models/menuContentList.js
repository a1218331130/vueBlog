var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contentObj = new Schema({
    menuName: String,
    title: String,
    desc1: String,
    content: String,
    imgUrl: String,
    regionChild: String,
    autor: String,
    time: String,
    zan: Number,
    pinglun: Number,
    detailId: String
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
module.exports = mongoose.model('contentList',contentObj);