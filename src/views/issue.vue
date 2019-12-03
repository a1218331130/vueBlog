<template>
<div class="wrapper">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
                 <el-form-item label="文章名称" prop="name">
                   <el-input v-model="ruleForm.name" size="small"></el-input>
                 </el-form-item>
                  <el-form-item label="文章类型" prop="region">
                    <el-select size="small" v-model="ruleForm.region" placeholder="请选择文章类型">
                      <el-option v-for="(item, index) in tages" :key="index" :label="item.name" :value="item.name"></el-option>
                      <!-- <el-option label="VUE" value="VUE"></el-option> -->
                    </el-select>
                   </el-form-item>
                   <el-form-item>
                    <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
          </el-form>
           <div class="issue">
              <div class="issue-left note-view">
                 <!-- <quill-editor v-model="issueContent"
                    ref="myQuillEditor"
                    :options="editorOption" style="height:calc(100vh - 136px)">
                 </quill-editor> -->
                 <mavon-editor ref="imgId" @imgAdd="$imgAdd" :ishljs="true" codeStyle='arduino-ligh' style="height:100%;width: 100%;" v-model="issueContent"></mavon-editor>
              </div>
           </div>
           <!-- <div class="issue-right">
                 <div v-highlight class="markdown-body" v-html="issueContentData"></div>
              </div> -->
	</div>
</template>
<style>
.markdown-body .highlight pre, .markdown-body pre{
  background-color: #282c34
}
.markdown-body blockquote  {
    padding: 20px;
    background-color: #f2f2f2;
    border-left: 6px solid #b3b3b3;
    word-break: break-word;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    margin: 0 0 20px;
}
</style>
<style scoped>
   .wrapper{
     height: 100%;
   }
   .issue{
     /* padding: 0 1%; */
     /* display: flex; */
     width: 100%;
     height: calc(100vh - 70px);
   }
   .issue .issue-left{
      width:100%;
      height: 100%;
   }
   /* .issue .issue-right{
      flex:1;
      height: 100%;
   } */
</style>
<script>
  
  // import {quillRedefine} from 'vue-quill-editor-upload'
  // import {quillEditor} from 'vue-quill-editor'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // import '@/assets/css/dark.min.css'
  import {mapState, mapGetters} from "vuex" //通过ES6的对象解构赋值
  import marked from 'marked'
  const tages = require('../../static/json/tages.json');
  export default {
  components: {
    // quillRedefine,
    // quillEditor,
    mavonEditor
  },
  data () {
    return {
      tages: tages,
      issueContent: '',
       ruleForm: {
          name: '',
          region: '',
          detailId: '' ,
          content: '',
          time: '' 
       },
       rules: {
          name: [
            { required: true, message: '请输入文章名称', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择文章类型', trigger: 'change' }
          ]
        },
       timeId: '',
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
    //  issueContentData() {
    //     var content = marked(this.issueContent);
    //     return content
    //  },
  },
  methods: {
    // getSetInfo() {
    //      let getSetting = {
    //         type: 'post',
    //         path: '/blogUsers/getSettingMsg',
    //         datas: {}
    //      }
    //      this.$store.dispatch(getSetting).then(res=>{
    //         this.$store.commit('getUseImage',  res.data.msg.image);     
    //      });
    // },
    $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           let pushImg = {
              type: 'post',
              path: '/blogUsers/image',
              datas: formdata
           }
         this.$store.dispatch(pushImg).then(res=>{
            console.log(res.msg.image.path);
            this.$refs.imgId.$img2Url(pos, res.msg.image.path);
         });
          //  axios({
          //      url: 'server url',
          //      method: 'post',
          //      data: formdata,
          //      headers: { 'Content-Type': 'multipart/form-data' },
          //  }).then((url) => {
          //      $vm.$img2Url(pos, url);
          //  })
     },
    submitForm(formName) {
        this.ruleForm.autor = this.$route.query.myname;
        this.ruleForm.detailId = this.timeId;
        this.ruleForm.time = this.timeId;
        this.ruleForm.content = this.issueContent;
        // this.ruleForm.content = this.contentCode;
        var pathUrl = '/menu/addContent';
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
    }
  },
  mounted () {
    //  this.getSetInfo();
     setInterval(() => {
        this.timeId = new Date().getTime().toString();
        // console.log(this.timeId);
     },1000)
  },
  created  () {
    //  this.editorOption = quillRedefine(
    //     {
    //       // 图片上传的设置
    //       uploadConfig: {
    //         action:  '/blogUsers/image',  // 必填参数 图片上传地址
    //         // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
    //         // 你必须把返回的数据中所包含的图片地址 return 回去
    //         res: (respnse) => {
    //           console.log(respnse.msg.img.path, 'respnse.msg.img.path');
    //            var w=respnse.msg.img.path.indexOf('upload');
    //            return 'http://localhost:3000/images/' + respnse.msg.img.path.substring(w);   // 这里切记要return回你的图片地址
    //         }
    //       },
    //       theme:'snow'
    //     }
    //   ),
    //   this.editorOption.modules.syntax = {
    //       highlight: text => hljs.highlightAuto(text).value
    //   }
    //   console.log(this.editorOption, 'this.editorOption');
  }
}
</script>
