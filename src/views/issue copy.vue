<template>
<div class="wrapper" :class="ifOpen ? 'nav-open' : ''">
	    <header>
	      <div class="left">
	        <button title="Menu" @click="openLeft"  :class="ifOpen ? 'active' : ''"><i class="fa fa-bars fa-2x"></i></button>
	        <h1>发布页面</h1>
          <!-- <div>{{ruleForm.content}}</div> -->
          <!-- <code class="hljs" v-html="contentCode"></code> -->
          <!-- <div class="quill-code">
            <code class="hljs" v-html="contentCode"></code>
          </div> -->
          <!-- <div class="quill-code">
            <code class="hljs ql-editor" v-html="ruleForm.content"></code>
          </div> -->
           <!-- <div class="courseRight ql-bubble">
            <div v-html="contentCode" class="ql-editor"></div>
          </div> -->
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
            <h2>管理界面</h2>
            <!-- <div class="controls">
              <input type="search" id="search" name="search" />
              <label for="search"><i class="fa fa-search"></i></label>
            </div> -->
              <nav class='site-nav'>
                <a :class="leftNum === 0 ? 'active' : ''" @click="changeTitle(0)"><i class="fa fa-home"></i> 发布文章</a>
                <a :class="leftNum === 1 ? 'active' : ''" @click="changeTitle(1)"><i class="fa fa-gift"></i> 用户管理</a>
                <a :class="leftNum === 2 ? 'active' : ''" @click="changeTitle(2)"><i class="fa fa-line-chart"></i>文章管理</a>
                <a :class="leftNum === 3 ? 'active' : ''" @click="changeTitle(3)"><i class="fa fa-bell-o"></i> 个人设置</a>
              </nav> 
	        </aside>
	        <!--//sidebar-->
	    <section style="margin-top:100px">
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
                              :options="editorOption" style="height:300px">
                        </quill-editor>
                    </div>
                 </el-form-item>
              </el-col>
              <el-col :span="24" style="text-align: center;margin-top:50px">
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
        <article v-if="leftNum === 1">
          <person-guanli></person-guanli>
        </article>
         <article v-if="leftNum === 2">
          <person-article></person-article>
        </article>
	      </section>
	    </div>
	    <!--//Main Content-->
	</div>
</template>
<style>
@import 'highlight.js/styles/xcode.css';
</style>
<style scoped>
/* @import '../../static/css/styles.css'; */
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body, html {
  height: 100%;
}

strong {
  font-weight: 400;
  display: inline-block;
  background-color: #FFD480;
  padding: 0 8px;
}

body {
  /* padding-top: 60px; */
  background-color: #ecf0f1;
}
.nav-open section {
  margin-left: 0;
}
.nav-open aside {
  left: 0;
}

body, h1, h2, h3, p {
  font-family: "Open Sans", sans-serif;
}

h2 {
  margin-bottom: 15px;
}

.right {
  float: right;
}

.left {
  float: left;
}

.controls {
  position: relative;
  margin-bottom: 15px;
}

a {
  text-decoration: none;
}

.sep {
  content: '';
  border-right: 1px solid rgba(0, 0, 0, 0.13);
}

