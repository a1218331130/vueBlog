
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var courseObj = new Schema({
    courseName: String,
    courseType: String,
    courseHtml: String,
    courseAutor:String,
    courseTime:String,
    courseHL: String
});
module.exports = mongoose.model('courseLists',courseObj);