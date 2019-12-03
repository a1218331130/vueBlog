<template>
  <div class="time" v-loading="loading" style="padding-top:20px">
       <timeline>
          <timeline-title bg-color="#9dd8e0">{{$route.query.menuName}}</timeline-title>
          <timeline-item bg-color="#9dd8e0" v-for="(item, index) in contentLists" :key="index">
            <span @click="showDetail(item.detailId)">{{item.title}}</span>
          </timeline-item>
      </timeline>
  </div>
</template>
<style>
.timeline-item {
    position: relative;
    margin: 1em 0 0 28px;
    padding-bottom: 1em;
    cursor: pointer;
}
.timeline-item:hover{
  color: #9dd8e0
}
</style>
<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data () {
    return {
      contentLists: [],
      loading: false
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 列表数据
      getList(name) {
        //  console.log(val);
        let getLists = {
            type: 'post',
            path: '/menu/getNewList',
            datas: {
                menuName: name,
                pageSize: 10,
                pageIndex: 1
            }
        }
        this.loading = true;
        this.$store.dispatch(getLists).then(res=>{
            if(res.data.states !== 0) {
                this.loading = false;
                window.scrollTo(0,0);// 请求成功滚动条滚到顶部
                // this.totalList = res.data.total;
                this.contentLists = res.data.msg;
            }
        });
      },
       showDetail(id) {
            this.$router.push({
                path: 'detail',
                query: {id: id}
            });
            // window.open(routeData.href, '_blank');
        }
  },
  mounted () {
    this.getList(this.$route.query.menuName);
  }
}
</script>
