<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="useName"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="passWord"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="简介">
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
      getSetInfo() {
         let getUserMsg = {
            type: 'post',
            path: '/blogUsers/getUserMsg',
            datas: {}
         }
         this.$store.dispatch(getUserMsg).then(res=>{
            this.tableData = res.data.msg;
            console.log(this.tableData,'tableDatatableDatatableDatatableData');
         });
      },
      deleteRow(dataed) {
         let delUserMsg = {
            type: 'post',
            path: '/blogUsers/deletUser',
            datas: {
               id:dataed
            }
         }
         this.$store.dispatch(delUserMsg).then(res=>{
            this.$message({
               message: '删除成功',
               type: 'success'
            });
            this.getSetInfo();
         });
          console.log(dataed,'dataeddataeddataeddataed');
      }
    },
    mounted () {
      this.getSetInfo();
    }
  }
</script>