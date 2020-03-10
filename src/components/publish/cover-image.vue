<template>
  <div class="cover-image">
      <div v-for="(item,index) in list" :key="index" class="cover-image-item">

          <img @click="opendialog(index)" :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 采用element-ui的弹层组件 -->
      <!-- @事件="逻辑" -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 会再次封装一个组件  选择图片的组件 -->
          <!-- 监听谁的自定义事件 就在谁的标签上写v-on /@ @selectOneImg="receiveImg" -->
          <select-image @selectOneImg="receiveImg" ></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片 需要先将其转成变量
      dialogVisible: false, // 弹层隐藏
      selectIndex: -1 // 用来记录当前点击了哪个索引
    }
  },
  methods: {
    opendialog (index) {
      this.dialogVisible = true// 弹层显示
      this.selectIndex = index // 记录你点击了哪一张图片
    },
    // 接收传递的地址
    receiveImg (url) {
    //    拿到了图片地址之后应该干什么
    // props数据 不能直接修改 只能读取
    // 再次传递
    // 二次传递的时候 ,需要把之前记录的要更改的索引 传出去
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次将数据传递给 父组件  不但要有url地址 还有有索引地址
      // 关闭弹层
      this.dialogVisible = false // 关闭弹层
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
