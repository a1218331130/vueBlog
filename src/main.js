// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../static/icon/iconfont.css'
import store from './store/store'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueJsonp from 'vue-jsonp'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'../static/loading.gif',
    loading:'../static/loading.gif'
})
Vue.use(VueJsonp)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
