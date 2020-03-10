<template>
  <div class="cover-image">
      <div v-for="(item,index) in list" :key="index" class="cover-image-item">

          <img @click="opendialog" :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 采用element-ui的弹层组件 -->
      <!-- @事件="逻辑" -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 会再次封装一个组件  选择图片的组件 -->
          <!-- 监听谁的自定义事件 就在谁的标签上写v-on /@ @selectOneImg="receiveImg" -->
          <select-image ></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片 需要先将其转成变量
      dialogVisible: false // 弹层显示
    }
  },
  methods: {
    opendialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin: 10px 100px;
    .cover-image-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img {
            width:100%;
            height: 100%;
        }
    }
}
</style>
