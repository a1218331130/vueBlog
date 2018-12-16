<template>
  <div class="hello">
      <header id="masthead" class="site-header site-header-s">
        <div id="header-main" class="header-main sliding headroom--not-bottom slideDown headroom--top">
          <nav id="top-header">
            <div class="top-nav">
              <div id="user-profile">
                <div class="nav-login" @click="openDialog" v-if="useName === ''">
                  <span class="flatbtn"><i class="iconfont icon-geren"></i>注册</span>
                </div>
                <div class="nav-login" v-if="useName !== ''">
                  <span class="flatbtn"><i class="iconfont icon-shouyefill"></i>你好 {{useName}}</span>
                </div>
                <div class="nav-set">
                  <div class="nav-login" @click="openDialog" v-if="useName === ''">
                    <span href="#login" class="flatbtn" id="login-main"><i class="iconfont icon-geren2"></i>登录</span>
                  </div>
                  <div class="nav-login" v-if="useName !== ''" style="padding:0px">
                    <span href="#login" class="flatbtn">欢迎访问博客</span>
                    <span href="#login" class="flatbtn" style="padding-left:10px;color:blue" @click="loginOut">退出</span>
                  </div>
                  </div>
                  <div class="clear"></div>
                  </div>
                  <div class="menu-t-container">
                    <ul id="menu-t" class="top-menu">
                      <li>
                        <span><i class="zm zm-shipin1"></i>
                        <span class="font-text">vip视频解析</span></span>
                      </li>
                      <li @click="toMusic">
                        <span><i class="zm zm-yinle1"></i>
                        <span class="font-text">Music</span></span>
                      </li>
                      <li>
                        <span><i class="zm zm-daimawenjian"></i>
                        <span class="font-text">代码高亮</span></span>
                      </li>
                      <li>
                        <span><i class="zm zm-yaoqing1"></i>
                        <span class="font-text">邀请码</span></span>
                      </li>
                      <li v-if="useName!=='admin'">
                        <span @click="toIssue" style="font-size:14px;cursor: pointer;">发表文章</span>
                        <!-- <router-link style="color:#444" tag="a" target="_blank" :to="{path:'/issue'}">发表文章</router-link> -->
                      </li>
                      <li v-if="useName==='admin'">
                        <span style="font-size:14px;cursor: pointer;" @click="toIssue">管理员</span>
                        <!-- <router-link style="color:#444" tag="a" target="_blank" :to="{path:'/issue'}">管理员</router-link> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
       </header>
       <login-dialog :dialog="loginDialogs" @close="closeDialog" @getUser="getUserName"></login-dialog>
  </div>
</template>
<style>
.comment-reply-login:hover{
  cursor: pointer;
}
.flatbtn {
  font-size: 14px;
}
.font-text:hover{
  cursor: pointer;
}
 #top-header {
    background: #e7e7e7;
    border-bottom: 1px solid #dedede;
}
.top-nav {
    height: 30px;
    width: 1120px;
    line-height: 30px;
    margin: 0 auto 0;
}
#user-profile, #user-profile a {
    float: left;
    color: #444;
}
#user-profile {
    position: relative;
    margin: 0 0 0 10px;
    width: 35%;
}
.top-menu {
    float: right;
    margin: 0 8px 0 0;
}
.top-menu li {
    float: left;
    padding: 0 5px;
}
.top-menu a {
    color: #444;
}
a:visited {
    color: #555;
}
.font-text {
    margin: 0 0 0 5px;
    font-size: 14px;
}
.user-login, .nav-login {
    float: left;
    margin-left: 5px;
}
.clear {
    clear: both;
    display: block;
}
.nav-login {
    color: #444;
    height: 25px;
    cursor: pointer;
    padding: 0 10px;
}
.user-login, .nav-login {
    float: left;
    margin-left: 5px;
}
#user-profile i {
    margin: 0 5px 0 0;
}
</style>
<script>
import axios from 'axios'
import loginDialog from './loginDialog'
import {mapState} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    loginDialog
  },
  data () {
    return {
      loginDialogs: false,
      ifLogin: false,
      sortFlag: true,
      page: 1,
      pageSize: 2,
      tests: [],
    }
  },
  computed: {
     ...mapState(['useName'])
  },
  methods: {
    toIssue() {
      let routeData = this.$router.resolve({
        name: "issue"
      });
      if(this.useName !== '') {
        window.open(routeData.href, '_blank');
      }else {
        this.$message({
            message: '请先登陆',
            type: 'error'
          });
      }
      // window.open(routeData.href, '_blank');
    },
    // 音乐播放器
    toMusic() {
      let routeData = this.$router.resolve({
        name: "music"
      });
      window.open(routeData.href, '_blank');
    },
    openDialog() {
       this.loginDialogs = true;
    },
    closeDialog(dataOne) {
       this.loginDialogs = false;     
    },
    // 获取用户名
    getUserName(dataOne) {
      if(dataOne.useName !== undefined) {
         this.$store.commit('changeUser', dataOne.useName);
       }
       this.init();
    },
    // 退出
    loginOut() {
       let paramOut = {
          type: 'post',
          path: '/blogUsers/loginOut',
          datas: {}
      }
      this.$store.dispatch(paramOut).then(res=>{
         this.ifLogin = false;
         this.$message({
            message: '退出成功',
            type: 'success'
          });
          this.$store.commit('changeUser', '');
      });
    },
    sortId() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.save();
    },
    save() {
       let param = {
         sort: this.sortFlag ? 1 : -1,
         page: this.page,
         pageSize: this.pageSize
       }
        axios.get('/test', {
          params: param
        }).then(res=>{
          this.tests = res.data.msg;
          console.log(res, 'resresresresresres');
        });
    },
    // 初始化用户名，判断是否已经登陆
    init() {
      let paramInit = {
          type: 'post',
          path: '/blogUsers/getUserNames',
          datas: {}
      }
      this.$store.dispatch(paramInit).then(res=>{
        if(res.data.state === 1) {
          this.$store.commit('changeUser', res.data.msg);
          this.ifLogin = true;
        }else {
          this.ifLogin = false;
        }  
      });
    }
  },
  mounted () {
    this.save();
    this.init();
    // this.myPromise().then(res=>{
    //   console.log(res, 'res');
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
