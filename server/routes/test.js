var express = require('express');
var mongoose = require('mongoose');
var Router = express.Router();
var test1 = require('../models/test');
mongoose.connect('mongodb://127.0.0.1:27017/demo');
mongoose.connection.on('connected',function(){
    console.log('连接成功');
});
Router.get('/',function(req,res,next){
   let sort = req.param("sort");
   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));
   let skip = (page-1)*pageSize;
   let testMoudle = test1.find({}).skip(skip).limit(pageSize).sort({'id': sort});
   testMoudle.exec(function(err,doc){
      res.json({
          msg: doc
      });
   });
});

module.exports = Router;