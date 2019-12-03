import Vue from 'vue'
import Router from 'vue-router'
// import blogIndex from '@/views/index'
// import issueComponent from '@/views/issue'
// import detailComponent from '@/views/detail'
// import autorComponent from '@/views/autor'
// import articleComponent from '@/views/article'
// import musicComponent from '../components/music/music'
// import courseComponent from '../components/course/course'
// import loginComponent from '../components/common/login'
// import chatComponent from '../components/chat/chat'

const blogIndex = ()=>import("@/views/index")
const issueComponent = ()=>import("@/views/issue")
const detailComponent = ()=>import("@/views/detail")
const autorComponent = ()=>import("@/views/autor")
const articleComponent = ()=>import("@/views/article")
const firstPageComponent = ()=>import("@/views/first-page")
const musicComponent = ()=>import("../components/music/music")
const courseComponent = ()=>import("../components/course/course")
const loginComponent = ()=>import("../components/common/login")
const chatComponent = ()=>import("../components/chat/chat")
const tagsComponent = ()=>import("../components/tags/tags")
const timeComponent = ()=>import("../components/tags/time-line")
const openComponent = ()=>import("../components/open/open")
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'blogIndex',
    redirect: '/blog/firstPage',
    component: blogIndex
  },
  {
    path: '/blog',
    name: 'blogIndex',
    component: blogIndex,
    children: [
       {
        path: '/blog/firstPage',
        name: 'firstPage',
        component: firstPageComponent
       },
       {
        path: '/blog/detail',
        name: 'detail',
        component: detailComponent
       },
       {
        path: '/blog/tags',
        name: 'tags',
        component: tagsComponent
       },
       {
        path: '/blog/timeLine',
        name: 'timeLine',
        component: timeComponent
       },
       {
        path: '/blog/open',
        name: 'open',
        component: openComponent
       }
    ]
  },
  {
    path: '/issue',
    name: 'issue',
    component: issueComponent
  },
  {
    path: '/article',
    name: 'article',
    component: articleComponent
  },
  {
    path: '/autor',
    name: 'autor',
    component: autorComponent
  },
  {
    path: '/music',
    name: 'music',
    component: musicComponent
  },
  {
    path: '/course',
    name: 'course',
    component: courseComponent
  },
  {
    path: '/login',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/chat',
    name: 'chat',
    component: chatComponent
  }
];
const router = new Router({
  mode: 'hash', // mode的值为history的时候不需要#，为hash的时候需要
  routes
});
export default router;
