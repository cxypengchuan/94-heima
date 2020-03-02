<template>
  <div class="login">
      <!-- ele组件 -->
<el-card class="login-card">
    <!-- logo -->
<div class="title">
    <img src="../../assets/img/logo_index.png" >
</div>
        <!-- form表单 -->
        <el-form ref='loginForm' :model='loginForm' :rules='loginRules'>
            <el-form-item style='margin-top:20px' prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
            </el-form-item>
             <el-form-item prop="code" >
            <el-input v-model="loginForm.code" placeholder="验证码" style='width:60%'></el-input>
            <el-button style='float: right;'>发送验证码</el-button>
            </el-form-item>
            <!-- 复选框 -->
            <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked">我已阅读<a href="" style='color:blue'>用户协议</a>和<a href="" style='color:blue '>隐私条款</a></el-checkbox>
            </el-form-item>
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
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false

      },
      // 定义检验规则
      loginRules: {
        // required是检验必填项
        mobile: [{ required: true, message: '请输入您的电话号码' },
        // pattren检验内容的格式
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '您的手机号格式不正确' }
        ],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码输入错误' }],
        checked: [{
          validator: function (rule, value, callback) {
            // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
            // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意我们的霸王条款'))
          }
        }]
      }
    }
  }
}
</script>

<style lang=less scoped>

.login{
    height: 100vh;
    /* background-image: url(../../assets/img/login_bg.jpg) ; */
    background-size: cover;
    display: flex;
   justify-content: center;
  align-items: center;
   &:before {
       /* 背景模糊效果 */
     content: '123';
     width: 100%;
     height: 100%;
     position: absolute;
     background-image: url(../../assets/img/login_bg.jpg);
     filter: blur(5px);
      background-size: cover;

  }
  .login-card{ z-index: 2;
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
