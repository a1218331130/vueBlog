import Vue from 'vue';
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex);

const state = {
 count:2,
 useName: '',
 useImage: '',
 menuIndex: '我的首页'
}
const mutations={
  changeMenuIndex(state, newMenuIndex) {
     state.menuIndex = newMenuIndex 
  },
  changeUser(state, newUser) {
     state.useName = newUser
  },
  getUseImage(state, newImage) {
     state.useImage = newImage
  }

 }
 const actions={
    post:function(context,payload){//这里的context和我们使用的$store拥有相同的对象和方法
       return new Promise(function(resolve, reject){
         axios.post(payload.path,payload.datas).then(data=>{
            resolve(data)
         })
       });
    },
    get:function(context,payload){//这里的context和我们使用的$store拥有相同的对象和方法
       return new Promise(function(resolve, reject){
         axios.get(payload.path,{params:payload.datas}).then(data=>{
            resolve(data)
         })
       });
    }
   //  getCookies:function() {
   //    axios.post(payload.path,payload.datas).then(data=>{
   //       resolve(data)
   //    })
   //  }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})