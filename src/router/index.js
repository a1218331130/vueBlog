import Vue from 'vue'
import Router from 'vue-router'
import blogIndex from '@/views/index'
import issueComponent from '@/views/issue'
import detailComponent from '@/views/detail'
import autorComponent from '@/views/autor'
import musicComponent from '../components/music/music'
import courseComponent from '../components/course/course'
import loginComponent from '../components/common/login'
import chatComponent from '../components/chat/chat'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'blogIndex',
    redirect: '/blog',
    component: blogIndex
  },
  {
    path: '/blog',
    name: 'blogIndex',
    component: blogIndex
  },
  {
    path: '/blog/detail',
    name: 'detail',
    component: detailComponent
  },
  {
    path: '/issue',
    name: 'issue',
    component: issueComponent
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
