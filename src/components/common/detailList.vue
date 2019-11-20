<template>
<div class="detailList">
    <article class="detail">
        <header class="entry-header"><h1 class="entry-title">{{dataObj.title}}</h1></header>
        <div class="entry-content">
            <div class="begin-single-meta">
                <span class="my-date">
                   <i class="fa fa-user"></i> {{dataObj.autor}}
                </span>
                <span class="my-date">
                    <i class="fa fa-clock-o"></i> {{dataObj.time}}
                </span>
                <span class="comment" style="font-size:14px">
                    <i class="iconfont icon-listview"></i> {{dataObj.menuName}}
                </span>
                <!-- <span class="comment" style="font-size:14px">
                    <i class="iconfont icon-xiangqu1"></i> 发表评论
                </span> -->
                <span class="views">
                    <i class="be be-eye"></i> 56
                </span>
                <span class="s-hide">
                    <span class="off-side"></span>
                </span>
             </div>
        </div>
         <div class="ql-container ql-snow" style="border:0px solid #ccc">
             <div class="ql-editor" style="overflow-x:hidden">
                 <div v-highlight class="markdown-body" v-html="issueContentData"></div>
             </div>       
         </div>
    </article>
    <div class="commitList">
        <div id="respond" class="comment-respond wow fadeInUp animated">
            <h3 id="reply-title" class="comment-reply-title">
                <span>发表评论</span>
                <!-- <small>
                    <a rel="nofollow" id="cancel-comment-reply-link" href="/hosts/google-sorry.html#respond">取消回复</a>
                </small> -->
            </h3>
            <div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="commitContent">
                </el-input>
                <el-row style="text-align: right;margin-top:10px">
                    <el-button type="primary" size="small" @click="addCommits">提交按钮</el-button>
                </el-row>
            </div>
            <!-- <p class="comment-nologin" v-if="useName === ''"> 您必须
                <a href="javascript:void(0)" id="login-c">
                    <span class="login-respond" @click="openDialog">登录</span>
                </a>才能发表评论！
            </p> -->
        </div>
    </div>
    <div class="lists">
        <ol class="comment-list">
            <li class="comment" v-for="(item,index) in dataObj.commitList" :key="index">
                <div id="div-comment-31127" class="comment-body">
                    <div class="comment-author vcard"> 
                        <img class="avatar" v-if="item.userImage !== ''" :src="item.userImage" alt="avatar" style="display: block;"> 
                        <img class="avatar" v-if="item.userImage === ''" src="/static/img/no-image.png" alt="avatar" style="display: block;"> 
                        <strong> {{item.useName}} </strong> 
                        <!-- <a class="vip vip1" title="评论达人 VIP.1">
                            <i class="be be-favorite"></i>
                            <span class="lv">1</span>
                        </a>  -->
                        <span class="comment-meta commentmetadata"  style="font-size:15px"> 
                            <br> 
                            <span class="comment-aux"> 
                                <span class="reply">
                                    <!-- <a rel="nofollow" class="comment-reply-login" @click="openDialog" v-if="useName === ''">登录以回复</a> -->
                                    <a rel="nofollow" class="comment-reply-login" @click="awsterChild(index)">点击回复</a>
                                    </span> {{item.commitYime}}
                                    <!-- <span class="floor"> &nbsp;11楼 </span>  -->
                                </span> 
                            </span>
                        </div>
                        <p style="font-size:15px">{{item.commitConent}}</p>
                </div>
                <div  v-if="childIndex === index" style="margin-top:10px">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="commitConentChild">
                    </el-input>
                    <el-row style="text-align: right;margin-top:10px">
                        <el-button type="primary" size="small" @click="addChildCommits(item)">回复</el-button>
                    </el-row>
                </div>
                <ul class="children" style="margin-top:30px" v-if="item.answerList !== []">
                    <li class="comment" v-for="(itemChild,indexChild) in item.answerList" :key="indexChild">
                        <div id="div-comment-31127" class="comment-body">
                            <div class="comment-author vcard"> 
                                <img class="avatar" v-if="itemChild.useImage !== ''" :src="itemChild.useImage" alt="avatar" style="display: block;"> 
                                <img class="avatar" v-if="itemChild.useImage === ''" src="/static/img/no-image.png" alt="avatar" style="display: block;"> 
                                <strong> {{itemChild.useName}} </strong>
                                <span class="comment-meta commentmetadata"  style="font-size:15px"> 
                                    <br> 
                                    <span class="comment-aux"> 
                                        <span class="reply">
                                            </span> {{itemChild.commitYimeChild}}
                                            <!-- <span class="floor"> &nbsp;11楼 </span>  -->
                                        </span> 
                                    </span>
                                </div>
                                <p style="font-size:15px">
                                    <span class="at">@<a href="#comment-32904">{{itemChild.parentName}}</a></span>  {{itemChild.commitConentChild}}
                                </p>
                        </div>
                    </li>
                </ul>
            </li>
        </ol>
    </div>
    <login-dialog :dialog="loginDialogs" @close="closeDialog" @getUser="getUserName"></login-dialog>
