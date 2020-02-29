<template>
  <div class="login">
      <!-- ele组件 -->
<el-card class="login-card">
    <!-- logo -->
<div class="title">
    <img src="../../assets/img/logo_index.png" >
</div>
        <!-- form表单 -->
        <el-form>
            <el-form-item style='margin-top:20px'>
            <el-input placeholder="请输入您的手机号"></el-input>
            </el-form-item>
             <el-form-item >
            <el-input placeholder="验证码" style='width:60%'></el-input>
            <el-button style='float: right;'>发送验证码</el-button>
            </el-form-item>
            <!-- 复选框 -->

            <el-checkbox>我已阅读<a href="" style='color:blue'>用户协议</a>和<a href="" style='color:blue '>隐私条款</a></el-checkbox>
            <!-- 登陆按钮 -->
            <el-form-item style='margin-top:20px'>
           <el-button   style="width:100% " type="primary" >登录</el-button>
            </el-form-item>

        </el-form>
</el-card>
      </div>
</template>

<script>
export default {

}
</script>

<style lang=less scoped>

.login{
    height: 100vh;
    background-image: url(../../assets/img/login_bg.jpg) ;
    background-size: cover;
    display: flex;
   justify-content: center;
  align-items: center;
  .login-card{
      width: 440px;
      height: 340px;
      .title{
          text-align: center;
      img {
         height: 50px;
      }
      }
  }
}
</style>
