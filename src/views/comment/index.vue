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
    }
  },
  openOrClose (row) {

  },
  created () {
    this.getList()
  }
}
</script>

<style>

</style>
