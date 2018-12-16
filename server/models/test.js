var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var testObj = new Schema({
    id : Number,
    name : String,
    sex : String,
    age : Number,
    class : String
});
module.exports = mongoose.model('test', testObj);