</div>
</template>
<style scoped>
.at{
    color: #3690cf;
}
.comment-list li {
    position: relative;
    background: #fff;
    margin: 0 0 10px 0;
    padding: 15px 20px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
    border-radius: 2px;
    word-wrap: break-word;
    word-break: break-all;
    min-height: 80px;
}
.comment-author {
    color: #999;
}
.comment-list .children {
    list-style: none;
    margin: 8px 0 0 0;
}
.vcard .avatar {
    float: left;
    width: 64px;
    height: 64px;
    margin: 7px 10px 0 0;
    padding: 3px;
    border-radius: 5px;
    border: 1px solid #ddd;
    transition: all .8s ease 0s;
}
.reply {
    position: absolute;
    top: 15px;
    right: 20px;
}
.reply a {
    background: #fff;
    line-height: 25px;
    display: block;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 2px;
}
.floor {
    color: #999;
}
.comment-meta, .comment-meta a {
    color: #999;
}
#respond {
    background: #fff;
    margin: 0 0 10px 0;
    padding: 10px 20px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
    border-radius: 2px;
}
#respond h3 {
    font-size: 15px;
    /* font-size: 1.5rem; */
    margin: 5px 0 15px 0;
}
#respond h3 a {
    float: right;
    font-size: 14px;
    /* font-size: 1.4rem; */
    font-weight: normal;
    padding: 2px 10px;
    border: 1px solid #ddd;
    border-radius: 2px;
}
.comment-nologin {
    font-size: 14px;
    color: #999;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
}
.login-respond {
    background: #3690cf;
    color: #fff;
    margin: 0 15px;
    padding: 5px 15px;
    border-radius: 2px;
    border: 1px solid #3690cf;
}
/* .ql-align-center{
    text-align: center
} */
.htmlContent p{
    /* width: 738px;
    margin: 0 auto; */
    font-size: 14px;
    /* text-align: center; */
}
.htmlContent p img{
    max-width: 700px;
}
a{
    text-decoration: none;
}
.begin-single-meta {
    text-align: center;
    line-height: 23px;
    margin: 10px 0;
    font-size: 15px
}
.begin-single-meta, .begin-single-meta a {
    color: #999;
}
.begin-single-meta span {
    margin: 0 5px;
}
.begin-single-meta, .begin-single-meta a {
    color: #999;
}
.views, .single-meta .views {
    display: none;
}
.s-hide {
    position: absolute;
    top: 15px;
    right: 15px;
    line-height: 26px;
}
.s-hide .off-side {
    margin: 0;
    padding: 2px 6px;
}
.off-side:after, .on-side:after {
    font-family: be;
    font-size: 15px !important;
    color: #999;
    padding: 0 6px;
    display: block;
    float: right;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 2px;
}
a:visited {
    color: #555;
}
.entry-header h1 {
    position: relative;
    font-size: 20px;
    /* font-size: 2rem; */
    line-height: 30px;
    text-align: center;
    margin: 35px 0 0 0;
    padding: 5px 0;
}
.detail .el-main{
    padding: 0px;
}
.detail{
    position: relative;
    background: #fff;
    margin: 0 0 10px 0;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
    border-radius: 2px;
}
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
import loginDialog from '../header/loginDialog'
 import Vue from 'vue'
 import hljs from 'highlight.js'
 import marked from 'marked'
