<template>
    <div>
        <div class="courseRight ql-bubble">
           <div v-html="datas" class="ql-editor"></div>
        </div>
    </div>   
</template>  
<style>
@import '../../../static/css/quill.core.css';
@import '../../../static/css/quill.snow.css';
@import '../../../static/css/quill.bubble.css';
</style>
<script>
    export default{
        components: {
        },
        data(){
            return{
               datas: ''
            }
        },
        props:{
           htmlData: {
               type: String,
               default:''
           }
        },
        watch: {
           htmlData(val) {
               if(val) {
                 this.datas = val;
                 console.log(val);
               }
           }
        },
        mounted(){
           this.datas = this.htmlData;
        },
        computed: {

        },
        methods: {
        //    alert(this.$store.commit('count1'));
        }

    }
</script>