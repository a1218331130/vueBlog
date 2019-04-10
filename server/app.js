var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var testRouter = require('./routes/test');
var userRouter = require('./routes/blogUse');
var menuRouter = require('./routes/menu');
var musicRouter = require('./routes/music');
var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 路由拦截
app.use(function(req, res, next) {
  // var url=req.originalUrl;
  // var cooiesName = req.cookies.username;
  // console.log(cooiesName, 'cooiesNamecooiesNamecooiesNamecooiesName');
  // console.log(req, 'reqreqreq');
  // console.log(req.headers.token, 'resresresresres');
  next();
});
// app.use(async(ctx, next) => {
//   let header = ctx.request.header;
//   console.log(header, 'headerheaderheader');
// });
app.use('/test', testRouter);
app.use('/music', musicRouter);
app.use('/blogUsers', userRouter);
app.use('/menu', menuRouter);
app.use('/chat', chatRouter);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 静态文件
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

//允许跨域访问
app.all('*',function (req, res, next) {
    console.log(req,res)
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
module.exports = app;
