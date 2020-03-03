import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import Components from '@/components'
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式
import axios from 'axios'// 引入axios
Vue.use(Components) // 注册开发自定义组件

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui框架 一旦全局注册 所有的位置都可以使用组件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
