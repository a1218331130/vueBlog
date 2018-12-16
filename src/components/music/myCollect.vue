<template>
     <div>
         <div class="header">
            <div class="logo" title="♫ 老D在线音乐播放器">
                ♫ 程卫拓在线音乐播放器
            </div>
         </div>
         <div class="center">
              <div class="containerList">
                    <div class="music-list">
                        <div class="list-item list-head">    
                            <span class="music-album">热度</span>
                            <span class="auth-name">歌手</span>    
                            <span class="music-name">歌曲</span>
                        </div>
                        <div class="list-item" data-no="1" v-for="(item,index) in musicList" :key="index" @dblclick="playMusic(index,item)">    
                            <span class="list-num" v-if="ifPlay !== index">{{index + 1}}</span>    
                            <span class="list-num" v-if="ifPlay === index"><img src="/static/img/wave.gif" alt=""></span>    
                            <span class="list-mobile-menu"></span>   
                            <span class="music-album">{{item.hot}}</span>    
                            <span class="auth-name">{{item.author}}</span>    
                            <span class="music-name">
                                <span class="music-name-cult">{{item.title}}</span>
                                <!-- <div class="list-menu" data-no="1">
                                    <span class="list-icon icon-play" data-function="play" title="点击播放这首歌"></span>
                                    <span class="list-icon icon-download" data-function="download" title="点击下载这首歌"></span>
                                    <span class="list-icon icon-share" data-function="share" title="点击分享这首歌"></span>
                                </div> -->
                            </span>
                        </div>
                    </div>
                   <div class="player">
                        <!-- <div class="cover">
                            <img src="https://p1.music.126.net/-qHPT3rhxDlu5zQV9NcQ-A==/109951163555860423.jpg?param=300y300" class="music-cover" id="music-cover">
                        </div> -->
                        <div class="lyric">
                            <ul id="lyric">
                                <li class="lrc-item" v-for="(item,index) in lrc" :key="index">{{item[1]}}</li>
                            </ul>
                        </div>
                    </div>
              </div>
         </div>
         <div class="footerMusic">
              <div class="containerList">
                  <div class="con-btn">
                    <a href="javascript:;" class="player-btn btn-prev" title="上一首" @click="prev"></a>
                    <a href="javascript:;" @click="ifStop" class="player-btn btn-play" :class="autoplays ? ' btn-state-paused': ''" title="暂停/继续"></a>
                    <!-- <a href="javascript:;" class="player-btn btn-next" title="下一首"></a> -->
                    <a href="javascript:;" class="player-btn btn-next" title="下一首" @click="next"></a>
                    <a href="javascript:;" class="btn-order">{{nowTime}} / {{maxTime}}</a>
                    <!-- <el-progress :percentage="70"></el-progress> -->
                    <vue-slider @drag-end="dragend" ref="slider" v-model="value" width="800px" :max="600"></vue-slider>
                    <!-- <div>
                        {{lrc}}
                    </div> -->
                  </div>
              </div>
         </div>
         <!-- <div class="progess">
                   <span class="progess">
                        <vue-slider v-bind="options" ref="slider" v-model="value" width="600px" :max="600"></vue-slider>
                    </span>
         </div> -->
         <div class="audioUrl" style="opacity: 0;">
                <audio 
                   @timeupdate="onTimeupdate" 
                   @loadedmetadata="onLoadedmetadata" 
                   @ended="endedPlay"
                   :src="musicUrl" 
                   controls="controls" 
                   ref="audio" 
                   :autoplay="autoplays">
                </audio>
         </div>
    </div>   
</template>  
<style>
  .footerMusic .vue-slider-component .vue-slider-tooltip{
       display: none;
       
   }
</style>

