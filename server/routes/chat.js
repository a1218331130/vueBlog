var express = require('express');
var Router = express.Router();
var chatModel = require('../models/chat');
var chatConModel = require('../models/chatcontent');
// 保存登陆用户
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
// 保存用户发布内容
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
//获取内容并返回
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
//获取用户列表
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
//退出登陆
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