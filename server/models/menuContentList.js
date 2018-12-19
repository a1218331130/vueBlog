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
    detailId: String,
    commitList:[{type: Schema.Types.ObjectId, ref: 'commit'}]
});
var commitsObj = new Schema({
    commitId: String,
    timeCommit:String,
    useName: String,
    commitYime: String,
    userImage: String,
    commitConent: String,
    answerList:[{type: Schema.Types.ObjectId, ref: 'commitwo'}],
});
var commitsChildObj = new Schema({
    useName:String,
    commitYimeChild: String,
    useImage: String,
    commitConentChild: String,
    parentName: String,
});
var commitModel = mongoose.model('commit',commitsObj);
var commitChildModel = mongoose.model('commitwo',commitsChildObj);
exports.commitChildModel = commitChildModel;
exports.commitModel = commitModel;
exports.contentLi = mongoose.model('contentList',contentObj);