<style scoped>
#lyric>li {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.lyric li {
    list-style: none;
}
.lyric {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 30px;
    bottom: 10px;
    overflow: hidden;
    text-align: center;
    color: #bdbdbe;
    color: rgba(225,225,225,.8);
    line-height: 28px;
    padding: 20px 0;
}
#lyric {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
}
.lyric .active{
    color: #31c27c;
}
.cover:after {
    content: "";
    position: absolute;
    left: 9px;
    top: 0;
    width: 201px;
    height: 180px;
    background: url(https://music.laod.cn/images/album_cover_player.png) 0 0 no-repeat;
    pointer-events: none;
}
.music-cover {
    vertical-align: middle;
    width: 186px;
    height: 186px;
}
.player {
    height: 100%;
    width: 400px;
    float: right;
    position: relative;
}
.cover {
    position: relative;
    display: block;
    width: 186px;
    height: 186px;
    margin: auto;
}
::-webkit-scrollbar{width:1px;}
.con-btn a {
    display: inline-block;
    position: absolute;
    top: 50%;
}
.btn-prev {
    background-position: 0 -30px;
    width: 19px;
    height: 20px;
    margin-top: -10px;
}
.btn-order {
    right: -55px;
    width: 85px;
    height: 25px;
    margin-top: -5px;
    font-size: 12px;
    color: white;
    text-decoration: none;
}
.progess{
    right: -100px;
}
.btn-play {
    width: 19px;
    height: 29px;
    margin-top: -14.5px;
    left: 36%;
    margin-left: -10.5px;
}
.btn-state-paused {
    background-position: -30px 0;
}
.btn-next {
    background-position: 0 -52px;
    right: 30%;
    width: 19px;
    height: 20px;
    margin-top: -10px;
}
.player-btn {
    background-image: url(https://music.laod.cn/images/player.png);
    opacity: .8;
    filter: alpha(opacity=80);
}
.con-btn {
    float: left;
    width: 130px;
    height: 100%;
    position: relative;
    margin: 0 10px;
}
.footerMusic{
    height: 100px;
    bottom: 0;
    width: 100%;
    position: absolute;
}
.music-list {
    width: 800px;
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    overflow-y: auto;
}
.list-menu {
    position: absolute;
    right: 10px;
    top: 50%;
    overflow: hidden;
    font-size: 0;
    height: 36px;
    margin-top: -18px;
    float: right;
    display: none;
}
.list-item:hover{
    cursor: pointer;
}
.music-name-cult {
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list-mobile-menu {
    display: none;
}
.list-num {
    display: block;
    width: 30px;
    text-align: center;
    float: left;
    overflow: hidden;
}
.music-name {
    position: relative;
    display: block;
    width: auto;
    margin-left: 40px;
    margin-right: 300px;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
.auth-name, .music-album {
    position: relative;
    display: block;
    width: 150px;
    float: right;
    height: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #bdbdbe;
    color: rgba(225,225,225,.8);
    font-size: 14px;
    overflow: hidden;
    border-bottom: 1px solid rgba(150,150,150,.1);
    cursor: default;
    position: relative;
}
.data-area {
    position: absolute;
    left: 0;
    right: 400px;
    top: 60px;
    bottom: 0;
    overflow: hidden;
}
.containerList {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.center {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 100px;
}
.header {
    height: 50px;
    position: absolute;
}
.logo {
    transition: all 0.25s ease;
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    display: inline-block;
    font-size: 23px;
    color: #829194;
    cursor: pointer;
    margin: 10px 20px;
}
</style>
<script>
    // 将整数转换成 时：分：秒的格式
    function realFormatSecond(second) {
        var secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)

            var hours = Math.floor(second / 3600)
            second = second - hours * 3600
            var mimute = Math.floor(second / 60)
            second = second - mimute * 60

            return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '00:00'
        }
    }
    //歌词同步部分    
    function parseLyric(text) {      
        var lines = text.split('\n');
        lines.splice(0,5);
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]    
        var pattern = /\[\d{2}:\d{2}.\d{2}\]/g,    
        //保存最终结果的数组    
        result = [];    
        //去掉不含时间的行    
        // while (!pattern.test(lines[0])) {    
        // lineslines = lines.slice(1);    
        // };    
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉    
        // lines[lines.length - 1].length === 0 && lines.pop();    
        lines.forEach(function(v, i, a ) {    
           //提取出时间[xx:xx.xx]    
           var time = v.match(pattern);
           //提取歌词    
           var vvalue = v.replace(pattern, '');    
           //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔    
           time.forEach(function(v1, i1, a1) {    
            //去掉时间里的中括号得到xx:xx.xx    
            var t = v1.slice(1, -1).split(':');    
            //将结果压入最终数组    
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), vvalue]);    
            });    
         });    
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词    
        // result.sort(function(a, b) {    
        // return a[0] - b[0];    
        // });    
        return result;    
    }  
    import vueSlider from 'vue-slider-component'
    export default{
        components: {
            vueSlider
        },
        data(){
            return{
                musicList: [],
                max: 0,
                now: 0,
                autoplays: false,
                lrc: '',
                value: 0,
                maxTime: '00:00',
                nowTime: '00:00',
                api: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
                ifPlay: '',
                ifPlay1: '',
                dataObj: {
                    format: 'json',
                    calback: '',
                    from: 'webapp_music'
               },
               musicUrl: '',
               playParams: {
                    method: 'baidu.ting.song.play',
                    songid: ''
               },
               lrcParams: {
                    method: 'baidu.ting.song.lry',
                    songid: ''
               }
            }
        },
        mounted(){
          this.getMusic();
          console.log(this.$refs.audio,'this.$refs.audio');
        },
        computed: {

        },
        methods: {
            // 下一首
            next() {
                let index = parseInt(this.ifPlay1) + 1;
                if(index > this.musicList.length) {
                  index = 0;
                }
                this.playParams.songid = this.musicList[index].song_id;
                this.lrcParams.songid = this.musicList[index].song_id;
                this.ifPlay = index;
                this.ifPlay1 = index.toString();
                this.getMusicUrl();
            },
            // 上一首
            prev() {
                let index = parseInt(this.ifPlay1) - 1;
                if(index < 0) {
                 index = this.musicList.length;
                }
                this.playParams.songid = this.musicList[index].song_id;
                this.lrcParams.songid = this.musicList[index].song_id;
                this.ifPlay = index;
                this.ifPlay1 = index.toString();
                this.getMusicUrl();
            },
            dragend(e) {
              console.log(e,'eeeeeeeeeeeeeeee');
              this.$refs.audio.currentTime = e.currentValue*(this.max)/600;
            },
           // 停止与播放
           ifStop(){
              if(this.autoplays) {
                 this.$refs.audio.pause();
                 this.ifPlay = '';
              }else {
                 this.$refs.audio.play();
                 this.ifPlay = this.ifPlay1;
              }
              this.autoplays = !this.autoplays;
           },
           endedPlay(){
              this.autoplays = !this.autoplays;
              this.ifPlay = '';
              let index = parseInt(this.ifPlay1) + 1;
              if(index > this.musicList.length) {
                 index = 0;
              }
              this.playParams.songid = this.musicList[index].song_id;
              this.lrcParams.songid = this.musicList[index].song_id;
              this.ifPlay = index;
              this.ifPlay1 = index.toString();
              this.getMusicUrl();
            //   const dataMusic = Object.assign({}, this.playParams, this.dataObj)
            //   this.$jsonp(this.api, dataMusic).then(json => {
            //         this.autoplays = true;
            //         this.musicUrl = json.bitrate.file_link;        
            //     })
           },
          //播放音乐
           playMusic(index,item) {
               this.ifPlay = index;
               this.ifPlay1 = index;
                this.playParams.songid = item.song_id;
                this.lrcParams.songid = item.song_id;
                this.getMusicUrl();
           },
           onTimeupdate(res) {
              this.nowTime = realFormatSecond(res.target.currentTime);
              this.now = parseInt(res.target.currentTime);
              if(this.now > 0) {
                 this.value = (this.now)*600/(this.max);
                //  console.log(this.value, 'this.value');
              }
              for (var i = 0, l = this.lrc.length; i < l; i++) {    
                    if (this.now /*当前播放的时间*/ > this.lrc[i][0]) {    
                    //显示到页面    
                        if(this.lrc[i][1].length > 1) {
                              $('#lyric').css('top',-i*25 + 200+'px'); //让歌词向上移动    
                              $('#lyric li').css('color','#fff');    
                              $('#lyric li:nth-child('+(i+1)+')').css('color','#31c27c'); //高亮显示当前播放的哪一句歌词
                        }
                            
                    }    
              } 
           },
           // 通过jsonp获取音乐链接
           getMusicUrl() {
               const dataMusic = Object.assign({}, this.playParams, this.dataObj)
                const dataMusic1 = Object.assign({}, this.lrcParams, this.dataObj)
                this.$jsonp(this.api, dataMusic).then(json => {
                    this.autoplays = true;
                    this.musicUrl = json.bitrate.file_link;           
                })
                this.$jsonp(this.api, dataMusic1).then(json => {
                    this.lrc = parseLyric(json.lrcContent);
                    console.log(parseLyric(json.lrcContent), 'parseLyricparseLyricparseLyricparseLyric');          
                })
           },
           onLoadedmetadata(res) {
              this.maxTime = realFormatSecond(res.target.duration);
              this.max = parseInt(res.target.duration);
           },
           getMusic() {
               let getMusics = {
                    type: 'post',
                    path: '/music/list',
                    datas: {
                    }
               }
                this.$store.dispatch(getMusics).then(res=>{
                     this.musicList = res.data.msg;
                    // this.$store.commit('getUseImage',  res.data.msg.image);     
                });
            },
        }

    }
</script>