var express = require('express');
var Router = express.Router();
var chatModel = require('../models/chat');
var chatConModel = require('../models/chatcontent');
Router.post('/pepole',function(req,res,next){
      let newDate = new Date();
      let pepoleList = new chatModel({
         groupPepole: req.body.loginName,
         groupTime:  newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString()
      });
      pepoleList.save(function(err,doc){
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
    //   let pepoleObj = {
    //      loginName: req.body.loginName,
    //      loginTime: newDate.toLocaleDateString()
    //   }
    //   chatModel.update({}, {
    //             '$push': {
    //                 groupPepole: {
    //                     $each: [pepoleObj],
    //                     $sort: { _id: -1 }
    //                 }
    //               }
    //             }, function(err, shuoYe) {
    //                 if(err) {
    //                     res.json({
    //                         states: 0,
    //                         msg: '保存失败'
    //                     });
    //                 }else {
    //                     res.json({
    //                         states:1,
    //                         msg: '保存成功'
    //                     });
    //                 }
    //          });
});
Router.post('/content',function(req,res,next){
    let newDate = new Date();
    let conList = new chatConModel({
        chatName: req.body.chatName,
        chatContent: req.body.chatContent,
        chatTime: newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString()
    });
    conList.save(function(err,doc){
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
Router.post('/geContentList',function(req,res,next){
    chatConModel.find({}, function(err,doc){
      if(err) {
          res.json({
              states: 0,
              msg: err.message
          });
      }else {
          res.json({
              states: 1,
              msg: doc,
              count:doc.length
          });
      }
    });  
});
Router.post('/getUserList',function(req,res,next){
    chatModel.find({}, function(err,doc){
      if(err) {
          res.json({
              states: 0,
              msg: err.message
          });
      }else {
          res.json({
              states: 1,
              msg: doc,
              count:doc.length
          });
      }
    });  
});
Router.post('/out',function(req,res,next){
    let conditions = {
        groupPepole: req.body.loginName
    }
    chatModel.remove(conditions, function (err,doc) {
        if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
            res.json({
                states: 1,
                msg: 'doc'
            });
        }
    });
});
module.exports = Router;