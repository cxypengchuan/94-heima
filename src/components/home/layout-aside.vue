<template>
  <div class="layout-aside">
     <!-- 头部图片 -->
     <div class='title'>
         <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <!-- 导航菜单用el-menu -->
  <el-menu router background-color="#323745" text-color="#adafb5">
     <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
           <el-menu-item index='/home/publish'>发布文章</el-menu-item>
           <el-menu-item index='/home/articles'>内容列表</el-menu-item>
           <el-menu-item index='/home/comment'>评论列表</el-menu-item>
           <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
  <el-submenu index="3">
               <template slot="title">
                 <i class='el-icon-s-opportunity'></i>
                 <span>粉丝管理</span>
               </template>
             <!-- 二级菜单项 还是使用el-menu-item -->
             <el-menu-item index='/home/picture'>图文数据</el-menu-item>
             <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
             <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
             <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
         </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
     <!-- 下拉结束 -->
     </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-aside{
  width: 230px;
  height: 100vh;
  background-color: #000;
  .title{
    text-align: center;
          padding: 10px 0;

          img {
              height: 35px;
          }
  }
   .el-menu {
          border-right: none;
      }
}
</style>
