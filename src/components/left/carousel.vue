<template>
<div class="carousel">
    <ul>
       <li class="el-icon-folder-opened"><span>12</span></li>
       <li class="el-icon-folder-opened"><span>12</span></li>
       <li class="el-icon-folder-opened"><span>12</span></li>
    </ul>
</div>
</template>
<style scoped>
.carousel ul li{
    width: 100%;
    border-radius: 0px;
    color: #000;
    font-size: 15px;
    padding: 10px;
}
.carousel ul li span{
    padding-left: 5px
}
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
     ...mapGetters(['menuIndex'])
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
