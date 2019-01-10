<template>
<div class="menu">
	<div class="sina-nav-header">
		<el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="selectMenu">
			<el-menu-item v-if="item.type==='2'" :index="item.menuName" v-for="(item,index) in menuList" v-bind:key="index">{{item.menuName}}</el-menu-item>
			<el-submenu :index="item.indexNumber" v-if="item.type==='1'" v-for="(item,index) in menuList" v-bind:key="index">
				<template slot="title">{{item.menuName}}</template>
				<el-menu-item :index="item1.childIndex" v-for="(item1,index1) in item.children" v-bind:key="index1">{{item1.menuName}}</el-menu-item>
				<!-- <el-menu-item :index="2-2">vue</el-menu-item>
				<el-menu-item index="2-3">node</el-menu-item>
				<el-menu-item index="2-4">mongoose</el-menu-item>
				<el-menu-item index="2-5">expresss</el-menu-item> -->
			</el-submenu>
         <li class="el-menu-item" @click="aboutAutor">关于作者</li>
         <li class="el-menu-item" @click="aboutAutor">版本信息</li>
		</el-menu>
	</div>
</div>
</template>
<style>
.sina-nav-header{
    width: 1120px;
    margin: 0 auto 0;
}
.menu{
	background: white;
}
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
// import {GET_MENU} from "../../store/types";
export default {
  components: {
    
  },
  data () {
    return {
	//    activeIndex: '我的首页',
	   menuList: []
    }
  },
  computed: {
     ...mapGetters(['menuIndex'])
  },
  methods: {
    aboutAutor() {
      let routeData = this.$router.resolve({
            name: "autor"
      });
      window.open(routeData.href, '_blank');
    },
    selectMenu(index, indexPath) {
       if(index.indexOf('10') > -1) {
          let routeData = this.$router.resolve({
            path: "/course",
            query: {
               titleName: index
            }
          });
          window.open(routeData.href, '_blank');
          return;
       }
       this.$store.commit('changeMenuIndex',index);
       this.$router.push({path:'/blog'});
	},
	getMenus() {
      this.$store.dispatch('GET_MENU', {asd:10}).then((res)=>{
         console.log(res, 'resresresres');
         this.menuList = res.data.msg;	
         // console.log(this.menuList, 'this.menuListthis.menuListthis.menuList');
      });
      // let getMenu = {
      //     type: 'post',
      //     path: '/menu/getMenu',
      //     datas: {}
      // }
      // this.$store.dispatch(getMenu).then(res=>{
		// this.menuList = res.data.msg;	
      // });
	}
  },
  mounted () {
     this.getMenus();
  }
}
</script>
