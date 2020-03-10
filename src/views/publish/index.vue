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
          <!-- <el-input placeholder="请输入您的内容" type='textarea' :rows="4" v-model="publishForm.content"></el-input> -->
        <quill-editor v-model="publishForm.content" style="height:300px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:150px">
          <!-- 单选框组 -->
          <el-radio-group v-model="publishForm.cover.type" @change="changeType">
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 放置封面组件 -->
        <cover-image :list='publishForm.cover.images'  @selectTwoImg="receiveImg"></cover-image>
        <el-form-item label="频道" prop="channel_id">
          <!-- select选择器 -->
          <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <el-button  type='primary' @click="publish(false)">发表</el-button>
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
    // 接收cover-image传递过来的数据
    receiveImg (url, index) {
      // 接收到了 传递过来的封面数据
      // 接下来需要更新 images数组
      // but!!!!  仅仅拿到了一个url地址, 但是images可能有1条 可能有3条 单单有地址 并不足以 知道要更新哪一条记录
      //  有索引 有 url了 可以改变 数据了
      this.publishForm.cover.images.splice(index, 1, url) // 删除替换元素
      // splice(索引, 要删除的个数, 替换的个数)
    },
    // 改变封面数量
    changeType () {
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = []
      }
    },

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
  // 如果你想要捕捉路由参数的变化, 我们可以采用watch来监听 $route
  watch: {
    // watch是监听data中的数据变化
    // 路由在初始化之后 会把$route也放置在 页面data中
    $route: function (to, from) {
      // 监听$route的变化
      // to表示新的路由地址对象
      // from表示旧的路由地址对象
      console.log(to) // 打印一下to属性
      // 根据to属性中的 params的articleId的变化 来决定 是不是改变数据
      // 如果有articleId  应该获取编辑文章的数据
      // 如果没有articleId 应该将表单数据设置为空
      if (to.params.articleId) {
        // 如果id存在 应该获取文章数据
        // 获取数据
        this.getArticleById(to.params.articleId) // 获取文章id
      } else {
        // 如果不存在 应该 设置表单数据为空
        // 如果是发布文章 就设置为空对象
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
            images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
          },
          channel_id: null // 频道id
        }
      }
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
