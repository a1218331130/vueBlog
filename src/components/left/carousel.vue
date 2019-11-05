<template>
<div class="carousel">
    <ul>
       <li @click="changeLi(index, item)" :class="num === index ? 'bgColor' : 'bgColorNone'" class="el-icon-folder-opened" v-for="(item, index) in contentLists" :key="index"><span>{{item.title}}</span></li>
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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.carousel ul .bgColor{
    color: white;
    background: #000;
}
.carousel ul .bgColorNone{
    color: #000;
    background: white;
}
.carousel ul li:hover{
  cursor: pointer;
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
      contentLists: [],
      num: 0
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
    changeLi(index, item) {
      this.num = index;
      this.$store.commit('getRightHtml', item.content);
    },
    getList() {
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
               this.contentLists = res.data.msg;
               this.$store.commit('getRightHtml', this.contentLists[0].content);
            }
        });
    },
  },
  mounted () {
     this.getList();
  }
}
</script>
