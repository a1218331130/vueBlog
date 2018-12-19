<template>
<div class="wrapper" :class="ifOpen ? 'nav-open' : ''">
	    <header>
	      <div class="left">
	        <button title="Menu" @click="openLeft"  :class="ifOpen ? 'active' : ''"><i class="fa fa-bars fa-2x"></i></button>
	        <h1>发布页面</h1>
	      </div>
	      <div class="utils right">
	        <!-- <a href="javascript:void(0)" class='alerts'><i class="fa fa-bell-o fa-lg"></i></a> -->
	        <img :src="useImage" alt="" class="userImage">
	        <i class="sep">&nbsp;</i>
	        <a href="javascript:void(0)"><i class="fa fa-sign-out fa-rotate-180"></i></a>
	      </div>
	  </header>
	  <!--//Header-->
	    <div class="content">
	       <aside>
            <h2>Site Logo</h2>
            <!-- <div class="controls">
              <input type="search" id="search" name="search" />
              <label for="search"><i class="fa fa-search"></i></label>
            </div> -->
              <nav class='site-nav'>
                <a :class="leftNum === 0 ? 'active' : ''" @click="changeTitle(0)"><i class="fa fa-home"></i> 发布文章</a>
                <a :class="leftNum === 1 ? 'active' : ''" @click="changeTitle(1)"><i class="fa fa-gift"></i> 发布记录</a>
                <a :class="leftNum === 2 ? 'active' : ''" @click="changeTitle(2)"><i class="fa fa-line-chart"></i> 个人收藏</a>
                <a :class="leftNum === 3 ? 'active' : ''" @click="changeTitle(3)"><i class="fa fa-bell-o"></i> 个人设置</a>
              </nav> 
	        </aside>
	        <!--//sidebar-->
	    <section>
				<article v-if="leftNum === 0">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
            <el-row>
              <el-col :span="24">
                 <el-form-item label="文章名称" prop="name">
                   <el-input v-model="ruleForm.name" style="width:840px"></el-input>
                 </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="文章类型" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择文章类型" @change="changeMenu">
                      <el-option :label="item.menuName" :value="item.menuName" v-for="(item,index) in typeList" v-bind:key="index"></el-option>
                    </el-select>
                   </el-form-item>
              </el-col>
              <el-col :span="8" v-if="ifChild">
                  <el-form-item label="文章子类型" prop="codeChild">
                    <el-select v-model="ruleForm.codeChild" placeholder="请选择文章子类型">
                      <el-option :label="item.menuName" :value="item.childIndex" v-for="(item,index) in typeListChild" v-bind:key="index"></el-option>
                    </el-select>
                   </el-form-item>
              </el-col>
             <el-col :span="24">
                 <el-form-item label="内容简介" prop="desc1">
                   <el-input type="textarea" v-model="ruleForm.desc1" style="width:840px"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="24">
                 <el-form-item label="图片上传" prop="image">
                  <el-upload
                      :multiple="ifMulit"
                      :limit="limits"
                      class="upload-demo"
                      action="/blogUsers/image"
                      :on-success="handleSuccess"
                      :on-remove="handleRemove"
                      :file-list="fileList2"
                      list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能选择一张</div>
                  </el-upload>
                 </el-form-item>
             </el-col>
              <el-col :span="24">
                 <el-form-item label="">
                   <div>
                        <quill-editor v-model="ruleForm.content"
                              ref="myQuillEditor"
                              :options="editorOption">
                        </quill-editor>
                    </div>
                 </el-form-item>
              </el-col>
              <el-col :span="24" style="text-align: center">
                 <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
				</article>
        <article v-if="leftNum === 3">
          <person-setting></person-setting>
        </article>
	      </section>
	    </div>
	    <!--//Main Content-->
	</div>
</template>
<style>
@import '../../static/css/styles.css';
.ql-editor{
  height: 300px
}
.site-nav a:hover{
   cursor: pointer;
}
.userImage{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 50px;
    top: 5px;
    border-radius: 25px;
}
</style>
<script>
  import {quillRedefine} from 'vue-quill-editor-upload'
  import {quillEditor} from 'vue-quill-editor'
  import personSetting from '../components/issue/setting.vue'
  import {mapState} from "vuex";//通过ES6的对象解构赋值
