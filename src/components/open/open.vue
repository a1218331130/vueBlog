<template>
<el-row>
  <el-col :span="8" v-for="(item, index) in project" :key="index" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="item.img" class="image">
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
        <div class="bottom clearfix">
          <p class="time">{{ item.desc }}</p>
          <a target="_blank" href="https://github.com/a1218331130"><el-button type="text" class="button">访问</el-button></a>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<style scoped>
.time {
    font-size: 14px;
    line-height: 16px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
<script>
const project = require('../../../static/json/git_project.json');
export default {
  components: {
  },
  data () {
    return {
      project: project,
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
