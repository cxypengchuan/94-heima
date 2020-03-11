<template>
   <el-container>
     <el-aside :style="{width: collapse ? '64px' : '230px'}">
       <!-- <h1>左侧导航区域</h1> -->
        <!-- 左侧导航栏组件 -->
       <layout-aside :collapse="collapse"></layout-aside>

     </el-aside>
     <!-- 右侧 再嵌套一个 el-container -->
     <el-container>
       <!-- 再上下布局 -->
       <el-header>
         <!-- <h1>顶部操作栏组件</h1> -->
         <layout-header></layout-header>
       </el-header>
       <!-- 主要区域 -->
       <el-main>

          <!-- 这里应该放置 二级路由容器 -->
         <router-view></router-view>
       </el-main>
     </el-container>
   </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认是展开状态
    }
  },
  created () {
    // 切换了折叠的状态
    eventBus.$on('changeCollapse', () => {
      //  此时表示 折叠状态一定变了 变成什么了 一定是跟当前的状态相反了
      this.collapse = !this.collapse // 只要取反 就和 头部的组件的状态对上
    })
  }
}

</script>

<style>

</style>
