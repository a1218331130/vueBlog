<template>
    <div>
        <div class="courseLeft">
          <course-left></course-left>
        </div>
        <div class="courseRight">
          <course-right></course-right>
        </div>
    </div>   
</template>  
<style scoped>
  .courseLeft{
      width: 200px;
      float: left;
      background: red;
      height: auto;
  }
  .courseRight{
      float: right;
      background: blue;
  }
</style>
<script>
    import courseLeft from './left'
    import courseRight from './right'
    export default{
        components: {
          courseLeft,
          courseRight
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