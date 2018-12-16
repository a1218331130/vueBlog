var express = require('express');
var Router = express.Router();
var musicModel = require('../models/music');
Router.post('/collect',function(req,res,next){
      let musiCollect = new musicModel({
        song_id: req.body.song_id,
        author: req.body.author,
        title: req.body.title,
        hot: req.body.hot
      });
      musiCollect.save(function(err,doc){
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
Router.post('/list',function(req,res,next){
    musicModel.find({},function(err,doc){
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
module.exports = Router;