<template>
    <div>
        <div class="headerList">
           <nav-header></nav-header>
           <nav-menu></nav-menu>
        </div>
        <el-container class="left">
            <el-main>
                <left-carousel></left-carousel>
            </el-main>
            <el-aside width="300px" style="margin-top:10px">
                <right-title></right-title>
            </el-aside>
        </el-container>
        <footerBottom></footerBottom>
    </div>   
</template>  
<style>
.headerList{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 100;
}
body{
    background: #e7e7e7;
}
.left{
    width: 1120px;
    margin: 0 auto 0;
    margin-top: 90px;
}
</style>
<script>
    import navHeader from '@/components/header/navHeader'
    import navMenu from '@/components/header/navMenu'
    import leftCarousel from '@/components/left/carousel'
    import rightTitle from '@/components/right/detailRight'
    import footerBottom from '@/components/footer/footer'
    export default{
        components: {
          navHeader,
          navMenu,
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