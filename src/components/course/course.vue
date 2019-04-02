<template>
    <div>
         <div class="coure-top">
                <!-- @select="handleSelect" -->
                <el-menu
                    style="padding:0px 10px"
                    @select="handleSelect"
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item v-for="(item,index) in children" v-bind:key="index" :index="item.childIndex.toString()">{{item.menuName}}</el-menu-item>
                </el-menu>
        </div>  
        <div class="course">
            <div class="courseLeft">
            <!-- <course-left></course-left> -->
                <div class="codeLeft">
                    <h1 class="title">{{hl}}</h1>
                    <p class="autor">作者：{{autor}}</p>
                    <h1 class="mulu">目录</h1>
                    <ul>
                        <li v-for="(item,index) in leftList" v-bind:key="index" @click="changeHtml(item.courseHtml)">
                            <span class="numIndex">{{index + 1}}.</span>
                            <span class="titleIndex">{{item.courseName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="courseRight">
               <course-right class="hljs"  :htmlData="courseHtm"></course-right>
            </div>
            <!-- <div class="quill-code courseRight">
               <code class="hljs ql-editor" v-html="courseHtm"></code>
            </div> -->
        </div>
    </div>   
</template>  
<style>
@import 'highlight.js/styles/xcode.css';
</style>
<style scoped>
.course{
  /* padding:30px;
  padding-top:0px; */
}
.coure-top{
    position: fixed;
    top: 0px;
    width: 90%;
    margin-left: 5%;
    /* padding:30px;
    padding-top:0px;
    padding-left:100px; */
}
.codeLeft .title{
     font-size: 25px;
     padding-bottom: 10px;
 }
 .codeLeft .mulu{
     padding: 10px 0;
 }
 .codeLeft ul li .titleIndex{
     color: #4682BE;
     font-size: 14px;
 }
 .codeLeft ul li{
     padding-bottom: 5px;
     cursor: pointer;
 }
.codeLeft ul li .numIndex{
     display: inline-block;
     width: 35px;
     text-align: right;
     font-size: 14px;
 }
  .courseLeft{
      position: fixed;
      width: 500px;
      float: left;
      height: auto;
      padding: 20px;
      padding-left: 80px;
      /* margin-top: 50px */
  }
  .courseRight{
      margin-left: 480px;
      padding: 20px;
      padding-right: 60px;
      margin-top: 50px
  }
</style>
<script>
    import courseRight from './right'
    import hljs from 'highlight.js'
    export default{
        components: {
          courseRight
        },
        data(){
            return{
              leftList: [],
              autor: '',
              hl: '',
              courseHtm: '',
              activeIndex2: '107',
              children : [ 
                {
                    "menuName" : "javascript",
                    "childIndex" : 107
                },
                {
                    "menuName" : "es6",
                    "childIndex" : 106
                },
                // {
                //     "menuName" : "angular",
                //     "childIndex" : 101
                // }, 
                // {
                //     "menuName" : "vue",
                //     "childIndex" : 102
                // }, 
                // {
                //     "menuName" : "mongoose",
                //     "childIndex" : 103
                // }, 
                // {
                //     "menuName" : "node",
                //     "childIndex" : 104
                // }, 
                // {
                //     "menuName" : "express",
                //     "childIndex" : 105
                // }, 
                // {
                //     "menuName" : "css",
                //     "childIndex" : 108
                // }, 
                {
                    "menuName" : "other",
                    "childIndex" : 109
                }],
                typeCourse: 107
            }
        },
        mounted(){
          this.getLists();
        },
        computed: {
        },
        methods: {
        // 数据改变
        changeHtml(html) {
           this.courseHtm = html;
        },
        handleSelect(key, keyPath) {
          this.typeCourse = parseInt(key);
          this.getLists();
        //   console.log(key, keyPath);
        },
        // 获取列表数据
        getLists() {
                let getL = {
                    type: 'post',
                    path: '/menu/getCourse',
                    datas: {
                        types: this.typeCourse
                    }
                }
                this.$store.dispatch(getL).then(res=>{
                    // console.log(res.data.msg);
                    this.leftList = res.data.msg;
                    this.autor = this.leftList[0].courseAutor;
                    this.hl = this.leftList[0].courseHL;
                    this.courseHtm = this.leftList[0].courseHtml;
                    //  this.$message({
                    //     message: '退出成功',
                    //     type: 'success'
                    //   });
                    
                });
           }
        }

    }
</script>