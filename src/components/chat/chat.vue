<template>
    <div>
        <div id="chat" style="position: relative;">
            <div style="position:fixed;right:100px;top:20px">
                <p>当前用户：{{itemName}}</p>
                <el-button type="danger" style="margin-top:20px" @click="chatLoginOut">退出</el-button>
                
            </div>
            <div style="position:fixed;top:20px;left:20px">
                <el-input v-model="inputUser" placeholder="请输入用户名"></el-input>
                <el-button type="primary" style="margin-top:20px" @click="chatLogin">登陆</el-button>
                <p style="margin-top:10px;font-size:14px">在线人数：<span style="color:red">{{userListNew.length}}</span>人</p>
                <p style="margin-top:10px;font-size:14px" v-for="(item,i) in userList" :key="i">
                    <span style="color:red">{{item.groupPepole}}</span>
                    <span v-if="item.type==='in'">上线了</span>
                    <span v-if="item.type==='out'">下线了</span>
                    <span style="padding-left:10px;color:blue;font-size:12px">{{item.groupTime}}</span>
                </p>
                <p></p>
            </div>
            <div class="sidebar">
                <div class="m-card">
                  <header>
                    <img class="avatar" width="40" height="40" alt="Coffce" src="/static/img/1.jpg">
                    <p class="name">群名称</p>
                   </header>
                   <footer>
                       <input class="search" placeholder="search user...">
                   </footer>
                </div>
                <!--v-component-->
                <div class="m-list">
                    <ul>
                        <!--v-for-start-->
                        <!-- <li>
                            <img class="avatar" width="30" height="30" alt="示例介绍" src="/static/img/2.png">
                            <p class="name">示例介绍</p>
                        </li> -->
                        <li @click="changeName(item.groupPepole)" :class="itemName===item.groupPepole ? 'active' : ''" v-for="(item,i) in userListNew" :key="i">
                            {{item.groupPepole}}
                            <!-- <img class="avatar" width="30" height="30" alt="webpack" src="/static/img/3.jpg"> -->
                            <!-- <p class="name">{{item.groupPepole}}</p> -->
                        </li>
                        <!--v-for-end-->
                    </ul>
                </div>
                <!--v-component-->
             </div>
             <div class="main">
                 <div class="m-message">
                     <ul>
                         <!--v-for-start--><!--v-for-end-->
                         <li style="height:40px" v-for="(item,i) in contentList" :key="i">
                             <span v-if="item.chatName!==itemName" class="contentLeft">{{item.chatName}} : {{item.chatContent}}</span>
                             <span v-if="item.chatName===itemName" class="contentRight">{{item.chatContent}} : {{item.chatName}}</span>
                         </li>
                         <!-- <li style="text-alain:right">121212：23232</li>
                         <li>121212：232323</li> -->
                     </ul>
                 </div>
                 <!--v-component-->
                 <div class="m-text">
                     <textarea v-model="texts" placeholder="点击按钮发送"></textarea>
                     <el-button type="primary" style="margin-top:20px;position: absolute;bottom: 0px;right: 0;" @click="send">发送</el-button>
                 </div>
                 <!--v-component-->
            </div>
        </div>
    </div>   
