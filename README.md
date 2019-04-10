# 基于vue+node+express+mongdb的个人博客

> 技术应用
  1.前端框架时用vue2搭建，基于elementUI
  2.vue-router的路由守卫，http请求拦截以及基于node的token认证用以实现登录验证与权限控制
  3.vuex的应用，建立并维护一个单一的、全应用范围共享的状态树，这里主要实现用户信息的保存，token的存储等
  4.ES6 Promise对axaios的封装，这里面用到了代码生成器，具体实现可以看我的简书博客https://www.jianshu.com/p/1acc54b8febe
  5.后台使用mongoose进行数据的增删改查
  6.elementUI原生组件的使用和封装，以及一些外部组件的使用比如轮播组件，富文本编辑器等
  7.基于个人音乐播放器的制作，这里用到了跨域jsonp，主要使用百度api的接口，具体实现可以看我的简书博客https://www.jianshu.com/p/db0b6f58a9f3
  8.使用webpack对项目进行打包，使用nginx对项目进行部署
  9.sockt.io的使用，这里主要实现一个简单的聊天工具具体实现可以看我的简书博客https://www.jianshu.com/p/97de168cc3bf
  10.其他的就是一些css3，html5的页面优化
  

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
