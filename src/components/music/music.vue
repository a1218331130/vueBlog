<template>
    <div>
        <div class="bg_player" style="background-image: url(&quot;https://y.gtimg.cn/music/photo_new/T002R300x300M000000eilSQ2dYUzX.jpg?max_age=2592000&quot;);"></div>
        <div id="container">
            <!-- <div class="logo" title="♫ 老D在线音乐播放器">
                ♫ 莫沫达在线音乐播放器
            </div> -->
            <div class="left-col">
                <div class="overlay" style="background-color: rgb(255, 148, 92); opacity: 0.3;"></div>
                <div class="intrude-less">
                     <header class="inner" id="header">
                        <a href="/" class="profilepic">
                			<img src="http://www.shawnzeng.com/img/me.JPG" class="animated zoomIn">
            			</a>
                        <hgroup>
                            <h1 class="header-author" style="width:100%"><a href="/">莫沫达</a></h1>
                        </hgroup>
                        <p class="header-subtitle">♫ 在线音乐播放器</p>
                        <p  v-for="(item,index) in myType" :key="index" @click="personMusic(item.name)" :class="myChoose === item.name ? 'collectActive' : '' " class="header-subtitle collect">
                            <i :class="item.icon" style="padding-right:5px"></i>{{item.name}}
                        </p>
                        <!-- <audio src="http://sc1.111ttt.com/2017/4/05/10/298101104389.mp3" id="audio"></audio> collectActive-->
                        <!-- <div id="switch-area" class="switch-area">
                            <div class="switch-wrap">
                               <section class="switch-part switch-part1">
    			                    <nav class="header-menu">
    			                    	<a href="javascript:void(0)" title="全部">全部</a>
    			                    	<a href="javascript:void(0)" title="语言">语言</a>
    			                    	<a href="javascript:void(0)" title="流派">流派</a>
    			                    	<a href="javascript:void(0)" title="主题">主题</a>
    			                    	<a href="javascript:void(0)" title="心情">心情</a>
    			                    	<a href="javascript:void(0)" title="场景">场景</a>
    			                    </nav>
    			                </section>
                            </div>
                        </div> -->
                    </header>
                </div>
            </div>
            <div class="pop-music" title="音乐"></div>
            <div class="mid-col" v-if="myChoose === '我的首页'">
               <div class="myIndex" style="overflow:auto;height:calc(100vh)">
                    <div class="mod_search" style="background-image:url(https://y.gtimg.cn/mediastyle/yqq/img/bg_search.jpg);">
                        <div class="search">
                            <el-input placeholder="请输入内容" v-model="searchParams.query" class="search-input">
                                <el-button slot="append" icon="el-icon-search" @click="searchMusic"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <!-- <div class="index__hd">
                        <h3 class="index__tit"><i class="icon_txt">歌单推荐</i></h3>
                    </div> -->
                    <div style="margin-top: 20px;text-align: center;">
                        <el-radio-group v-model="musicType" size="small" @change="typeChange">
                            <el-radio-button label="1">新歌榜</el-radio-button>
                            <el-radio-button label="2">热歌榜</el-radio-button>
                            <el-radio-button label="11">摇滚榜</el-radio-button>
                            <el-radio-button label="12">爵士</el-radio-button>
                            <el-radio-button label="16">流行</el-radio-button>
                            <el-radio-button label="21">欧美金曲榜</el-radio-button>
                            <el-radio-button label="22">经典老歌榜</el-radio-button>
                            <el-radio-button label="23">情歌对唱榜</el-radio-button>
                            <el-radio-button label="24">影视金曲榜</el-radio-button>
                            <el-radio-button label="25">网络歌曲榜</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="htmleaf-container">
                        <div class="full-length" v-loading="loading">
                            <div class="container">
                                <div class="row" v-if="ifSearch">
                                    <div v-for="(item,index) in searchData" :key="index" class="col-md-4 col-sm-6" style="width:22%;float:left;margin-left:2%;margin-top:10px">
                                        <div class="pricingTable">
                                            <h3 class="title">{{item.songname}}</h3>
                                            <div class="price-value">
                                                <span class="month">{{item.artistname}}</span>
                                            </div>
                                            <ul class="pricing-content">
                                                <li>热度：{{item.weight}}</li>
                                            </ul>
                                            <a href="#" class="pricingTable-signup red" @click="playMusic(item.songid)"><span>播放</span></a>
                                            <a href="#" class="pricingTable-signup red" @click="addMusic(item)"><span>添加</span></a>
                                            <!-- <a href="#" class="pricingTable-signup red"><span>下载</span></a> -->
                                        </div>
                                    </div>
                                </div>
                                <!-- <h1 class="player_logo">QQ音乐</h1> -->
                                <!-- <el-table :data="tableData" style="width: 100%" height="500">
                                    <el-table-column fixed prop="name" align="center" label="歌曲" width="150"> </el-table-column>
                                    <el-table-column label="歌手" align="center" width="120">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.singer[0].name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="专辑" align="center" width="120">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.album.name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="time_public" label="发布日期" align="center" width="120"></el-table-column>
                                    <el-table-column align="center" label="时长">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.interval }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table> -->
                                <ul v-if="!ifSearch" class="geBan">
                                    <li v-for="(item,index) in jsonpData" :key="index">
                                        <div class="port-1 effect-1">
                                            <div class="image-box">
                                                <img :src="item.pic_premium" alt="pic_premium">
                                            </div>
                                            <div class="text-desc">
                                                <h3>{{item.title}}</h3>
                                                <p>歌手：{{item.author}} <span style="padding-left:5px">语言：{{item.language}}</span> </p>
                                                <p>热度：{{item.hot}}</p>
                                                <a href="javascript:void(0)" @click="playMusic(item.song_id)" class="btn">播放</a>
                                                <a href="javascript:void(0)" @click="addMusic(item)" class="btn">添加</a>
                                                <a href="javascript:void(0)" @click="playMusic(item.song_id)" class="btn">下载</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 列表结束 -->
                    <div class="pageMusic" v-if="jsonpData.length > 0 && !ifSearch">
                        <!-- <el-button-group>
                            <el-button type="primary" icon="el-icon-arrow-left" style="margin-right:10px" >上一页</el-button>
                            <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </el-button-group> -->
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :current-page.sync="currentPage"
                            @current-change="handleCurrentChange"
                            :page-size="commonParams.size"
                            :total="totalMusic">
                        </el-pagination>
                    </div>
                    <!-- <div class="audioUrl">
                        <audio :src="musicUrl" controls="controls" autoplay="autoplay"></audio>
                    </div> -->
               </div>  
            </div>       
            <!-- 我的收藏  -->
            <div class="mid-col mycollectList" v-if="myChoose === '我的收藏'" style="background: #4A424A;">
                <my-collect></my-collect>
            </div>
        </div>
    </div>   
