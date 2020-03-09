<template>
  <el-card>
    <bread-crumb slot='header'>
    <template slot='title'>
        发布文章
    </template>
    </bread-crumb>
 <el-form ref="myForm" style="margin-left:50px" label-width="100px" :model="publishForm" :rules="publishRules">
        <el-form-item label="标题" prop="title">
          <!-- 输入框 -->
          <el-input placeholder="请输入您的标题" style="width:60%" v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 多行输入 -->
          <el-input placeholder="请输入您的内容" type='textarea' :rows="4" v-model="publishForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <!-- 单选框组 -->
          <el-radio-group v-model="publishForm.cover.type">
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <!-- select选择器 -->
          <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <el-button type='primary' @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        },
        channel_id: null // 频道id
      },

      //   表单校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //   通过id显示文章详情
    grtaticalById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then((res) => {
        this.publishForm = res.data
      })
    },
    //   发布
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        // 校验成功。调用发布接口
        const { aticalId } = this.$route.params
        this.$axios({
          url: aticalId ? `/articles/${aticalId}` : '/articles',
          method: aticalId ? 'put' : 'post',
          params: { draft },
          data: this.publishForm
        }).then(() => {
          this.$message.success('发布成功')
          this.$router.push('/home/articles')// 跳到文章列表
        }).catch(() => {
          this.$message.error('发布失败！')
        })
      })
    },
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getchannels()
    const { aticalId } = this.$route.params // articleId是 路由参数中定义的
    if (aticalId) {
      this.grtaticalById(aticalId)
    }
    // 另一种方法
    // aticalId && this.grtaticalById(aticalId)// 与语法，前面的表达式返回true，则执行后面的代码
  }
}
</script>

<style>

</style>
