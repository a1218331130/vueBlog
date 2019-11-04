<template>
  <header class="js_header mod-header">
       <div class="banner">
          <div class="image">
			  <img src="../../../static/blogImage/我的音乐播放器.png" alt="">
		  </div>
       </div>
  </header>
</template>
<style scoped>
.banner{
  width: 1200px;
  margin: 0 auto;
  height: 200px;
  /* background: red; */
}
.image img{
	height: 200px;
}
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    
  },
  data () {
    return {
      musicUrl: '',
      menuList: []
    }
  },
  computed: {
     ...mapGetters(['menuIndex'])
  },
  methods: {
     
  },
  mounted () {
  }
}
</script>