</template>
<style>
 .mod_search .el-input-group__append{
    text-align: center;
  }  
  .container .el-table::before{
    height: 0px;
  }
  .container .el-table__row:hover{
      cursor: pointer;
  } 
</style>
<style scoped>
@import '../../../static/css/hover-effects.css';
/* .mycollectList{
    background: #4A424A;
    opacity: .9;
} */
.audioUrl{
    position: fixed;
    bottom:20px;
    right:5px;
    background:white;
    z-index: 5;
}
.geBan li{
    float: left;
    width: 22%;
    margin: 10px 1%;
    list-style: none;
  } 
.bg_player {
    display: block;
}
.bg_player {
    display: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(65px);
    filter: blur(65px);
    opacity: .6;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
.bg_player, .bg_player_mask {
    position: absolute;
    top: 0;
    left: 0;
}
.mod_search {
    position: relative;
    height: 147px;
    background-position: 50%;
    background-size: cover;
}
.mod_search .mod_search_input, .mod_search .search_input__input {
    width: 554px;
    height: 50px;
}
.search-input{
    position: absolute;
    width: 500px;
    left: 50%;
    margin-left: -250px;
    top: 50px;
}
.pageMusic{
    clear: both;
    text-align: center;
    margin-bottom: 80px;
}
.pageMusic .el-pager{
    padding: 10px;
    line-height: 12px;
    font-size: 15px;
}
.index__tit {
    display: block;
    margin: 0 auto;
    width: 196px;
    height: 40px;
    font-size: 28px
}
#container .mid-col {
    position: absolute;
    right: 0;
    min-height: 100%;
    /* background-color: #292a2b; */
    left: 310px;
    width: auto;
}
.pop-music {
    width: 36px;
    height: 36px;
    background: url(http://www.shawnzeng.com/img/player.png);
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    border-bottom: none;
    -webkit-animation: spin 3s infinite linear;
    -moz-animation: spin 3s infinite linear;
    -ms-animation: spin 3s infinite linear;
    animation: spin 3s infinite linear;
    -moz-animation: spin 3s infinite linear;
    -ms-animation: spin 3s infinite linear;
    -webkit-animation: spin 3s infinite linear;
}
#header .switch-area {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 260px;
    font-size: 0.875rem;
}
#header .header-menu {
    margin-top: 20px;
    width: 100%;
    position: absolute;
    -webkit-transition: -webkit-transform 0.3s ease-in;
    -moz-transition: -moz-transform 0.3s ease-in;
    -ms-transition: -ms-transform 0.3s ease-in;
    transition: transform 0.3s ease-in;
}
a {
    text-decoration: none;
    outline-width: 0;
    color: #0bf;
    outline: none;
    cursor: pointer;
}
#header .header-menu a{
    display: inline-block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin: 2px;
    color: rgba(0,0,0,0.5);
    border: 2px solid rgba(0,0,0,0.1);
    -webkit-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    font-style: normal;
}
#header .switch-area .switch-wrap {
    -webkit-transition: -webkit-transform 0.3s ease-in;
    -moz-transition: -moz-transform 0.3s ease-in;
    -ms-transition: -ms-transform 0.3s ease-in;
    transition: transform 0.3s ease-in;
    position: relative;
}
#header .switch-part1 {
    left: 0;
}

