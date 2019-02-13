<template>
    <div>
        <el-dialog
            :visible.sync="dialog"
            width="25%"
            :modal="false"
            :before-close="closeLogin"
            center>
            <span slot="title">登陆 / 注册</span>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="50px" class="demo-dynamic">
                <el-form-item
                    prop="useName"
                    label="用户"
                    :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                    ]"
                >
                <el-input v-model="dynamicValidateForm.useName"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="passWord"
                    :rules="[
                      {required: true, message: '请输入密码', trigger: 'blur'}
                    ]"
                >
                <el-input v-model="dynamicValidateForm.passWord"></el-input>
                </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeLogin">取 消</el-button>
                <el-button type="primary" @click="loginAndRegit('regist','dynamicValidateForm')">注册</el-button>
                <el-button type="primary" @click="loginAndRegit('login','dynamicValidateForm')">登陆</el-button>
            </span>
         </el-dialog>
    </div>   
</template>  
<style>
</style>
<script>
    import axios from 'axios'
    import {mapState, mapGetters} from "vuex";//通过ES6的对象解构赋值
    export default{
        components: {
        //   navHeader
        },
        props: ['dialog'],
        data(){
            return{
              dynamicValidateForm: {
                useName: '',
                passWord: ''
              }
            }
        },
        mounted(){

        },
        computed: {
          ...mapGetters(['count'])
        },
        methods: {
          closeLogin() {
             this.$emit('close');
             this.dynamicValidateForm = {};
          },
          loginAndRegit(type, formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(type === 'regist') {
                       let paramRegist = {
                           type: 'post',
                           path: '/blogUsers/regist',
                           datas: this.dynamicValidateForm
                       }
                       this.$store.dispatch(paramRegist).then(res=>{
                          this.$message({
                            message: res.data.msg,
                            type: 'success'
                          });
                          this.$emit('close');
                          this.$refs[formName].resetFields();
                       });
                    }else {
                        let paramLogin = {
                           type: 'post',
                           path: '/blogUsers/login',
                           datas: this.dynamicValidateForm
                       }
                       this.$store.dispatch(paramLogin).then(res=>{
                          if(res.data.msg.length === 0 || res.data.state === 0) {
                            this.$message({
                                message: '用户名或者账户不存在',
                                type: 'error'
                            });
                            return;
                          }
                          this.$message({
                            message: '登陆成功',
                            type: 'success'
                          });
                          this.$emit('close');
                          this.$emit('getUser', res.data.msg[0]);
                          this.$refs[formName].resetFields();
                       });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
          }
        }

    }
</script>