export default {
  components: {
    quillRedefine,
    quillEditor,
    personSetting
  },
  data () {
    return {
      ifMulit: false,
      leftNum: 0,
      limits: 1,
      fileList2: [],
       ruleForm: {
          name: '',
          region: '',
          resource: '',
          desc1: '',
          content:  '',
          regionChild: '',
          imgUrl: '',
          codeChild: '',
          detailId: '' ,
          time: '' 
       },
       rules: {
          name: [
            { required: true, message: '请输入文章名称', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择文章类型', trigger: 'change' }
          ],
          regionChild: [
            { required: true, message: '请选择文章类型', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写内容简介', trigger: 'blur' }
          ]
        },
       ifOpen: true,
       timeId: '',
       menuList: [],
       typeList: [],
       ifChild: false,
       typeListChild: [],
       apiurl: '/blogUsers/image',
       editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
       }
    }
  },
  computed: {
     ...mapState(['useImage'])
  },
  methods: {
    getSetInfo() {
         let getSetting = {
            type: 'post',
            path: '/blogUsers/getSettingMsg',
            datas: {}
         }
         this.$store.dispatch(getSetting).then(res=>{
            this.$store.commit('getUseImage',  res.data.msg.image);     
         });
      },
    // 左边改变
    changeTitle(val) {
       this.leftNum = val;
    },
    submitForm(formName) {
        this.ruleForm.autor = this.$route.query.myname;
        this.ruleForm.detailId = this.timeId;
        this.ruleForm.time = this.timeId;
        var pathUrl = '/menu/addContent';
        if(this.ruleForm.codeChild !== '') {
          pathUrl = '/menu/addCourse';
        }
        // alert(this.ruleForm.detailId);
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let content = {
                  type: 'post',
                  path: pathUrl,
                  datas: this.ruleForm
                }
                this.$store.dispatch(content).then(res=>{
                    if(res.data.states !== 0) {
                      this.$message({
                        message: '保存成功',
                        type: 'success'
                      });
                    }else {
                      this.$message({
                        message: '保存失败',
                        type: 'error'
                      });
                    }
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList, 'qwqwqwqwqwqw');
    },
    handleSuccess(response, file, fileList) {
      var w=response.msg.file.path.indexOf('upload');
      this.ruleForm.imgUrl = 'http://localhost:3000/images/' + response.msg.file.path.substring(w);
    },
    openLeft() {
       this.ifOpen = !this.ifOpen;
    },
    changeMenu(val) {
       //  console.log(val);
       let getMenuChild = {
          type: 'post',
          path: '/menu/getMenuChild',
          datas: {
            menuName: val
          }
        }
        this.$store.dispatch(getMenuChild).then(res=>{
            if(res.data.states !== 0) {
               this.typeListChild = res.data.msg[0].children;
               this.ifChild = true;
            }else {
               this.ifChild = false;
            }
        });
    },
    getMenus() {
       let getMenu = {
          type: 'post',
          path: '/menu/getMenu',
          datas: {}
      }
      this.$store.dispatch(getMenu).then(res=>{
        // console.log(res.data.msg);
        this.menuList = res.data.msg;
        for(var i = 0; i<this.menuList.length; i++) {
           if(this.menuList[i].menuName !== '我的首页') {
              this.typeList.push({menuName:this.menuList[i].menuName,type:this.menuList[i].type});       
           }
        }
        // console.log(this.typeList);
      });
	   }
  },
  mounted () {
    //  alert(new Date().getTime());
     this.getMenus();
     this.getSetInfo();
     setInterval(() => {
        this.timeId = new Date().getTime().toString();
        // console.log(this.timeId);
     },1000)
  },
  created  () {
     this.editorOption = quillRedefine(
        {
          // 图片上传的设置
          uploadConfig: {
            action:  '/blogUsers/image',  // 必填参数 图片上传地址
            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
            // 你必须把返回的数据中所包含的图片地址 return 回去
            res: (respnse) => {
              console.log(respnse.msg.img.path, 'respnse.msg.img.path');
               var w=respnse.msg.img.path.indexOf('upload');
               return 'http://localhost:3000/images/' + respnse.msg.img.path.substring(w);   // 这里切记要return回你的图片地址
            }
          }
        }
      )
  }
}
</script>
