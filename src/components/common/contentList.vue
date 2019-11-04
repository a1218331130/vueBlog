<template>
<div class="contentList" v-loading="loading" element-loading-text="拼命加载中">
   <article class="post" v-for="(item,index) in contentLists" :key="index">
       <figure class="thumbnail" style="border:1px solid #ccc"> 
           <a href="javascript:void(0)">
              <img :src="item.regionChild" style="width:200px;height:150px;">
           </a> 
           <span class="cat">
               <router-link target="_blank" :to="{path:'/blog/detail',query:{id:item.detailId}}">{{item.menuName}}</router-link>
               <!-- <a href="javascript:void(0)">{{item.menuName}}</a> -->
           </span>
        </figure>
        <header class="entry-header">
            <h2 class="entry-title">
                <router-link target="_blank" :to="{path:'/blog/detail',query:{id:item.detailId}}">{{item.title}}</router-link>
                <!-- <a href="javascript:void(0)" rel="bookmark">{{item.title}}</a> -->
           </h2>
        </header>
        <div class="entry-content">
            <div class="archive-content">{{item.desc1}}</div> 
            <!-- <span class="title-l"></span>  -->
            <!-- <span class="new-icon">
                <i class="be be-new"></i>
            </span>  -->
            <span class="entry-meta"> 
                <i class="fa fa-user"></i>
                <span class="date">{{item.autor}}</span>
                <i class="fa fa-clock-o"></i>
                <span class="date">{{item.time}}</span>
                <span class="comment" v-if="item.zan !== '0'">
                    <i class="iconfont icon-kanguo"></i>
                    <span style="font-size:15px">{{item.zan}}</span>
                </span>
                <!-- <span class="comment" v-if="item.pinglun !== '0'">
                      <i class="iconfont icon-zanfill"></i>
                      <span style="font-size:15px">{{item.pinglun}}</span>
                </span>  -->
            </span>
                <div class="clear"></div>
            </div> 
            <span class="entry-more">
                <router-link target="_blank" :to="{path:'/blog/detail',query:{id:item.detailId}}">阅读全文</router-link>
            </span>
    </article>
    <div class="page" v-if="totalList>0">
         <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="totalList">
         </el-pagination>
    </div>
</div>
</template>
<style scoped>
.page{
    text-align: center;
}
article{
    display: block;
    visibility: visible
}
.thumbnail {
    position: relative;
    float: left;
    max-width: 200px;
    height: auto;
    clear: both;
    margin: 1px 20px 0 0;
    overflow: hidden;
    border-radius: 2px;
    transition-duration: .5s;
}
.entry-header h2 a {
    font-size: 16px;
    /* font-size: 1.6rem; */
    line-height: 20px;
}
.entry-more a {
    position: absolute;
    bottom: 18px;
    right: -1px;
    background: #3690cf;
    color: #fff !important;
    line-height: 30px;
    padding: 0 12px;
    display: block;
    border-radius: 2px 0 0 2px;
}
.archive-content {
    color: #777;
    font-size: 14px
}
.thumbnail .cat, .format-img-cat, .title-l, .des-t, .des-p, .cms-news-grid .marked-ico {
    background: #3690cf;
}
.title-l {
    position: absolute;
    /* background: #c40000; */
    top: 21px;
    left: -1px;
    width: 5px;
    height: 28px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.new-icon {
    position: absolute;
    top: 4px;
    right: -2px;
    animation: fade-in;
    animation-duration: 1.2s;
    -webkit-animation: fade-in 1.2s;
}
.new-icon .be {
    color: #3690cf;
}
.new-icon .be {
    font-size: 40px !important;
    color: #c40000;
}
.be {
    font-family: "be" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.be, .zm {
    font-size: 14px !important;
    line-height: .75em;
    vertical-align: -5%;
}
.entry-meta {
    position: absolute;
    bottom: 14px;
    color: #999;
    left: 240px;
}
.entry-meta .date, .entry-meta .views, .entry-meta .comment, .entry-meta-no .date, .entry-meta-no .views, .entry-meta-no .comment {
    margin: 0 5px 0 0;
}
.entry-meta a, .entry-meta-no a {
    color: #3690cf;
}
.clear {
    clear: both;
    display: block;
}
a {
    color: #444;
    text-decoration: none;
}
a:visited {
    color: #555;
}
.thumbnail a img {
    float: left;
    width: 100%;
    height: auto;
    max-width: 100%;
}
.thumbnail .cat {
    position: absolute;
    top: 0;
    left: 0;
    background: #3690cf;
}
header {
    display: block;
}
.entry-header h2 {
    margin: 0 0 5px 0;
}
.post{
    position: relative;
    background: #fff;
    margin: 0 0 10px 0;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
    border-radius: 2px;
}
.thumbnail .cat a {
    color: #fff;
    line-height: 28px;
    padding: 0 10px;
}
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    
  },
  computed: {
     ...mapGetters(['menuIndex'])
  },
  data () {
    return {
       activeIndex: '1',
       loading: true,
       contentLists: [],
       pageSize: 10,
       pageIndex: 1,
       totalList: 0
    }
  },
  watch: {
     menuIndex(val) {
        if(val) {
          this.pageIndex = 1;
          this.getList();
        }
     }
  },
  methods: {
    handleCurrentChange(val) {
      this.loading = true;
      this.pageIndex = val;
      this.getList();
    },
    getList() {
       alert(12);
       //  console.log(val);
       let getLists = {
          type: 'post',
          path: '/menu/getList',
          datas: {
              menuName: this.menuIndex,
              pageSize: this.pageSize,
              pageIndex: this.pageIndex
          }
        }
        this.$store.dispatch(getLists).then(res=>{
            if(res.data.states !== 0) {
               this.loading = false;
               window.scrollTo(0,0);// 请求成功滚动条滚到顶部
               this.totalList = res.data.total;
               this.contentLists = res.data.msg.map(res=>{
                   return {
                     menuName: res.menuName,
                     title: res.title,
                     desc1: res.desc1,
                     content:res.content,
                     imgUrl: res.imgUrl,
                     regionChild: res.regionChild,
                     autor: res.autor,
                     time: res.time.slice(0,10),
                     zan: res.zan,
                     pinglun: res.pinglun,
                     detailId: res.detailId
                   }
               });
            }
        });
    },
  },
  mounted () {
     this.getList();
  }
}
</script>
