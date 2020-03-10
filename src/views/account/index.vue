<template>
 <el-card>
        <!-- 账户信息 -->
        <bread-crumb slot='header'>
          <template slot='title'>账户信息</template>
        </bread-crumb>
        <!-- 放置表单容器 -->
        <el-form label-width="100px" :model="formData" :rules="rules" ref="myForm">
          <!-- 表单域 -->
          <el-form-item label="用户名" prop="name">
            <el-input style="width:30%" v-model='formData.name'></el-input>
          </el-form-item >
              <!-- 表单域 -->
          <el-form-item label="简介" >
                  <el-input style="width:30%" v-model='formData.intro'></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input style="width:30%" v-model='formData.email'></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <!-- 手机号可以看 但是手机号不能改 因为手机号是登录的标识 -->
             <el-input disabled style="width:30%" v-model='formData.mobile'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="saveUser">保存</el-button>
          </el-form-item>
        </el-form>
         <!-- 头像 -->
      <!-- show-file-list为false是不显示上传的文件列表 -->
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <img class='head-upload' :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/back.jpg'), // 头像变量
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }],
        mobile: [{ required: true, message: '名字不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }]
      }

    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      // params.file
      const data = new FormData()
      data.append('photo', params.file) // params.file 就是选择的文件
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data // 要传递的参数
      }).then(result => {
        this.formData.photo = result.data.photo // 拿到新头像地址了 你需要把新地址赋值给当前页面的地址
        // 现在拿到新地址了 但是 头部组件的地址吗没有更新
        // 需要处理非关系型组件之间的传值 eventBus(明天上午讲)  /vuex(移动端第一天讲)
      })
    },

    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data // 将数据赋值给表单数据
      })
    },
    saveUser () {
      // 手动校验表单数据
      this.$refs.myForm.validate().then(() => {
        //  如果校验成功 会进入到then
        // 调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 类型
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    }
  },
  created () {
    this.getUserInfo() // 调用方法
  }
}
</script>

<style lang='less' acoped>
  .head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
