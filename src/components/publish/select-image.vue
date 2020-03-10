<template>

      <el-tabs v-model="activeName">
          <el-tab-pane label="素材库" name="material">
              <div class="select-image-list">
                  <el-card class="img-card" v-for="item in list" :key='item.id'>
                      <img :src="item.url" @click="clickImg(item.url)" alt="">
                  </el-card>
              </div>
              <!-- 分页组件 -->
              <el-row type="flex" justify="center" style="height:80px" align="middle">
               <!-- 分页组件 -->
                <el-pagination backgroud layout='prev,pager,next'
                :total='page.total'
                :current-page='page.currentPage'
                :page-size='page.pageSize'
                 @current-change="changePage"
                  ></el-pagination>
              </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传库" name="upload">
               <!-- 放置一个上传组件 -->
      <!-- action必须给值 否则会报错http-request 自定义上传 -->
      <el-upload action="" class='upload-img' :http-request="uploadImg">
        <!-- 放置一个元素 用来点击上传 -->
        <i class='el-icon-plus'> </i>
      </el-upload>
          </el-tab-pane>
      </el-tabs>

</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 素材列表数据
      page: {
        currentPage: 1, // 第几页
        pageSize: 8, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {

    getALLImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage, // 分页请求带上的当前页面
          pre_page: this.page.pageSize// 分页请求带上的煤业多少条
        }
      }).then((res) => {
        this.list = res.data.results// 获取全部素材的数据
        this.page.total = res.data.total_count// 分页组件所有数据条数
      })
    },
    // 点击图片时触发
    clickImg (url) {
    //   需要将url参数传递给上层组件
    // 在脚手架中 自定义事件名 可以大小写通用 不用纯小写了
      this.$emit('selectOneImg', url) // 将url参数传出去
    },
    // 切换页码显示内容
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值新页码
      this.getALLImg()// 重新获取数据
    },
    // 上传素材
    uploadImg (params) {
      // 调用上传接口
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(result => {
        // 如果成功了  此时 我们的接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 应该做什么
        // 根刚才一样 往外传
        this.$emit('selectOneImg', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getALLImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
