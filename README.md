# 基于vue+node+express+mongdb的个人博客（1.0版）

## 技术应用

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
  

## 运行项目

``` bash
# 安装，这里需要有node的环境,先安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install

# serve文件夹下也安装module
cnpm install

# 安装mongodb具体怎么安装配置可以百度下

# 运行项目，在根目录下运行
npm run dev

# 运行mongoose
mongod -storageEngine mmapv1 --dbpath D:\MongoDB\data

# 运行node服务，在server文件夹下运行
npm start

# 在根目录下运行
npm run build
```
## 博客页面
![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E4%B8%BB%E9%A1%B5.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E8%AF%A6%E6%83%85.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E8%AF%84%E8%AE%BA.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E5%8F%91%E5%B8%83.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E6%88%91%E7%9A%84%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8.PNG)

![image text](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E8%81%8A%E5%A4%A9%E5%B7%A5%E5%85%B7.PNG)

