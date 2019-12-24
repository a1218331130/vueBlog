<template>
    <div>
       <h1 class="main-title" style="font-family: 'Ubuntu', sans-serif;" @click="show">
        <i class="fa fa-list-ul faa-wrench" aria-hidden="true"></i>
        最新文章列表</h1>
        <modal name="bar" draggable=".window-header">
            <div class="window-header">DRAG ME HERE</div>
            <div>
                Hello, 🌎!
            </div>
        </modal>
        <article v-for="(item, index) in contentLists" :key="index" class="post post-list-thumb post-list-thumb-left post-list-show">
            <div class="post-thumb">
                <a href="javascript:void(0)">
                  <img class="lazyload animated bounceInDown" src="../../static/images/portfolio-3.jpg">
                </a>
            </div>
            <div class="post-content-wrap">
                <div class="post-content animated bounceInRight" style="margin-right: 30px">
                <div class="post-date">
                    <i class="iconfont icon-time">
                    </i>{{item.time}}</div>
                <a href="javascript:void(0)" class="post-title" @click="showDetail(item._id)">
                    <h3 style="margin: 17.5px 0">{{item.title}}</h3>
                </a>
                <div class="post-meta">
                    <span><i class="fa fa-tags"></i>
                        <a href="javascript:void(0)">web<em>·</em></a>
                        <a href="javascript:void(0)">悦读<em>·</em></a>
                    </span>
                    <span>
                    <i class="fa fa-folder-o"></i>
                        <a href="javascript:void(0)">技术</a>
                    </span>
                </div>
                <div class="float-content">
                    <p style="margin: 17.5px 0">{{item.menuName}}</p>
                    <div class="post-bottom">
                    <a href="javascript:void(0)" class="button-normal">
                        <i class="iconfont icon-caidan"></i>
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </article>
    </div>
</template>
<style scoped>
@keyframes post-list-show {
    0% {
    opacity:0;
    -webkit-transform:translateY(80px);
    transform:translateY(80px)
    }
    100% {
        opacity:1;
        -webkit-transform:translateY(0);
        transform:translateY(0)
    }
}
h1.fes-title, h1.main-title {
    color: #666;
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 5px;
    margin-bottom: 30px;
    border-bottom: 1px dashed #ececec;
}
.post-list-show {
    animation: post-list-show .5s;
    -webkit-animation: post-list-show .5s;
    opacity: 1;
}
.post-list-thumb {
    float: left;
    width: 100%;
    height: 250px;
    position: relative;
    margin: 20px 0 20px;
    border-radius: 10px;
    background-color: rgba(255,255,255,0);
    box-shadow: 0 1px 20px -6px rgba(0,0,0,.5);
    /* opacity: 0; */
    transition: box-shadow .3s ease;
}
.post-list-thumb-left .post-thumb {
    float: left;
}
.post-thumb {
    float: right;
    width: 55%;
}
.post-list-thumb-left .post-thumb a {
    border-radius: 10px 0 0 10px;
}

.post-thumb a {
    height:250px;
    position: relative;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    border-radius: 0 10px 10px 0;
}
.post-list-thumb a {
    color: #504e4e;
}
.post-thumb a img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    transition: all .6s;
}

.lazyload {
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -ms-filter: blur(0px);
    filter: blur(0px);
    -webkit-transition: .3s -webkit-filter linear;
    -moz-transition: .3s -moz-filter linear;
    -moz-transition: .3s filter linear;
    -ms-transition: .3s -ms-filter linear;
    -o-transition: .3s -o-filter linear;
    transition: .3s filter linear,.3s -webkit-filter linear;
}
img {
    height: auto;
    max-width: 100%;
}
img {
    border: 0;
}
.post-list-thumb-left .post-content-wrap {
    float: left;
    padding-left: 30px;
    padding-right: 0;
    text-align: right;
    margin: 20px 10px 10px 0;
}
.post-content-wrap {
    position: relative;
    display: inline-block;
    float: right;
    padding-right: 30px;
    padding-left: 0;
    width: 40%;
    margin: 20px 10px 0 10px;
}
.post-date, .post-meta, .post-meta a {
    color: #888;
    font-size: 12px;
}
.post-list-thumb i {
    margin-right: 5px;
    color: #989898;
    font-size: 14px;
}
.post-list-thumb .post-title h3 {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
}
.post-date, .post-meta, .post-meta a {
    color: #888;
    font-size: 12px;
}
.float-content {
    position: relative;
    width: 100%;
    right: 0;
    margin: 0;
    padding: 0;
    z-index: 50;
    color: rgba(0,0,0,.66);
}
.float-content p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 67.5px;
    overflow: hidden;
}

</style>
<script>
    // import navNewMenu from '@/components/header/navNewMenu'
    import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
    import { getNewList } from '../base/api/blog.js'
    export default{
        components: {
        //   navNewMenu
        },
        data(){
            return{
               loading: false,
               contentLists: []
            }
        },
        mounted(){
           this.getList();
        },
        computed: {
            ...mapGetters(['menuIndex'])
        },
        watch: {
            menuIndex(val) {
                if(val) {
                 this.getList();
                }
            }
        },
        methods: {
            // 列表数据
            getList() {
                this.loading = true;
                let datas = {
                    menuName: this.menuIndex,
                    pageSize: 10,
                    pageIndex: 1
                }
                getNewList(datas).then(res => {
                   if(res.data.states !== 0) {
                        this.loading = false;
                        window.scrollTo(0,0);// 请求成功滚动条滚到顶部
                        // this.totalList = res.data.total;
                        this.contentLists = res.data.msg;
                    }
                });
            },
            show() {
              this.$modal.show('bar');
            },
            // 展示详情
            showDetail(id) {
               this.$router.push({
                   path: 'detail',
                   query: {id: id}
                });
                // window.open(routeData.href, '_blank');
            }
        }

    }
</script>