</template>  
<style>
.contentRight{
    display: inline-block;
    padding: 8px;
    width: auto;
    background: white;
    position: absolute;
    right: 20px;
}
.contentLeft{
    display: inline-block;
    padding: 8px;
    width: auto;
    background: white;
}
#chat {
    overflow: hidden;
    border-radius: 3px;
}
#chat {
    margin: 20px auto;
    width: 800px;
    height: 600px;
}
#chat .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
}
.m-card {
    padding: 9pt;
    border-bottom: 1px solid #24272c;
}
.m-card .avatar {
    border-radius: 2px;
}
.m-card .avatar, .m-card .name {
    vertical-align: middle;
}
.m-card .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 1pc;
}
.m-card footer {
    margin-top: 10px;
}
.m-card .search {
    padding: 0 10px;
    width: 100%;
    font-size: 9pt;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    outline: 0;
    background-color: #26292e;
}
.m-list li {
    padding: 9pt 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    -webkit-transition: background-color .1s;
    transition: background-color .1s;
    position: relative;
}
.m-list .avatar {
    border-radius: 2px;
}
.m-list .name {
    display: inline-block;
    margin: 0 0 0 15px;
    position: absolute;
    top: 19px;
}
.m-list li.active {
    background-color: hsla(0,0%,100%,.1);
}
#chat .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
}
#chat .m-message {
    height: calc(100% - 10pc);
}
.m-message {
    padding: 10px 15px;
    overflow-y: scroll;
}
#chat .main, #chat .sidebar {
    height: 100%;
}
#chat .m-text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
}
.m-text {
    height: 10pc;
    border-top: 1px solid #ddd;
}
.m-text textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: 0;
    font-family: Micrsofot Yahei;
    resize: none;
}
</style>
<script>
    export default{
        components: {
        },
        data(){
            return{
               inputUser: '',
               userLoginIn: '',
               userList: [],
               userListNew: [],
               counts: '',
               itemName: '',
               texts: '',
               contentList: []
            }
        },
        // 长连接
        sockets: {
            //不能改,j建立连接自动调用connect
            connect: function() {
                //与socket.io连接后回调
                console.log("socket connected");
            },
            //服务端向客户端发送login事件
            login: function(value) {
                //监听login(后端向前端emit  login的回调)
                this.userList.push(value);
                console.log(value, 'valuevaluevaluevaluevaluevalue')
            },
            out: function(value) {
                //监听out(后端向前端emit  out的回调)
                this.userList.push(value);
                console.log(value, 'valuevaluevaluevaluevaluevalue')
            },
            content: function(value) {
                //监听out(后端向前端emit  out的回调)
                this.contentList.push(value);
                console.log(value, 'valuevaluevaluevaluevaluevalue')
            }
        },
        mounted(){
            this.getUser();
            this.getCon();
        //    this.$socket.emit('login', {username:'admin'});
        },
        methods: {
            chatLogin() {
               let newDate = new Date();
               // 像后端发数据
               this.$socket.emit('login', {groupPepole:this.inputUser, type: 'in'});
               this.loginIn('in');
               this.getUser();
            },
            chatLoginOut() {
               let newDate = new Date();
               this.$socket.emit('out', {groupPepole:this.itemName, type: 'out'});
               this.loginOut();
               this.getUser();
            },
            changeName(name) {
              this.itemName = name;
            },
            loginIn() {
                //发送请求，这里我封装了axios,报错的话可以用原生的axios请求
                let paramRegist = {
                    type: 'post',
                    path: '/chat/pepole',
                    datas: {
                        loginName: this.inputUser
                    }
                }
                this.$store.dispatch(paramRegist).then(res=>{
                    this.$message({
                    message: res.data.msg,
                    type: 'success'
                    });
                });
            },
            loginOut() {
                let paramRegist = {
                    type: 'post',
                    path: '/chat/out',
                    datas: {
                        loginName: this.itemName
                    }
                }
                this.$store.dispatch(paramRegist).then(res=>{
                    // this.$message({
                    // message: res.data.msg,
                    // type: 'success'
                    // });
                });
            },
            send() {
                this.$socket.emit('content', {chatName:this.itemName, chatContent: this.texts});
                let paramRegist = {
                    type: 'post',
                    path: '/chat/content',
                    datas: {
                        chatName: this.itemName,
                        chatContent: this.texts
                    }
                }
                this.$store.dispatch(paramRegist).then(res=>{
                    // this.contentList = res.data.msg;
                });
            },
             getUser() {
                let paramRegist = {
                    type: 'post',
                    path: '/chat/getUserList',
                    datas: {
                    }
                }
                this.$store.dispatch(paramRegist).then(res=>{
                    this.userListNew = res.data.msg;
                    this.itemName = this.userListNew[0].groupPepole
                });
            },
            getCon() {
                let paramRegist = {
                    type: 'post',
                    path: '/chat/geContentList',
                    datas: {
                    }
                }
                this.$store.dispatch(paramRegist).then(res=>{
                    this.contentList = res.data.msg;
                });
            }
        }

    }
</script>