<template>
<el-card class='articles'>
    <bread-crumb slot='header'>
    <template slot='title'>
        内容列表
    </template>
    </bread-crumb>
    <!-- 搜索框 -->
    <el-form style="padding-left:50px">
        <el-form-item  label='文章状态' >
            <el-radio-group v-model="searchForm.status" @change="change">
             <el-radio :label="5">全部</el-radio>
             <el-radio :label="0">草稿</el-radio>
             <el-radio :label="1">待审核</el-radio>
             <el-radio :label="2">审核通过</el-radio>
             <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>

       <el-form-item label="频道类型">
    <el-select  placeholder="请选择频道" v-model="searchForm.channel_id" @change="change">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>

        <el-form-item label="日期范围:">

             <el-date-picker type='daterange'  @change="change" value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
     <!-- 文章的主体结构 flex布局  -->
      <el-row class='total' type='flex' align="middle">
         <span>共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 文章内容 -->
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
         <img :src=" item.cover.images.length ?  item.cover.images[0] : defaultImg" alt="">
          <div class="info">
              <span>{{item.title}}</span>
              <el-tag :type=" item.status | filterType" class='tag'>{{  item.status  | filterStatus}}</el-tag>

               <span class='date'>{{ item.pubdate }}</span>
          </div>

          </div>
      <div class="right">
              <span><i class="el-icon-edit"></i> 修改</span>
              <span @click="delArticles(item.id.toString())"><i class="el-icon-delete" ></i> 删除</span>
      </div>
          </div>
          <!-- 放置分页组件 -->
       <el-row type='flex' justify="center" style='height:80px' align="middle">
             <!-- 分页组件 -->
             <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="changePage"
               background  layout='prev,pager,next'>
             </el-pagination>
       </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 接口每页数据10-50
        total: 1 // 总数
      },
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道的数据
      list: [], // 定义list数据接收文章列表
      defaultImg: require('../../assets/img/timg.jpg') // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
    }
  },
  // 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数是value
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达中还可以用 v-bind 的表达式中
    filterType (value) {
      // 根据当前状态的值 显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 删除文章
    delArticles (id) {
      this.$confirm('您确定要删除这条文章吗？', '提示').then(() => {
        this.$axios({
          url: `/articles/${id}`, // 地址加参数
          method: 'delete'
        }).then(() => {
          this.changeCondition()// 重新加载
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    //   请求页码数据总数
    changePage (newPage) {
      this.page.currentPage = newPage// 最新页码数据
      this.changeCondition() // 条件改变后请求的数据
    },
    // 切换条件后页码重新到第一条
    change () {
      this.page.currentPage = 1
      this.changeCondition()
    },
    //   筛选条件，获取文章列表，条件改变则获取的数据变化
    changeCondition () {
      const params = {
        page: this.page.currentPage, // 如果条件改变 就回到第一页
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },

    // 获取全部文章列表，不按条件
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        // 将总数赋值给total
        this.page.total = result.data.total_count // 总数
      })
    }
  },

  created () {
    this.getChannels()
    this.getArticles()
  }

}
</script>

<style lang='less' scoped>
   .articles {
      .total {
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      // 对文章循环项进行样式的编写
       .article-item {
         display: flex;
         justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
         .left {
           display: flex;
           img {
             width:180px;
             height: 100px;
             border-radius: 4px;
           }
           .info {
             display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
             .date {
               color: #999;
               font-size:12px;
             }
             .tag {
               width: 60px;
               text-align: center;
             }
           }
         }
         .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
         }
       }
   }
</style>
