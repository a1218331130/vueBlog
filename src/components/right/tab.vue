<template>
<div class="tabs">
 <el-tabs type="border-card">
    <el-tab-pane title="最多浏览">
        <span slot="label"><i class="iconfont icon-kanguo"></i></span>
        我的行程
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label"><i class="iconfont icon-zan"></i></span>
        我的行程
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label"><i class="iconfont icon-pinglun"></i></span>
        我的行程
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label"><i class="iconfont icon-xiangqu"></i></span>
        我的行程
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label"><i class="iconfont icon-shaogouwu"></i></span>
        我的行程
    </el-tab-pane>
</el-tabs>
</div>
</template>
<style scoped>
.tabs .el-tabs__item{
    padding:0 22px
}
</style>
<script>
export default {
  components: {
  },
  data () {
    return {
 
    }
  },
  methods: {
    
  },
  mounted () {

  }
}
</script>
