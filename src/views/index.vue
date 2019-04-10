<template>
    <div>
        <div class="headerList">
           <nav-new-menu></nav-new-menu>
           <!-- <nav-header></nav-header> -->
           
        </div>
        <div class="bannerNav">
            <nav-banner></nav-banner>
        </div>
        <el-container class="left">
            <el-main style="padding:0px;margin-top:10px">
                <left-carousel></left-carousel>
            </el-main>
            <el-aside width="300px" style="margin-left:10px">
                <right-title></right-title>
            </el-aside>
        </el-container>
        <footerBottom></footerBottom>
    </div>   
</template>  
<style scoped>
.bannerNav{
    margin-top: 90px
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
    import navBanner from '@/components/header/navBanner'
    import navNewMenu from '@/components/header/navNewMenu'
    import leftCarousel from '@/components/left/carousel'
    import rightTitle from '@/components/right/detailRight'
    import footerBottom from '@/components/footer/footer'
    export default{
        components: {
          navBanner,
          navNewMenu,
          leftCarousel,
          rightTitle,
          footerBottom
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