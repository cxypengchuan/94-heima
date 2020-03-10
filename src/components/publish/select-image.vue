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
          <el-tab-pane label="上传库" name="upload">上传素材</el-tab-pane>
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
</style>
