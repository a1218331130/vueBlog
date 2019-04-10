<template>
    <div>
        <el-container class="left">
            <el-main>
                <detail-blog></detail-blog>
            </el-main>
            <el-aside width="300px" style="margin-top:10px">
                <right-title></right-title>
            </el-aside>
        </el-container>
        <footerBottom></footerBottom>
    </div>   
</template>  
<style scoped>
body{
    background: #e7e7e7;
}
.left{
    width: 1120px;
    margin: 0 auto 0;
    /* margin-top: 90px; */
}
</style>
<script>
    import navNewMenu from '@/components/header/navNewMenu'
    import detailBlog from '@/components/detail/detail'
    import rightTitle from '@/components/right/detailRight'
    import footerBottom from '@/components/footer/footer'
    export default{
        components: {
          detailBlog,
          rightTitle,
          footerBottom,
          navNewMenu
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