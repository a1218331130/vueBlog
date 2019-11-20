<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="title"
      label="文章标题"
      width="380">
    </el-table-column>
    <el-table-column
      prop="menuName"
      label="文章类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="autor"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row._id)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getArticleInfo() {
         let getArticleMsg = {
            type: 'post',
            path: '/menu/getArticleList',
            datas: {}
         }
         this.$store.dispatch(getArticleMsg).then(res=>{
            this.tableData = res.data.msg;
            console.log(this.tableData,'tableDatatableDatatableDatatableData');
         });
      },
      deleteRow(dataed) {
         let delArticleMsg = {
            type: 'post',
            path: '/menu/deletArticle',
            datas: {
               id:dataed
            }
         }
         this.$store.dispatch(delArticleMsg).then(res=>{
            this.$message({
               message: '删除成功',
               type: 'success'
            });
            this.getArticleInfo();
         });
          console.log(dataed,'dataeddataeddataeddataed');
      }
    },
    mounted () {
      this.getArticleInfo();
    }
  }
</script>