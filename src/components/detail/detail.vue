<template>
<div class="carousel">
	 <!-- <el-carousel :interval="4000" height="271px">
		<el-carousel-item v-for="item in imageList" :key="item">
		   <img :src="item" style="width:100%">
		</el-carousel-item>
  </el-carousel> -->
  <div class="content">
     <detail-list></detail-list>
  </div>
</div>
</template>
<style scoped>
.sina-nav-header{
    width: 1120px;
    margin: 0 auto 0;
}
.menu{
	background: white;
}
</style>
<script>
import detailList from '../common/detailList'
export default {
  components: {
     detailList
  },
  data () {
    return {
       activeIndex: '1',
       imageList: [
         '/static/img/PPT2-1.jpg',
         '/static/img/chrome-2.jpg'
       ]
    }
  },
  methods: {
    
  },
  mounted () {

  }
}
</script>
