<template>
  <header class="js_header mod-header">
    <div class="mod-header__progress"></div>
    <div class="mod-header__wrap">
        <h1 class="js_fly mod-header__logo">
        </h1>
        <div class="js_menu mod-header__nav">
            <ul id="menu-nav" class="menu">
              <!-- <li @click="selectMenu(item.menuName,item.indexNumber)" v-for="(item,index) in menuList" v-bind:key="index" @mouseenter="enter(index)" @mouseleave="leave"><a href="javascript:void(0)">{{item.menuName}}</a></li> -->
              <li><a href="https://www.xuanfengge.com/category/h5">我的音乐</a></li>
              <li><a href="https://www.xuanfengge.com/category/web">关于作者</a></li>
              <li><a href="https://www.xuanfengge.com/category/skill">授人以渔</a></li>
              <li><a href="https://www.xuanfengge.com/category/ui">UI设计</a></li>
              <li><a href="https://www.xuanfengge.com/category/wordpress">WP视点</a></li>
              <li><a href="https://www.xuanfengge.com/category/code">程序人生</a></li>
              <li><a href="https://www.xuanfengge.com/about-message">关于&amp;留言</a></li>
            </ul>
        </div>
        <!-- <div class="mod-header__music-icon">
          <p v-if="useName !== ''" style="width:200px">hi,{{useName}}
            <span style="padding-left:5px;color:red" @click="loginOut">退出</span>
          </p>
          <p v-if="useName === ''" style="width:200px" @click="toLogin">登陆</p>
        </div> -->
    </div>
    <div class="audioUrl" style="opacity: 0;position:absolute">
                <audio
                   :src="musicUrl" 
                   controls="controls" 
                   ref="audio" 
                   autoplay="false">
                </audio>
    </div>
</header>
</template>
<style scoped>
.mod-header__music-icon{
    position: absolute;
    right: 00px;
    top: 25px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #29d;
}
.mod-header {
    width: 100%;
    height: 74px;
    position: relative;
    background: #eaebed;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff',endColorstr='#d4d7db');
    background: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#d4d7db));
    background: -moz-linear-gradient(top,#fff,#d4d7db);
    box-shadow: 0 4px 4px rgba(0,0,0,.2);
    display: block;
}
.mod-header__progress {
    width: 100%;
    height: 2px;
    background: #29d;
    -webkit-animation: hue 20s infinite linear;
}
.mod-header__wrap {
    position: relative;
    width: 1200px;
    margin: 0 auto;
}
.mod-header__logo {
    float: left;
    position: relative;
    width: 180px;
    height: 60px;
    text-indent: -999em;
    background-image: url(/static/img/logo.png);
    background-position: 4px 6px;
    background-repeat: no-repeat;
    margin:0px
}
h1 {
    font-size: 24px;
}
.mod-header__logo a {
    width: 140px;
    min-height: 60px;
    display: block;
}
.mod-header__nav {
    float: right;
    width: 810px;
    height: 70px;
    overflow: hidden;
}
.mod-header__nav li {
    float: left;
    width: 14%;
    position: relative;
    display: inline-block;
    -webkit-transition: all .2s cubic-bezier(.4,0,1,1);
    transition: all .2s cubic-bezier(.4,0,1,1);
}
.mod-header__nav li a {
    position: relative;
    color: #333;
    text-decoration: none;
    text-align: center;
    line-height: 70px;
    font-family: Microsoft YaHei;
    font-size: 14px;
    display: block;
    z-index: 100;
}
.menu li:nth-child(1):after {
    background: #b9d329;
}
.menu li:nth-child(2):after {
    background: #c0ebf7;
}
.menu li:nth-child(3):after {
    background: #b9d329;
}
.menu li:nth-child(4):after {
    background: #69bcf3;
}
.menu li:nth-child(5):after {
    background: #79d9f3;
}
.menu li:nth-child(6):after {
    background: #ffae5b;
}
.menu li:nth-child(7):after {
    background: #acd180;
}
.menu li:nth-child(8):after {
    background: #fab4cc;
}
.mod-header__nav li:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    top: 66px;
    -webkit-transition: .2s all ease-in-out;
    transition: .2s all ease-in-out;
}
.mod-header__nav li.on:after,.mod-header__nav li:hover:after{top:0}
</style>
<script>
import axios from 'axios'
import loginDialog from './loginDialog'
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    loginDialog
  },
  data () {
    return {
      musicUrl: '',
      menuList: []
    }
  },
  computed: {
     ...mapGetters(['menuIndex', 'useName'])
  },
  methods: {
    toLogin() {
       this.$router.push({
            path: '/login'
        });
    },
    // 退出
    loginOut() {
       let paramOut = {
          type: 'post',
          path: '/blogUsers/loginOut',
          datas: {}
      }
      this.$store.dispatch(paramOut).then(res=>{
         this.$message({
            message: '退出成功',
            type: 'success'
          });
          localStorage.setItem('useName','null');
          this.$store.commit('changeUser', '');
      });
    },
    getMenus() {
      this.$store.dispatch('GET_MENU', {}).then((res)=>{
         console.log(res, 'resresresres');
         this.menuList = res.data.msg;	
      });
    },
    enter(index) {
      this.musicUrl = '/static/music/' + (parseInt(index) + 1) + '.mp3';
      // this.$refs.audio.play();
      console.log(this.musicUrl);
    },
    leave() {
      this.musicUrl = '';
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
        //   this.ifLogin = true;
        }else {
        //   this.ifLogin = false;
        }  
      });
    },
    selectMenu(name, num) {
       let pathes = '';
       if(parseInt(num) >= 6) {
          if(name === '我的音乐') {
              pathes = '/music'
          }else if(name === '关于作者') {
            pathes = '/autor'
            // this.$message({
            //   message: '暂无相关信息',
            //   type: 'error'
            // });
            // return;
          }else if(name === '个人中心') {
            pathes = '/issue'
          }
          let routeData = this.$router.resolve({
            path: pathes
          });
          window.open(routeData.href, '_blank');
          return;
       }
       this.$store.commit('changeMenuIndex',name);
       this.$router.push({path:'/blog'});
	},
  },
  mounted () {
    this.getMenus();
    this.init();
  }
}
</script>
