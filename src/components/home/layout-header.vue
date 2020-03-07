<template>
 <el-row type="flex" align="middle"  class='layout-header'>
  <el-col :span="12" class="left">
       <i class='el-icon-s-fold'></i>
       <span>
             贵阳市油榨街街道办事处
       </span>
  </el-col>
  <el-col :span="12" class="right">
      <!-- type转为flex布局，justify元素对齐方式，align文本对齐方式 -->
<el-row type='flex' justify="end" align="middle">
  <el-input  placeholder="请输入搜索内容" style='width:300px'></el-input>
    <img :src="userInfo.photo" alt="">
   <!-- 下拉菜单 -->
    <!-- 下拉菜单 点击菜单项会触发 command事件-->
           <el-dropdown trigger='click' @command="clickMenu">
               <!-- 显示的内容 -->
               <span>{{userInfo.name}}</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件  给每一个选项一个command属性-->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>

    </el-row>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户信息，渲染页面
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/cxypengchuan/94-heima'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 生命周期函数，进入页面后获取用户信息
    // const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      // } // 请求头参数 headers放置请求头参数
    }).then((res) => {
      this.userInfo = res.data
    })
  }
}
</script>

<style lang='less' scoped>
 .layout-header {
      height: 60px;
      .left {
          font-size: 20px;
          i {
              font-size:25px;
          }
      }
      .right {
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 4px;
          }
      }
  }
</style>
