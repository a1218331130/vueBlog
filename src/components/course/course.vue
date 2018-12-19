<template>
    <div>
        <div class="courseLeft">
          <!-- <course-left></course-left> -->
            <div class="codeLeft">
                <h1 class="title">{{hl}}</h1>
                <p class="autor">作者：{{autor}}</p>
                <h1 class="mulu">目录</h1>
                <ul>
                    <li v-for="(item,index) in leftList" v-bind:key="index" @click="changeHtml(item.courseHtml)">
                        <span class="numIndex">{{index}}.</span>
                        <span class="titleIndex">{{item.courseName}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="courseRight">
          <course-right :htmlData="courseHtm"></course-right>
        </div>
    </div>   
</template>  
<style scoped>
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
      width: 280px;
      float: left;
      height: auto;
      padding: 20px;
  }
  .courseRight{
      margin-left: 290px;
      padding: 20px;
  }
</style>
<script>
    import courseRight from './right'
    export default{
        components: {
          courseRight
        },
        data(){
            return{
              leftList: [],
              autor: '',
              hl: '',
              courseHtm: ''
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
        // 获取列表数据
           getLists() {
                let getL = {
                    type: 'post',
                    path: '/menu/getCourse',
                    datas: {
                        types: this.$route.query.titleName
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