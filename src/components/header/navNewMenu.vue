<template>
<header class="site-header no-select gizle is-homepage yya sabit" role="banner">
  <div class="site-top">
    <div class="site-branding">
      <span class="site-title">
        <span class="logolink moe-mashiro">
          <a href="/">
            <!-- <span class="sakurasono">莫沫达博客</span> -->
            <!-- <span class="shironeko">blog</span> -->
          </a>
        </span>
      </span>
    </div>
    <div class="searchbox search-form-submit">
      欢迎你：{{userName}}
      <i class="fa fa-sign-out" @click="loginOut" style="margin-left:10px;cursor:pointer">
      </i>
    </div>
    <div class="lower-cantiner">
      <div class="lower">
        <nav class="mobile-fit-control hide">
          <ul id="menu-new" class="menu">
              <li @click="showOtherPage(item.url)" @mouseover="liMouseOver(item.url)" @mouseleave="liMouseLeave('')" v-for="(item, index) in headerMenuList" :key="index">
                <a href="javascript:void(0)" >
                  <span class="faa-parent animated-hover">
                    <i :class="[{'swing': liItem === item.url}, 'fa faa-shake animated', item.class]" aria-hidden="true"></i>
                      {{item.name}}
                  </span>
                </a>
              </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</header>
</template>
<style scoped>
@keyframes sitetop {
    0% {
    opacity:0;
    transform:translateX(-30px)
    }
    100% {
        opacity:1;
        transform:translateX(0)
    }
}
@keyframes searchbox {
    0% {
    opacity:0;
    transform:translateX(30px)
}
100% {
    opacity:1;
    transform:translateX(0)
}
}
.no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.sabit {
    top: 0;
    z-index: 9999;
}
.gizle {
    top: -100px;
    top: 0;
    z-index: 9999;
}
.yya {
    position: fixed;
    left: 0;
    background: rgba(255,255,255,.95);
    box-shadow: 0 1px 40px -8px rgba(0,0,0,.5);
}
.site-header {
    width: 100%;
    height: 75px;
    background: white;
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
    position: fixed;
    z-index: 9999;
    top: 0;
}
.site-top {
    width: 100%;
    display: block;
    margin: 0 auto;
    padding: 0 20px;
}
.site-branding {
    float: left;
    position: relative;
    height: 75px;
    line-height: 75px;
    margin-left: -6px;
}
.site-branding {
    animation: sitetop 1s;
}
.site-title {
    margin: 0;
}
.site-header.is-homepage.yya .lower-cantiner {
    display: block;
}
.site-header.is-homepage .lower-cantiner {
    display: none;
}
.site-top .lower-cantiner {
    position: absolute;
    left: 50%;
    min-width: 758.4px;
    pointer-events: none;
}
.site-top .lower {
    display: inline-block;
    margin: 15px 0 0 10px;
    font-size: 16px;
    position: relative;
    left: -50%;
    pointer-events: auto !important;
}
.searchbox {
    float: right;
    height: 75px;
    line-height: 75px;
    margin-right: 50px;
}
i.iconfont.js-toggle-search.iconsearch {
    color: #666;
    cursor: pointer;
    font-size: 26px;
    -webkit-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
}
.searchbox, .site-top .lower, .header-user-avatar {
    animation: searchbox 1s;
}
.site-top .lower nav {
    display: block !important;
}
.site-top .lower nav {
    position: relative;
    float: right;
    display: none;
    animation: searchbox .2s;
}
.site-top ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
}
.site-top ul li {
    float: left;
    margin: 0 13px;
    position: relative;
    -webkit-transition: all 1s ease;
}
.site-top ul li a {
    padding: 10px 0;
    display: inline-block;
    color: #666;
}
a {
    color: #e67474;
    outline: 0;
    -webkit-transition: color .2s ease-out,border .2s ease-out,opacity .2s ease-out;
    -moz-transition: color .2s ease-out,border .2s ease-out,opacity .2s ease-out;
    transition: color .2s ease-out,border .2s ease-out,opacity .2s ease-out;
}
a {
    background-color: transparent;
    text-decoration: none;
    cursor: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cursor/ayuda.cur),auto;
}
.site-top ul li a {
    padding: 10px 0;
    display: inline-block;
    color: #666;
}
/* .site-top ul li a:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -16px;
    height: 6px;
    background-color: #fe9600;
    width: 100%;
    max-width: 0;
    transition: max-width .25s ease-in-out;
} */
.site-top ul li a:hover{
   color: #fe9600;
}
.logolink.moe-mashiro a {
    color: #464646;
    float: left;
    font-size: 28px;
    font-weight: 800;
    height: 56px;
    line-height: 56px;
    padding-left: 6px;
    padding-right: 15px;
    padding-top: 5px;
    text-decoration-line: none;
}
.logolink.moe-mashiro .sakurasono {
    font-size: 25px;
    border-radius: 9px;
    padding-bottom: 2px;
    padding-top: 5px;
}

.logolink .sakurasono {
    background-color: rgba(255,255,255,.5);
    border-radius: 5px;
    color: #464646;
    height: auto;
    line-height: 25px;
    margin-right: 0;
    padding-bottom: 0;
    padding-top: 1px;
    text-size-adjust: 100%;
    width: auto;
}
.logolink.moe-mashiro .shironeko {
    margin-left: -5px;
}
</style>
<script>
export default {
  components: {
  },
  data () {
    return {
      liItem: '',
      userName: '',
      headerMenuList: [
         {
           name: '首页',
           url: 'firstPage',
           class: 'fa-home'
         },
         {
           name: '标签',
           url: 'tags',
           class: 'fa-tags'
         },
         {
           name: '开源',
           url: 'open',
           class: 'fa-github'
         },
          {
           name: '音乐',
           url: 'music',
           class: 'fa-music'
         },
          {
           name: '发布',
           url: 'issue',
           class: 'fa-columns'
         },
          {
           name: '关于',
           url: 'about',
           class: 'fa-user'
         }
      ]
    }
  },
  computed: {
  },
  methods: {
    // 鼠标移上去
     liMouseOver(item){
        this.liItem = item;
     },
     // 鼠标移出来
     liMouseLeave(item) {
        this.liItem = item;
     },
     // 页面跳转
     showOtherPage(url) {
       if(url === 'music' || url === 'issue') {
          let routeData = this.$router.resolve({
            name: url
          });
          window.open(routeData.href, '_blank');
       }else {
         this.$router.push({
              path: url
          });
       }
     },
      loginOut() {
        //  console.log(val);
            let loginOut = {
                type: 'post',
                path: '/blogUsers/login',
                datas: {
                }
            }
            this.$store.dispatch(loginOut).then(res=>{
                this.$router.push({path: '/login'});
                localStorage.removeItem("useName");
            });
        }
  },
  mounted () {
    this.userName = localStorage.getItem("useName");
  }
}
</script>
