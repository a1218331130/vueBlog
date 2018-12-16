var express = require('express');
var Router = express.Router();
var menuModel = require('../models/menuType');
var contentListModel = require('../models/menuContentList');
// var resDoc = require('../commonJs/res').resDoc;
var commitModel = require('../models/commit').commitModel;
var commitChildModel = require('../models/commit').commitChildModel;
// var userModel = require('../models/blogUse');
//添加评论
// function resDoc(err,doc,res){
//     if(err) {
//         res.json({
//             states: 0,
//             msg: err.message
//         });
//     }else {
//         res.json({
//             states: 1,
//             msg: doc
//         });
//     }
// }
Router.post('/addCommit',function(req,res,next){
    let newDate = new Date();
    let commit = new commitModel({
        commitId:req.body.commitId,
        timeCommit:req.body.timeCommit,
        useName: req.cookies.username,
        userImage: req.cookies.userimage,
        commitYime: newDate.toLocaleDateString(),
        commitConent: req.body.commitConent,
        answerList:[]
     });
     commit.save(function(err,doc){
        if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
            res.json({
                states: 1,
                msg: '保存成功'
            });
        }
    });
});
//添加二级评论
Router.post('/addCommitChild',function(req,res,next){
    let newDate = new Date();
    // let commitChildList = [];
    let params = {
        timeCommit:req.body.timeCommit,
    }
    var commit2 = new commitChildModel({
        useName: req.cookies.username,
        commitYimeChild: newDate.toLocaleDateString(),
        useImage: req.cookies.userimage,
        commitConentChild: req.body.commitConentChild,
        parentName: req.body.parentName
     });
     commit2.save(function(err,doc){
        if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
            commitModel.update(params,{
                '$push':{
                    answerList: {
                        $each: [doc._id]
                    }
                 }
                },function(err,doc){
                    if(err) {
                        res.json({
                            states: 0,
                            msg: err.message
                        });
                    }else {
                        res.json({
                            states: 1,
                            msg: '添加评论成功'
                        });
                    }
                }     
           );
        }
    });
});
// 获取评论
Router.post('/getCommit',function(req,res,next){
    let params = {
        commitId: req.body.commitId
    }
    commitModel.find(params)
    .populate('answerList')
    .exec(function(err,doc1){
        if(err) {
            res.json({
                states: 0,
                msg: '获取评论失败'
            });
         }else {
             res.json({
                 states: 1,
                 msg: doc1
             });
         }
    });
});
// 获取最新评论
Router.post('/getNewCommit',function(req,res,next){
    let params = {}
    commitModel.find(params).skip(0).limit(10).sort({_id:-1})
    .exec(function(err,doc1){
        if(err) {
            res.json({
                states: 0,
                msg: '获取评论失败'
            });
         }else {
             res.json({
                 states: 1,
                 msg: doc1
             });
         }
    });
});
// 获取菜单列表
Router.post('/getMenu', function(req, res, next){
    let params = {};
    let menuModelSort =menuModel.find(params).sort({indexNumber:1})
    menuModelSort.exec(params, function(err, doc){
        if(err) {
           res.json({
               states: 0,
               msg: '获取头部目录失败'
           });
        }else {
            res.json({
                states: 1,
                msg: doc
            });
        }
    });
});

// 获取子列表
Router.post('/getMenuChild', function(req, res, next){
    let params = {
        menuName: req.body.menuName
    };
    menuModel.find(params, function(err, doc){
        if(err) {
           res.json({
               states: 0,
               msg: '获取头部子目录失败'
           });
        }else {
            if(doc[0].type === '2') {
                res.json({
                    states: 0,
                    msg: '无子目录'
                });
            }else {
                res.json({
                    states: 1,
                    msg: doc
                });
            }
        }
    });
});

