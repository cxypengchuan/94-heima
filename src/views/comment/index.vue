<template>
<el-card>
    <bread-crumb slot='header'>
    <template slot='title'>
        评论管理
    </template>
    </bread-crumb>
<!-- 列表组件 -->
<el-table :data='list'>
    <!-- prop填入数据 leble列名 -->
   <el-table-column prop="title" label="标题" width="700"></el-table-column>
   <el-table-column :formatter='formatterBool' prop="comment_status" label="评论状态" ></el-table-column>
   <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
   <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
   <el-table-column prop="" label="操作">
        <template slot-scope="obj">
            <el-button size="small" type='text'>修改</el-button>
             <!-- 文本内容要根据 当前行里面的评论状态决定显示还是隐藏 -->
            <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
          </template>
   </el-table-column>
</el-table>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 组件不显示布尔值内容 ，需要定义一个格式化的函数转化其值
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    getList () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }

      }).then((res) => {
        this.list = res.data.results
      })
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
      // 调用打开或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
          // 为什么评论会失败 就是因为 原来 给你传了 9152 你回传了 9200
          // 所以我们用大数字包 保证 9152不被转化 就可以使用原来的功能
            article_id: row.id.toString() // 要求参数的文章id 将 BigNumber类型转化成字符串
          // 前端传字符串到后端 只要和原数字一致  后端会自动将字符串转成大数字
          // 只需要保证 id 和传过来的id一致就行
          },
          data: {
          //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
        //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getList() // 调用重新拉取数据的方法
        }).catch(() => {
        //   表示失败了 会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },

  created () {
    this.getList()
  }
}
</script>

<style>

</style>
