<template>
    <div>
        <div class="headerList">
           <nav-new-menu></nav-new-menu>
           <!-- <nav-header></nav-header> -->
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped>
@keyframes main {
    0% {
    opacity:0;
    transform:translateY(50px)
}
100% {
    opacity:1;
    transform:translateY(0)
}
}
.container{
    animation: main 1s;
    position: relative;
    max-width: 800px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255,255,255,.8);
    margin-top: 90px;
}
body{
    background: #e7e7e7;
    overflow-x: hidden
}
</style>
<script>
    // import navBanner from '@/components/header/navBanner'
    import navNewMenu from '@/components/header/navNewMenu'
    // import leftCarousel from '@/components/left/carousel'
    // import detailRight from '@/components/right/detailRight'
    // import footerBottom from '@/components/footer/footer'
    export default{
        components: {
        //   navBanner,
          navNewMenu
        //   leftCarousel,
        //   detailRight
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