#header .switch-part {
    width: 100%;
    position: absolute;
}
#header .header-subtitle {
    text-align: center;
    color: #333;
    font-size: 0.875rem;
    line-height: 1.75;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.header-author {
    text-align: center;
    margin: 13px 0;
    font-family: Georgia, "Nimbus Roman No9 L", "Songti SC", "Courier New", Times, Georgia, serif;
    font-size: 30px;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    transition: 0.3s;
}
#header .profilepic {
    text-align: center;
    display: block;
    border: 5px solid #fff;
    border-radius: 50%;
    width: 128px;
    height: 128px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #88acdb;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    text-align: center;
}
#header a {
    color: #000;
}
#header .profilepic img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
#container .left-col .intrude-less {
    width: 76%;
    text-align: center;
    margin: 112px auto 0;
}
#header {
    width: 100%;
}
.inner {
    width: 1000px;
    margin: 0 auto;
}
#container .left-col .overlay {
    width: 100%;
    height: 180px;
    background-color: #000;
    position: absolute;
    opacity: 0.7;
}
#container .left-col {
    background: rgba(255,255,255,0.85);
    width: 310px;
    position: fixed;
    opacity: 1;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    height: 100%;
    /* overflow-y: auto; */
    -webkit-box-shadow: 3px 2px 8px #333 !important;
    -webkit-box-shadow: 3px 2px 8px #333 !important;
    box-shadow: 3px 2px 8px #333 !important;
}
#header .collect{
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #ccc;
}
#header .collectActive{
    background: #ccc;
    border: 1px solid #4d92d9
}
</style>
<script>
    import myCollect from './myCollect'
    export default{
        components: {
           myCollect
        },
        data(){
            return{
               ifSearch: false,
               autoplay:true,
               tableData: [],
               myChoose: '我的首页',
               myType: [
                   {
                      name: '我的首页',
                      icon: 'iconfont icon-shouyefill'
                   },
                   {
                      name: '我的收藏',
                      icon: 'iconfont icon-xiangqufill'
                   },
                   {
                      name: '我的喜欢',
                      icon: 'iconfont icon-zanfill'
                   }
               ],
               auObj: null,
               loading: false,
               musicUrl: '',
               musicType: '1',
               api: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
               jsonpData: [],
               searchData: [],
               currentPage: 1,
               totalMusic: 0,
               dataObj: {
                    format: 'json',
                    calback: '',
                    from: 'webapp_music'
               },
               commonParams: {
                    method: 'baidu.ting.billboard.billList',
                    type: '',
                    size: 20,
                    offset: 0 
               },
               searchParams: {
                    method: 'baidu.ting.search.catalogSug',
                    query: ''
               },
               playParams: {
                    method: 'baidu.ting.song.play',
                    songid: ''
               }
            }
        },
        methods: {
            // 喜欢与收藏
            personMusic(type) {
              this.myChoose = type;
            },
            // 添加到收藏
            addMusic(item) {
               let addMusics = {
                    type: 'post',
                    path: '/music/collect',
                    datas: {
                        song_id: item.song_id ? item.song_id : item.songid,
                        author: item.author ? item.author : item.artistname,
                        title: item.title ? item.title : item.songname,
                        hot: item.hot ? item.hot : item.weight
                    }
               }
                this.$store.dispatch(addMusics).then(res=>{
                    this.$message({
                      message: '收藏成功',
                      type: 'success'
                    });  
                });
            },
            //播放音乐
            playMusic(songId){
                this.playParams.songid = songId;
                const dataMusic = Object.assign({}, this.playParams, this.dataObj)
                this.$jsonp(this.api, dataMusic).then(json => {
                    this.musicUrl = json.bitrate.file_link;
                })
            },
           // 音乐类型改变
           typeChange(val) {
              this.ifSearch = false;
              this.commonParams.offset = 0;
              this.currentPage = 1;
              this.getMusicList();
           },
           // 页数改变
           handleCurrentChange(val) {
               window.scrollTo(0,0);// 请求成功滚动条滚到顶部
               this.commonParams.offset = (parseInt(val)-1)*(this.commonParams.size);
               this.getMusicList();
           },
           searchMusic() {
              this.ifSearch = true;
              this.loading = true;
              const dataMusic = Object.assign({}, this.searchParams, this.dataObj)
              this.$jsonp(this.api, dataMusic).then(json => {               
　　                   this.searchData = json.song;
                       this.loading = false;
// 　　                this.totalMusic = parseInt(json.billboard.billboard_songnum);
              })
           },
           // 获取音乐列表
           getMusicList() {
               this.loading = true;
               this.commonParams.type = this.musicType;
               const dataMusic = Object.assign({}, this.commonParams, this.dataObj)
               this.$jsonp(this.api, dataMusic).then(json => {               
　　                this.jsonpData = json.song_list;
                    this.loading = false;
　　                this.totalMusic = parseInt(json.billboard.billboard_songnum);
              })
           }
        },
        mounted(){
            this.getMusicList();
        }

    }
</script>