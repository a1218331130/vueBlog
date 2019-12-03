<template>
<div class="tags">
     <p>tags</p>
     <p>目前共计 {{tages.length}} 个标签</p>
     <div class="wrapper">
      <div class="cols">
        <div class="col" @click="showDetail(item.name)" @mouseover="overTages(item.name)" @mouseleave="overTages('')" v-for="(item, index) in tages" :key="index" >
          <div class="container">
            <div class="front" :class="translate === item.name ? 'frontNew' : ''" :style="{backgroundImage: 'url(' + item.img + ')'}">
              <div class="inner">
                <p>{{item.name}}</p>
                <!-- <span>图片简介</span> -->
              </div>
            </div>
            <div class="back" :class="translate === item.name ? 'backNew' : ''">
              <div class="inner">
                <p>{{item.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<style scoped>
.tags{
  padding-top:30px;
}
.tags p{
  text-align: center;
}
.tags p:first-child{
   font-size: 25px;
   margin-bottom: 10px;
   font-weight: bold;
}
.wrapper{
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
}
 
.cols{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
 
.col{
  width: calc(25% - 2rem);
  margin: 1rem;
  cursor: pointer;
}
 
.container{
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
 
.front,
.back{
  background-size: cover;
  background-position: center;
  -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  text-align: center;
  min-height: 280px;
  height: auto;
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
}
 
.back{
  background: #cedce7;
  background: -webkit-linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
  background: -o-linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
  background: linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
}
 
.front:after{
  position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    opacity: .6;
    background-color: #000;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    border-radius: 10px;
}
/* .container:hover .front,
.container:hover .back{
    -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
} */
 
.back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
 
.inner{
    -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
            transform: translateY(-50%) translateZ(60px) scale(0.94);
    top: 50%;
    position: absolute;
    left: 0;
    width: 100%;
    padding: 2rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    outline: 1px solid transparent;
    -webkit-perspective: inherit;
            perspective: inherit;
    z-index: 2;
}
 
.container .back{
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
}
 
.container .front{
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
}
 
.container .backNew{
  -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}
 
.container .frontNew{
  -webkit-transform: rotateY(-180deg);
          transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}
 
.front .inner p{
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
}
 
.front .inner p:after{
  content: '';
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #C6D4DF;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -.75rem;
}
 
.front .inner span{
  color: rgba(255,255,255,0.7);
  font-family: 'Montserrat';
  font-weight: 300;
}
 
@media screen and (max-width: 64rem){
  .col{
    width: calc(33.333333% - 2rem);
  }
}
 
@media screen and (max-width: 48rem){
  .col{
    width: calc(50% - 2rem);
  }
}
 
@media screen and (max-width: 32rem){
  .col{
    width: 100%;
    margin: 0 0 2rem 0;
  }
}             
</style>
<script>
const tages = require('../../../static/json/tages.json');
export default {
  components: {
  },
  data () {
    return {
      tages: tages,
      translate: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    overTages(name) {
       this.translate = name;
    },
    // 展示详情
    showDetail(name) {
        this.$router.push({
            path: 'timeLine',
            query: {menuName: name}
        });
        // window.open(routeData.href, '_blank');
    }
  },
  mounted () {
  }
}
</script>
