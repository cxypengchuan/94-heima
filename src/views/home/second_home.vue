<template>
  <div class="box">
  <el-carousel style="height:'600px'" :interval="1500" type="card" height="200px" autoplay='true'>
    <el-carousel-item v-for="item in list" :key="item" class="img">
     <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>

   <el-carousel  :interval="1500" type="card" height="200px" autoplay='true'>
    <el-carousel-item v-for="item in man" :key="item" class="img">
     <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel> <el-carousel  :interval="1500" type="card" height="200px" autoplay='true'>
    <el-carousel-item v-for="item in man" :key="item" class="img">
     <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1354603962,2579167664&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=825387601,2266197446&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=510263679,864873340&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3336443933,3590886715&fm=26&gp=0.jpg'
      ],
      man: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2757779796,1744361781&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2165231530,890564121&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3367933129,3859878013&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256282978&di=2f09950e1b1efe2e3e72e11a9fd7a2ff&imgtype=0&src=http%3A%2F%2Fent.k618.cn%2Fgdxw%2F201607%2FW020160723366323593814.png'
      ]

    }
  }
}
</script>

<style lang='less' scoped>
.box{
    width: 90%;
    height: 500px;
    img{
        width: 50%;
        height: 150%;
    }
}
</style>
