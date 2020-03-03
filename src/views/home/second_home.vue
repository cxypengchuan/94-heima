<template>
  <div class="box">
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in list" :key="item" class="img">
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
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252902066&di=69ae6257414dc834333c9d2c54321323&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2592848259%2C2238913933%26fm%3D214%26gp%3D0.jpg',
        'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3135852598,3698566643&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=20471219,3626359459&fm=26&gp=0.jpg',
        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1529393950,3978010167&fm=26&gp=0.jpg'
      ]

    }
  }
}
</script>

<style lang='less'>
 .box{
      height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2250651390,4181881369&fm=26&gp=0.jpg");
  img{
      width:100%;
      height: 100%;
  }
  .el-carousel__mask{
      z-index: 2;
      height: 100vh;
  }
 }
</style>