// 添加内容
Router.post('/addContent', function(req, res, next){
    let params = {
        menuName: req.body.region
    };
    let newDate = new Date();
    let contentModel = new contentListModel({
        menuName: req.body.region,
        title: req.body.name,
        desc1: req.body.desc1,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        regionChild: req.body.imgUrl,
        autor: req.cookies.username,
        time: newDate.toLocaleDateString(),
        zan: 0,
        pinglun: 0,
        detailId: req.body.detailId,
    });
    contentModel.save(function(err,doc){
        console.log(doc,'wewewewewewee');
        if(err) {
           res.json({
               states: 0,
               msg: '保存失败'
           });
        }else {
            res.json({
                states: 1,
                msg: '保存成功'
            });
        }
    });
//     addArray[0] = addData
//     menuModel.update(params, {
//         '$push': {
//             contentList: {
//                 $each: addArray,
//                 $sort: { detailId: -1 }
//              }
//           }
//         }, function(err, data) {
//             if(err) {
//                 res.json({
//                     states: 0,
//                     msg: '保存失败'
//                 });
//             }else {
//                 console.log(data, 'data');
//                 menuModel.update({menuName: '我的首页'}, {
//                     '$push': {
//                         contentList: {
//                             $each: addArray,
//                             $sort: { detailId: -1 }
//                          }
//                       }
//                     }, function(err, shuoYe) {
//                         if(err) {
//                             res.json({
//                                 states: 0,
//                                 msg: '保存失败'
//                             });
//                         }else {
//                             res.json({
//                                 states:1,
//                                 msg: '保存成功'
//                             });
//                         }
//                  });
//             }
//      });
});

// 获取列表数据
Router.post('/getList', function(req, res, next){
    let params = {
        menuName: req.body.menuName === '我的首页' ?  {} : req.body.menuName
    };
    if(req.body.menuName === '我的首页') {
        params  = {}
    }else {
        params = {
            menuName: req.body.menuName
        }
    }
    console.log(params, 'params');
    let pageSize = req.body.pageSize;
    let pageIndex = req.body.pageIndex;
    let skip = (pageIndex-1)*pageSize;
    contentListModel.find(params).skip(skip).limit(pageSize).sort({detailId:-1}).exec(function(err,doc){
        if(err) {
            res.json({
                states: 0,
                msg: '获取列表数据失败'
            });
         }else {
            contentListModel.count(params,function(err,count){
                res.json({
                    states: 1,
                    msg: doc,
                    total:count
                });
            })
         }
    });
    // menuModel.findOne(params, {
    //     contentList: {
    //  　　　　$slice: pageArray   //第一个值表示要跳过的数组中的项目数，第二个值表示要返回的项目数
    //  　　}
    //  }).exec(function(err, doc) {
    //     if(err) {
    //         res.json({
    //             states: 0,
    //             msg: '获取列表数据失败'
    //         });
    //      }else {
    //          menuModel.findOne(params,function(err, doc1){
    //             res.json({
    //                 states: 1,
    //                 msg: doc,
    //                 total:doc1.contentList.length
    //             });
    //          })
    //      }
    //  });
    // console.log(params);
    // menuModel.find(params, function(err, doc){
    //     if(err) {
    //        res.json({
    //            states: 0,
    //            msg: '获取列表数据失败'
    //        });
    //     }else {
    //         res.json({
    //             states: 1,
    //             msg: doc
    //         });
    //     }
    // });
});

// 获取z最新数据
Router.post('/getNewList', function(req, res, next){
    let params = {
    };
    contentListModel.find(params).skip(0).limit(5).sort({detailId:-1}).exec(function(err,doc){
        if(err) {
            res.json({
                states: 0,
                msg: '获取列表数据失败'
            });
         }else {
            contentListModel.count(params,function(err,count){
                res.json({
                    states: 1,
                    msg: doc,
                    total:count
                });
            })
         }
    });
});

// 查看详情
Router.post('/getDetail', function(req, res, next){
    let params = {
        detailId: req.body.id
    };
    var newDate = new Date();
    console.log(newDate.toLocaleDateString());
    console.log(newDate.toLocaleString());
    // let params1 = {
    //     menuName: '我的首页'
    // };
    // console.log(params);
    contentListModel.findOne(params, function(err, doc){
        if(err) {
           res.json({
               states: 0,
               msg: '获取列表数据失败'
           });
        }else {
            res.json({
                states: 1,
                msg: doc
            });
            // var arrays = [];
            // var arrays1 = {};
            // var zanNun = 0;
            // var pingNun = 0;
            // for(var i = 0; i<doc.length; i++) {
            //   if(doc[i].menuName !== '我的首页') {
            //      arrays = doc[i].contentList;
            //   }
            // }
            // for(var i = 0; i<doc.contentList.length; i++) {
            //     if(doc.contentList[i].detailId === req.body.id) {
            //        arrays1 = doc.contentList[i];
            //     }
            // }
            // zanNun = parseInt(arrays1.zan);
            // zanNun ++;
            // console.log(zanNun);
            // menuModel.updateMany({'contentList.detailId':req.body.id}, {$set:{'contentList.$.zan':zanNun.toString()}},function(err,docs){
            //     if(err) console.log(err);
            //     res.json({
            //         states: 1,
            //         msg: arrays1,
            //         dov:docs
            //     });
            // });
        }
    });
});
module.exports = Router;