//  import 'mavon-editor/dist/css/index.css'
 import '@/assets/css/github-markdown.min.css'
 import 'mavon-editor/dist/highlightjs/styles/hybrid.min.css'
 
//封装成一个指令
Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
export default {
  components: {
    loginDialog
  },
  computed: {
     ...mapGetters(['useName']),
     issueContentData() {
        var content = marked(this.datas);
        console.log(content,'contentcontentcontentcontent');
        return content
     }
  },
  data () {
    return {
       activeIndex: '1',
       childIndex: '',
       commitConentChild: '',
       contentLists: [],
       timeCommit: '',
       commitList: [],
       datas: '',
       dataObj: {},
       commitContent: '',
       loginDialogs: false
    }
  },
  watch: {
     menuIndex(val) {
        if(val) {
          this.getList();
        }
     }
  },
  methods: {
    openDialog() {
       this.loginDialogs = true;
    },
    closeDialog(dataOne) {
       this.loginDialogs = false;     
    },
    // 判断是否二级回复
    awsterChild(num) {
       this.childIndex = num;
    },

    // 添加二级回复内容
    addChildCommits(item) {
       let addCommitChild = {
          type: 'post',
          path: '/menu/addCommitChild',
          datas: {
              parentName: item.useName,
              commitConentChild: this.commitConentChild,
              timeCommit: item.timeCommit,
              timeCommitChild: this.timeCommitChild
          }
        }
        this.$store.dispatch(addCommitChild).then(res=>{
            if(res.data.states !== 0) {
                this.$message({
                    message: '提交评论成功',
                    type: 'success'
                });
                this.childIndex = '';
                this.getDetail();
            }
        });
    },
    // 添加评论
    addCommits() {
       //  console.log(val);
       let addCommit1 = {
          type: 'post',
          path: '/menu/addCommit',
          datas: {
              commitId: this.dataObj.detailId,
              commitConent: this.commitContent,
              timeCommit: this.timeCommit
          }
        }
        this.$store.dispatch(addCommit1).then(res=>{
            if(res.data.states !== 0) {
                this.$message({
                    message: '提交评论成功',
                    type: 'success'
                });
                this.getDetail();
            }
        });
    },
    // 获取评论
    // getCommits() {
    //    let addCommit2 = {
    //       type: 'post',
    //       path: '/menu/getCommit',
    //       datas: {
    //           commitId: this.$route.query.id
    //       }
    //     }
    //     this.$store.dispatch(addCommit2).then(res=>{
    //         this.commitList = res.data.msg;
    //     });
    // },
    // 获取用户名
    getUserName(dataOne) {
      if(dataOne.useName !== undefined) {
         this.$store.commit('changeUser', dataOne.useName);
       }
    },
    getDetail() {
       //  console.log(val);
       let getListDetail = {
          type: 'post',
          path: '/menu/getDetail',
          datas: {
              id: this.$route.query.id
          }
        }
        this.$store.dispatch(getListDetail).then(res=>{
            if(res.data.states !== 0) {
               this.datas = res.data.msg.content;
               this.dataObj = res.data.msg;
               this.dataObj.time = res.data.msg.time.slice(0,10);
            }
        });
    }
  },
  mounted () {
     this.getDetail();
    //  this.getCommits();
     setInterval(() => {
        this.timeCommit = new Date().getTime().toString();
        // console.log(this.timeId);
     },1000)
    //  alert(this.$route.query.id);
  }
}
</script>
