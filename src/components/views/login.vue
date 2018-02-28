<template>
  <div class="login">
    <h3 class="loginTit">博才社后台管理系统</h3>
    <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="account"
        label="账号"
        :rules="[
          { required: true, message: '请输入账号', trigger: 'blur' },
        ]"
      >
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]"
      >
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    <el-button class="subForm" type="primary" @click="submitForm('loginForm')">登陆</el-button>
    </el-form>
    
  </div>
</template>

<script>
export default {
  data () {
      return {
          login:'登陆',
          loginForm:{
            account:"",
            password:""
          }
      };
    },
    methods:{
      submitForm(formName){
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({path:'/pages'})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style>
  .login{
    position: absolute;
    width: 400px;
    padding: 15px;
    border: 1px solid #dcdfe6;
    border-radius:10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .subForm{
    width: 100%;
  }
  .loginTit{
    margin-bottom: 10px;
    font-size: 20px;
  }
</style>
