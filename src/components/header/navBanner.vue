<template>
  <header class="js_header mod-header">
      <div class="banner" id="banner1" style="margin: 50px auto;margin-bottom:0px">
			<div class="banner-view"></div>
			<div class="banner-btn"></div>
			<div class="banner-number"></div>
			<div class="banner-progres"></div>
	  </div>
  </header>
</template>
<style>
.banner{
	position: relative;
	overflow: hidden;
}
.banner-view{
	position: relative;
	height: 100%;
	z-index: 999;
	background-color: #090b22;
	background-repeat: no-repeat;
}
.banner-view i{
	position: relative;
	display: block;
	float: left;
	background-repeat: no-repeat;
}
.banner-btn{
	position: absolute;
	width: 100%;
	height: 0;
	top: 45%;
	font-family: "宋体";
	font-size: 20px;
	z-index: 999;
}
.banner-btn span{
	display: block;
	float: left;
	width: 50px;
	line-height: 50px;
	text-align: center;
	background-color: #27cfc3;
	color: white;
	cursor: pointer;
	font-weight: 800;
	/* position: absolute;
	right:-150px; */
	/* background-image: url(../../../static/images/style-index.d437fb5e.png);
  background-position: -268px -18px;
  width: 56px;
  height: 56px; */
}
/* 
.banner-btn span:first-child{
	left: -150px;
} */
.banner-btn span:hover{
	background-color: rgba(0,0,0,0.6);
}
.banner-btn span + span{
	float: right;
}
.banner-number{
	position: absolute;
	bottom: 35px;
	width: 100%;
	height: 0;
	font-size: 0;
	text-align: center;
	z-index: 1000;
}
.banner-number > *{
	display: inline-block;
	border: 2px solid #fff;
	border-radius: 50%;
	margin: 0 8px;
	width: 10px;
	height: 10px;
	background-color: #00c3ff;
	cursor: pointer;
}
.banner-number  > *:hover,
.banner-number  > *.on{
	background-color: #ffc300;
}
.banner-progres{
	width: 100%;
	position: absolute;
	bottom: 0;
	height: 3px;
	z-index: 1000;
}
.banner-progres i{
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 3px;
	display: block;
	height: 100%;
	width: 0;
}
</style>

<style scoped>

</style>
<script>
import axios from 'axios'
import {FragmentBanner} from '../../../static/js/banner.js'
import loginDialog from './loginDialog'
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    loginDialog
  },
  data () {
    return {
      musicUrl: '',
      menuList: [],
      objects: {
			container : '#banner1',//选择容器 必选
			imgs : ['https://www.xuanfengge.com/wp-content/themes/lee3.0/dist/img/banner/1.0bd56759.jpg','https://www.xuanfengge.com/wp-content/themes/lee3.0/dist/img/banner/6.c6b4ec87.jpg'],//图片集合 必选
			size : {
				width : 1200,
				height : 300
			},//容器的大小 可选
			//行数与列数 可选
			grid : {
				line : 12,
				list : 14
			},
			index: 0,//图片集合的索引位置 可选
			type : 2,//切换类型 1 ， 2 可选
			boxTime : 5000,//小方块来回运动的时长 可选
			fnTime : 10000//banner切换的时长 可选
      }
    }
  },
  computed: {
     ...mapGetters(['menuIndex'])
  },
  methods: {
     
  },
  mounted () {
    FragmentBanner(this.objects);
    console.log(FragmentBanner, 'FragmentBannerFragmentBannerFragmentBanner');
  }
}
</script>
