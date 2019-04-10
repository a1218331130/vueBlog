<template>
<div>
     <div class="tabs" style="margin-top:10px">
        <h3 class="widget-title">
        <i class="iconfont icon-pinglun" style="padding-right:6px"></i>
        最近访问
        </h3>
        <div class="new_cat commit">
            <ul style="padding:15px">
                <li v-for="(item,index) in userLists" :key="index">
                    <a href="javascript:void(0)">
                       <img alt="" :src="item.userImage" class="avatar avatar-64 photo wpfla">	
                       <span class="comment_author" style="font-size:14px"><strong>{{item.userName}}</strong></span>
                       <span style="font-size:12px;padding-left:8px">{{item.loginTime}}</span>
                     </a>
				</li>
            </ul>
        </div>
    </div>
    <div class="tabs" style="margin-top:10px">
        <h3 class="widget-title">
        <i class="iconfont icon-zonghe" style="padding-right:6px"></i>
        最新文章
        </h3>
        <div class="new_cat">
            <ul style="padding:15px">
                <li v-for="(item,index) in contentLists" :key="index" @click="toDetail(item.detailId)"> 
                    <span class="thumbnail"> 
                        <a href="javascript:void(0)">
                        <img style="width:100px;height:75px" :src="item.regionChild">
                        </a>
                    </span> 
                    <span class="new-title" :title="item.title">
                        <a href="javascript:void(0)" rel="bookmark">{{item.title}}</a>
                    </span> 
                    <span class="date">{{item.time}}</span> 
                    <!-- <span class="views"><i class="be be-eye"></i> 5</span> -->
                </li>
            </ul>
        </div>
    </div>
    <div class="tabs" style="margin-top:10px">
        <h3 class="widget-title">
        <i class="iconfont icon-pinglun" style="padding-right:6px"></i>
        最新评论
        </h3>
        <div class="new_cat commit">
            <ul style="padding:15px">
                <!-- <h4>最近留言</h4> -->
                <li v-for="(item,index) in commitList" :key="index" @click="toDetail(item.commitId)">
                    <a href="javascript:void(0)">
                       <img alt="" :src="item.userImage" class="avatar avatar-64 photo wpfla">	
                       <span class="comment_author"><strong>{{item.useName}}</strong></span>
                       <span style="font-size:14px">{{item.commitConent}}</span>
                     </a>
				</li>
            </ul>
        </div>
    </div>
</div>
</template>
<style scoped>
.commit h4 {
    float: left;
    color: #999;
    font-size: 14px
}
.tabs h3 {
    background: #f8f8f8;
    padding: 6px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    padding-left: 6px;
}
.new_cat{
    background: white;
    border: 1px solid #ddd;
    border-top: 0px solid #ddd;
}
.new_cat ul li {
    width: 99%;
    line-height: 28px;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
}
.new_cat .cat-item{
    float: left;
    width: 49.5% !important;
    margin: 0 -3px -1px 2px;
}
.new_cat .cat-item a {
    text-align: center;
    padding: 5px 0;
    display: block;
    border: 1px solid #ddd;
    font-size: 14px
}    
.new_cat .thumbnail {
    position: relative;
    float: left;
    width: 100px;
    height: 75px;
    margin: 8px 8px 8px 0;
    overflow: hidden;
}
.new_cat .new-title {
    height: 59px;
    padding-top: 5px;
    line-height: 25px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: block;
    font-size: 14px;
}
.new_cat a {
    color: #999;
}
.new_cat .date {
    float: right;
    color: #999;
}
.commit ul li {
    width: 99%;
    height: 37px;
    padding-bottom: 8px;
    line-height: 37px;
    white-space: nowrap;
    _white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px dashed #dadada;
    padding-bottom: 0;
}
.commit .avatar {
    float: left;
    width: 24px;
    height: 24px;
    margin: 6px 8px 0 0;
}

</style>
<script>
export default {
  components: {
  },
  data () {
    return {
       contentLists:[],
       userLists: [],
       commitList: []
    }
  },
  methods: {
    // 跳到详情
    toDetail(isId) {
       this.$router.push({ path: '/blog/detail', query: { id: isId }})
       location.reload();
    },
    getNewDetail() {
       //  console.log(val);
       let getNewListDetail = {
          type: 'post',
          path: '/menu/getNewList',
          datas: {}
        }
        this.$store.dispatch(getNewListDetail).then(res=>{
            if(res.data.states !== 0) {
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
     // 获取评论
    getCommits() {
       let getCommit2 = {
          type: 'post',
          path: '/menu/getNewCommit',
          datas: {
          }
        }
        this.$store.dispatch(getCommit2).then(res=>{
            this.commitList = res.data.msg;
        });
    },
    getNewUser() {
       //  console.log(val);
       let getNewUsers = {
          type: 'post',
          path: '/blogUsers/getNewUser',
          datas: {}
        }
        this.$store.dispatch(getNewUsers).then(res=>{
            if(res.data.states !== 0) {
                this.userLists = res.data.msg.map(res=>{
                    return {
                        userName: res.userName,
                        loginTime: res.loginTime,
                        userImage: res.userImage
                    }
                });
            }
        });
    }
  },
  mounted () {
    this.getNewDetail();
    this.getNewUser();
    this.getCommits();
  }
}
</script>
