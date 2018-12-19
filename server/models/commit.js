// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var commitsObj = new Schema({
//     commitId: String,
//     timeCommit:String,
//     useName: String,
//     commitYime: String,
//     userImage: String,
//     commitConent: String,
//     answerList:[{type: Schema.Types.ObjectId, ref: 'commitwo'}],
// });
// var commitsChildObj = new Schema({
//     useName:String,
//     commitYimeChild: String,
//     useImage: String,
//     commitConentChild: String,
//     parentName: String,
// });
// var commitModel = mongoose.model('commit',commitsObj);
// var commitChildModel = mongoose.model('commitwo',commitsChildObj);
// exports.commitChildModel = commitChildModel;
// exports.commitModel = commitModel;