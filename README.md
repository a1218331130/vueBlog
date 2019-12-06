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

# 打包在根目录下运行
npm run build
```
## 版本更新
#1.0.0

1.新增用户后台管理页面和文章管理页面

#1.0.1

1.优化前端界面

2.优化富文本编辑器，添加mavon-editor，支出预览，代码高亮，图片上传

3.优化富文本编辑器返回值格式以及页面代码高亮样式

4.优化用户登录，模拟单点登录

5.恢复用户登录注册功能

6.优化音乐播放器

7.添加animate.css动画插件

#1.0.2

1.修复代码生成器
https://www.jianshu.com/p/dc3a2f134991

## 博客页面

![image](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E4%B8%BB%E9%A1%B5.PNG)
![image](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E5%8F%91%E5%B8%83.PNG)
![image](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.PNG)
![image](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E8%AF%A6%E6%83%85.PNG)
![image](https://github.com/a1218331130/vueBlog/blob/master/static/blogImage/%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8.png)
