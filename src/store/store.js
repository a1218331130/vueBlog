import Vue from 'vue';
import Vuex from 'vuex'
// 引入modules文件
import modules from './modules'
import usually from './usually'
import getters from './getters'
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
       ...modules,
       usually
    },
    getters: {
       ...getters
    }
})