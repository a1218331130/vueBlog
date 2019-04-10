<template>
<div class="menu-setting">
	<div class="sina-nav-setting">
		<el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="用户头像">
            <el-upload
               class="avatar-uploader"
               action="/blogUsers/image"
               :on-success="userImageChange"
               :show-file-list="false">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
         <el-form-item label="用户昵称">
            <el-input v-model="form.name" style="width:600px"></el-input>
         </el-form-item>
         <el-form-item label="用户性别">
            <el-radio-group v-model="form.sex">
               <el-radio label="男"></el-radio>
               <el-radio label="女"></el-radio>
            </el-radio-group>
         </el-form-item>
         <el-form-item label="是否通知">
            <el-switch v-model="form.delivery"></el-switch>
         </el-form-item>
         <!-- <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
               <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
               <el-checkbox label="地推活动" name="type"></el-checkbox>
               <el-checkbox label="线下主题活动" name="type"></el-checkbox>
               <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
         </el-form-item> -->

         <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.desc" style="width:600px"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">修改信息</el-button>
            <!-- <el-button>取消</el-button> -->
         </el-form-item>
      </el-form>
   </div>
</div>
</template>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    
  },
  data () {
    return {
	//    activeIndex: '我的首页',
      settingList: {},
      imageUrl: '',
      form: {
          name: '',
          sex: '',
          image: '',
          delivery: false,
          desc: ''
        }
    }
  },
  computed: {
     ...mapGetters(['menuIndex'])
  },
  methods: {
     userImageChange(response, file, fileList) {
       console.log(response.msg.file.path);
       var w=response.msg.file.path.indexOf('upload');
       this.imageUrl = 'http://localhost:3000/images/' + response.msg.file.path.substring(w); 
     },
     onSubmit() {
         if(this.form.name === '') {
            this.$message({
               message: '用户名不能为空',
               type: 'error'
            }); 
            return;
         }
         this.form.image = this.imageUrl;
         let getSettingUpdata = {
            type: 'post',
            path: '/blogUsers/updateSetting',
            datas: this.form
         }
         this.$store.dispatch(getSettingUpdata).then(res=>{
            this.$message({
               message: '修改成功',
               type: 'success'
            });  
            this.$store.commit('getUseImage', this.imageUrl);
         });
      },
     getSet() {
         this.form.image = this.imageUrl;
         let getSetting = {
            type: 'post',
            path: '/blogUsers/getSettingMsg',
            datas: {}
         }
         this.$store.dispatch(getSetting).then(res=>{
         // console.log(res.data.msg);
         this.menuList = res.data.msg;
         this.form = {
            name: this.menuList.useName,
            sex: this.menuList.sex,
            image: this.menuList.image,
            delivery: this.menuList.delivery,
            desc: this.menuList.desc
         }
         this.imageUrl = this.form.image;
         this.$store.commit('getUseImage', this.imageUrl);
         //  this.$message({
         //     message: '退出成功',
         //     type: 'success'
         //   });
         
         });
      }
  },
  mounted () {
     this.getSet();
  }
}
</script>
