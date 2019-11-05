<template>
    <div>
        <div class="headerList">
           <nav-new-menu></nav-new-menu>
           <!-- <nav-header></nav-header> -->
        </div>
        <div class="container">
            <div class="leftSide">
                <left-carousel></left-carousel>
            </div>
            <div class="rightSide">
                <detail-right></detail-right>
            </div>
        </div>
        <!-- <div class="bannerNav">
            <nav-banner></nav-banner>
        </div> -->
        <!-- <el-container class="left bannerNav">
            <el-main width="300px" style="padding:0px;margin-top:10px">
                <left-carousel></left-carousel>
            </el-main>
            <el-aside style="margin-left:10px">
                <right-title></right-title>
            </el-aside>
        </el-container> -->
        <!-- <footerBottom></footerBottom> -->
    </div>
</template>
<style scoped>
.container{
    display: flex;
    margin-top:90px;
    height: calc(100vh - 100px);
}
.container .leftSide{
    width:300px;
    height: 100%;
    overflow-y: auto;
    overflow-x:hidden; 
    /* background: red; */
}
.container .rightSide{
    flex:1;
    height: 100%;
    overflow-y: auto;
    padding: 0px 20px;
    padding-left: 50px;
    /* background: blue; */
}
.headerList{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1000;
}
body{
    background: #e7e7e7;
}
.left{
    width: 1200px;
    margin: 0 auto 0;
}
</style>
<script>
    // import navBanner from '@/components/header/navBanner'
    import navNewMenu from '@/components/header/navNewMenu'
    import leftCarousel from '@/components/left/carousel'
    import detailRight from '@/components/right/detailRight'
    // import footerBottom from '@/components/footer/footer'
    export default{
        components: {
        //   navBanner,
          navNewMenu,
          leftCarousel,
          detailRight
        //   footerBottom
        },
        data(){
            return{

            }
        },
        mounted(){

        },
        computed: {

        },
        methods: {
        //    alert(this.$store.commit('count1'));
        }

    }
</script>
