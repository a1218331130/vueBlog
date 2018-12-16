var express = require('express');
var mongoose = require('mongoose');
var Router = express.Router();
var userModel = require('../models/blogUse');
var newUserModel = require('../models/newUser');
var commitChildModel = require('../models/commit').commitChildModel;
var commitModel = require('../models/commit').commitModel;
var path = require("path");
var fs = require("fs");
var formidable = require('../node_modules/formidable');
// mongoose.connect("mongodb://121.0.0.1:27017/userList");
mongoose.connect('mongodb://127.0.0.1:27017/userList');
mongoose.connection.on('connected',function(){
    console.log('连接成功');
});
mongoose.connection.on('error',function(){
    console.log('连接失败');
});
mongoose.connection.on('disconnected',function(){
    console.log('连接断开');
});
//拦截请求
Router.post('/image',function (req,res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../public/images");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        console.log(files);
        res.json({
            msg: files
        });
        // var filename = files.name;
        // var nameArray = filename.split('.');
        // var type = nameArray[nameArray.length - 1];
        // var name = '';
        // for (var i = 0; i < nameArray.length - 1; i++) {
        //     name = name + nameArray[i];
        // }
        // var date = new Date();
        // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        // var avatarName = name + time + '.' + type;
        // var newPath = form.uploadDir + "/" + avatarName;
        // fs.renameSync(files.the_file.path, newPath);
        // res.send({data:"/upload/"+avatarName})
    })
});
// 注册
Router.post('/regist',function(req,res,next){
   let params = {};
   var use = new userModel({
        useName: req.body.useName,
        passWord: req.body.passWord,
        articleList: []
   });
   use.save(function (err, result) {
       if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
           res.json({
                    states: 1,
                    msg: '注册成功'
              });
        }
    });
});

// 登陆
Router.post('/login',function(req,res,next){
   let params = {
       useName: req.body.useName,
       passWord: req.body.passWord,
   };
   console.log(params);
   userModel.find(params,function(err,doc){
      if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
           if(doc.length > 0){
              //设置cookie
               var newDate = new Date();
               let url = '';
               res.cookie('username', doc[0].useName, {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true
               if(doc[0].image === undefined) {
                  console.log(12);
                  res.cookie('userimage', '/static/img/no-image.png', {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true
                  url = '/static/img/no-image.png';
               }else if(doc[0].image === ''){
                  res.cookie('userimage', '/static/img/no-image.png', {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true
                  url = '/static/img/no-image.png';
               }else {
                  res.cookie('userimage', doc[0].image, {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true
                  url = doc[0].image;
               }
               let user_new = new newUserModel({
                    userName: req.body.useName,
                    loginTime: newDate.toLocaleString(),
                    userImage: url
               });
            //    console.log(req.cookies.username, 'req.cookies.username');
               user_new.save(function(err,user_news){
                   
               });
           }
           res.json({
                states: 1,
                msg: doc
            });
        }
   });
});
// 获取最近登陆
Router.post('/getNewUser',function(req,res,next){
    let params = {};
    let newUser2 = newUserModel.find(params).skip(0).limit(10).sort({_id:-1});
    newUser2.exec(function(err,doc){
       if(err) {
             res.json({
                 states: 0,
                 msg: err.message
             });
         }else {
            res.json({
                 states: 1,
                 msg: doc
             });
         }
    });
 });
// 获取用户信息
Router.post('/getSettingMsg',function(req,res,next){
    let params = {
        useName: req.cookies.username
    };
    console.log(params);
    userModel.findOne(params,function(err,doc){
       if(err) {
             res.json({
                 states: 0,
                 msg: err.message
             });
         }else {
            res.json({
                 states: 1,
                 msg: doc
             });
         }
    });
 });

 // 更新用户信息
 Router.post('/updateSetting',function(req,res,next){
    let params = {
        useName: req.cookies.username
    };
    let updateParams = {
        useName: req.body.name,
        sex: req.body.sex,
        image: req.body.image,
        delivery: req.body.delivery,
        desc: req.body.desc
    }
    userModel.update(params, {$set: updateParams},function(err,doc){
        if(err) {
            res.json({
                states: 0,
                msg: err.message
            });
        }else {
           res.cookie('username', req.body.name, {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true
           res.cookie('userimage', req.body.image, {maxAge: 1000*60*60*24*30,httpOnly: true}); //, signed: true 
        //    commitModel.update({'useName':req.body.name}, {$set:{'userImage':req.body.image}}).run();
           commitChildModel.updateMany({'useName':req.body.name}, {$set:{'useImage':req.body.image}},function(err,doc){
              commitModel.updateMany({'useName':req.body.name}, {$set:{'userImage':req.body.image}},function(err,doc1){
                    res.json({
                        states: 1,
                        msg: doc1
                    });
                });
           });
        }
    })
 });
// 获取用户名
Router.post('/getUserNames', function(req, res, next){
   let user = req.cookies.username;
   if(user) {
      res.json({
          state: 1,
          msg: user
      });
   }else {
      res.json({
          state: 0,
          msg: '你还没有登陆'
      }); 
   }
});

// 退出登陆
Router.post('/loginOut', function(req, res, next){
   res.clearCookie('username');
   res.json({
          state: 1,
          msg: '退出成功'
    });
});
module.exports = Router;