/*-------------------------
  2 - Header
-------------------------*/
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #92e4c9;
  height: 60px;
  line-height: 60px;
  color: #fff;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjEuMCIgeDI9IjEuMCIgeTI9IjAuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFiZWNiZiIvPjxzdG9wIG9mZnNldD0iNDUlIiBzdG9wLWNvbG9yPSIjMWJlY2U0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
  background-size: 100%;
  background-image: -moz-linear-gradient(45deg, #1becbf 0%, #1bece4 45%);
  background-image: -webkit-linear-gradient(45deg, #1becbf 0%, #1bece4 45%);
  background-image: linear-gradient(45deg, #1becbf 0%, #1bece4 45%);
}
header h1, header button {
  display: inline-block;
}
header h1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
header .utils {
  margin-right: 15px;
}
header .utils a {
  display: inline-block;
  padding: 0 5px;
  margin-right: -3px;
}
header .utils a {
  color: rgba(0, 0, 0, 0.3);
  -moz-transition: color 0.3s linear;
  -o-transition: color 0.3s linear;
  -webkit-transition: color 0.3s linear;
  transition: color 0.3s linear;
}
header .utils a:hover {
  color: rgba(0, 0, 0, 0.6);
}
header button {
  cursor: pointer;
  color: #fff;
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
  border: none;
  height: 60px;
  width: 60px;
  vertical-align: top;
  background: transparent;
  border-right: 1px solid rgba(255, 255, 255, 0.7);
  margin-right: 15px;
  -moz-transition: background-color 0.3s linear;
  -o-transition: background-color 0.3s linear;
  -webkit-transition: background-color 0.3s linear;
  transition: background-color 0.3s linear;
}
header button:hover, header button:focus, header button.active {
  outline: none;
}
header button:hover, header button.active {
  background-color: rgba(0, 0, 0, 0.1);
}

/*-------------------------
  3 - Sidebar
-------------------------*/
aside {
  position: fixed;
  height: 100%;
  width: 100%;
  color: #fff;
  left: -100%;
  background-color: #2A3744;
  padding: 20px;
  -moz-transition: left 0.4s ease, width 0.5s cubic-bezier(0.525, -0.35, 0.115, 1.335);
  -o-transition: left 0.4s ease, width 0.5s cubic-bezier(0.525, -0.35, 0.115, 1.335);
  -webkit-transition: left 0.4s ease, width 0.5s cubic-bezier(0.525, -0.35, 0.115, 1.335);
  transition: left 0.4s ease, width 0.5s cubic-bezier(0.525, -0.35, 0.115, 1.335);
}
aside a {
  padding: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  -moz-transition: background-color 0.3s, color 0.3s;
  -o-transition: background-color 0.3s, color 0.3s;
  -webkit-transition: background-color 0.3s, color 0.3s;
  transition: background-color 0.3s, color 0.3s;
}
aside a:hover {
  color: #fff;
}
aside a i,
aside a img {
  width: 20px;
  text-align: center;
  margin-right: 6px;
}
aside a,
aside input[type="search"] {
  color: #fff;
  display: block;
  font-weight: 300;
  width: 100%;
  padding: 8px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}
aside input[type="search"] {
  -webkit-appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #344454;
  width: 100%;
  font-size: 14px;
  padding: 8px;
  padding-left: 25px;
  -moz-transition: background-color 0.3s, border 0.3s;
  -o-transition: background-color 0.3s, border 0.3s;
  -webkit-transition: background-color 0.3s, border 0.3s;
  transition: background-color 0.3s, border 0.3s;
}
aside input[type="search"]:hover, aside input[type="search"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #3a4b5d;
}
aside input[type="search"] + label {
  position: absolute;
  left: 10px;
  top: 8px;
  color: rgba(0, 0, 0, 0.5);
}
aside .site-nav a {
  margin-bottom: 3px;
}
aside .site-nav a.active, aside .site-nav a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
aside .site-nav a.active i {
  color: #24FFCE;
}
aside footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  position: absolute;
  bottom: 40px;
  left: 0;
  padding-left: 10px;
}
aside footer a {
  padding: 8px;
}
aside footer .avatar img {
  max-width: 20px;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  display: inline-block;
  vertical-align: -3px;
  margin-right: 10px;
}

/*-------------------------
  4 - Main Content
-------------------------*/
section {
  -moz-transition: margin-left 0.4s ease;
  -o-transition: margin-left 0.4s ease;
  -webkit-transition: margin-left 0.4s ease;
  transition: margin-left 0.4s ease;
}
section article {
  padding: 20px;
}
section article h2 {
  font-weight: 300;
  font-size: 24px;
}
section article p {
  line-height: 1.5;
  margin-bottom: 10px;
}

/*-------------------------
  5 - Main Site Footer
-------------------------*/
.site-footer {
  background: #f7846a;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: #fafafa;
  border-top: 1px solid #ddd;
  font-size: 12px;
}
.site-footer a {
  color: #2A3744;
  display: inline-block;
  margin-right: -4px;
  padding: 0 8px;
}
.site-footer a.feedback {
  color: #FF870E;
}

/*-------------------------
  6 - Media Queries
-------------------------*/
@media (min-width: 500px) {
  .nav-open section {
    margin-left: 250px;
  }

  aside {
    position: fixed;
    top: 0;
    padding-top: 80px;
    width: 250px;
  }

  .site-footer {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
  }
}
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
  import hljs from 'highlight.js'
  import personSetting from '../components/issue/setting.vue'
  import personGuanli from '../components/issue/user.vue'
  import personArticle from '../components/issue/article.vue'
  import {mapState, mapGetters} from "vuex" //通过ES6的对象解构赋值
  // import { ImageDrop } from 'quill-image-drop-module'
  // import ImageResize from 'quill-image-resize-module'
  // Quill.register('modules/imageDrop', ImageDrop)
  // Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    quillRedefine,
    quillEditor,
    personSetting,
    personGuanli,
    personArticle
  },
  data () {
    return {
      ifMulit: false,
      leftNum: 0,
      limits: 1,
      fileList2: [],
       ruleForm: {
          name: 'qwqwqw',
          region: 'qwqwqw',
          resource: '',
          desc1: 'qwqw',
          content:  'wewew',
          regionChild: 'qwqwqw',
          imgUrl: '',
          codeChild: '',
          detailId: '' ,
          time: '' 
       },
       rules: {
          // name: [
          //   { required: true, message: '请输入文章名称', trigger: 'blur' }
          // ],
          // region: [
          //   { required: true, message: '请选择文章类型', trigger: 'change' }
          // ],
          // regionChild: [
          //   { required: true, message: '请选择文章类型', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写内容简介', trigger: 'blur' }
          // ]
        },
       ifOpen: true,
       timeId: '',
       menuList: [],
       typeList: [],
       ifChild: false,
       typeListChild: [],
       apiurl: '/blogUsers/image'
      //  editorOption: {
      //     modules: {
      //       toolbar: [
      //         ['bold', 'italic', 'underline', 'strike'],
      //         ['blockquote', 'code-block'],
      //         [{ 'header': 1 }, { 'header': 2 }],
      //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      //         [{ 'script': 'sub' }, { 'script': 'super' }],
      //         [{ 'indent': '-1' }, { 'indent': '+1' }],
      //         [{ 'direction': 'rtl' }],
      //         [{ 'size': ['small', false, 'large', 'huge'] }],
      //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //         [{ 'font': [] }],
      //         [{ 'color': [] }, { 'background': [] }],
      //         [{ 'align': [] }],
      //         ['clean'],
      //         ['link', 'image', 'video']
      //       ],
      //       syntax: {
      //         highlight: text => hljs.highlightAuto(text).value
      //       }
      //     }
      //  }
    }
  },
  computed: {
     ...mapGetters(['useImage']),
     contentCode() {
        return hljs.highlightAuto(this.ruleForm.content).value
     },
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
        // this.ruleForm.content = this.contentCode;
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
          },
          theme:'snow'
        }
      ),
      this.editorOption.modules.syntax = {
          highlight: text => hljs.highlightAuto(text).value
      }
      console.log(this.editorOption, 'this.editorOption');
  }
}
</script>
