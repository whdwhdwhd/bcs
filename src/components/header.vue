<template>
  <div class="bcs-header">
    <header class="bg-blue">
        <a class="logo-div">
            <img src="/static/img/logo.png" alt="" class="header-logo"><span>博才社后台管理系统</span>
        </a>
      
      <div class="header-operations">
        <el-dropdown>
          <span class="el-dropdown-link">
            BCS<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-button type="text" @click="open">修改密码</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <!--修改密码弹窗-->
    <div class="changePasswordBox" v-if="reveal">
      <div class="mark"></div>
      <div class="changePassword">
        <el-row class="changeTit" type="flex" justify="space-between">
          <el-col>修改密码</el-col>
          <el-col><i class="el-icon-close" @click="onClose"></i></el-col>
        </el-row>
        <el-form :model="changeForm" ref="changeForm" label-width="100px" class="demo-dynamic">
          <el-form-item prop="formerPassword" label="旧密码" :rules="[{ required: true, message: '请输入旧密码', trigger: 'blur' },]">
            <el-input type="password" v-model="changeForm.formerPassword"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码" :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' }]">
            <el-input type="password" v-model="changeForm.newPassword"></el-input>
          </el-form-item>
        <el-button class="subForm" type="primary" @click="submitForm('changeForm')">修改</el-button>
        </el-form>
      </div>
    </div>
    
  </div>
</template>
<script>
  export default {
    props: {
      user: ""
    },
    data () {
      return {
        reveal:false,
        changeForm:{
          formerPassword:"",
          newPassword:""
        }
      };
    },
    methods:{
      open(){
        this.reveal=true;
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onClose(){
        this.reveal=false;
        this.changeForm.formerPassword="";
        this.changeForm.newPassword="";
      }
    }
  };
</script>
<style scoped>
  .changePasswordBox{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 3000;
  }
  .mark{
    width: 100%;
    height: 100%;
    background: #000;
    opacity:0.5;
  }
  .changePassword{
    position: absolute;
    width: 400px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    border-radius:5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
  }
  .changeTit{
    line-height: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .changeTit .el-col:nth-child(1){
    text-align: left;
  }
  .changeTit .el-col:nth-child(2){
    text-align: right;
    cursor: pointer;
  }
  .subForm{
    width: 100%;
  }
  .bcs-header{
    height: 60px;
  }
  header {
    background-color: rgb(32, 160, 255);
    height: 60px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 999;
    box-sizing: border-box;
    position: fixed;
  }
  .logo-div{
      height: 60px;
      float: left;
      line-height: 60px;
  }
  .logo-div span{
      color: #fff;
      vertical-align: middle;
      margin-left: 10px;
  } 
  .header-logo {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .header-operations {
    float: right;
    padding-right: 30px;
    height: 100%;
  }
  .el-dropdown-link{
    color: #fff;
  }
  .header-opacity{
    opacity: .7;
  }
  .header-operations:after, header:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
</style>
