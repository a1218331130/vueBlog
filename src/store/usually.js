import axios from "axios"
const state = {
 count:2,
 useName: '',
 useImage: '',
 menuIndex: '我的首页',
 getTest: 12121212,
 rightHtml: ''
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
  },
  getRightHtml(state, rightHtml) {
     state.rightHtml = rightHtml
  },
  ['gettest'](state, payload) {
   state.getTest = payload.tree
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
    },
    ['tester']({commit}, params = {}) {
      commit({
         type: 'gettest',
         tree: 233333
      });
    }
   //  getCookies:function() {
   //    axios.post(payload.path,payload.datas).then(data=>{
   //       resolve(data)
   //    })
   //  }
}
export default {
    state,
    mutations,
    actions
}