import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint' // 引入地方处理大数字的包
axios.defaults.baseURL = ('http://ttapi.research.itcast.cn/mp/v1_0') // 配置公共的请求头地址
// 处理大数字
axios.defaults.transformResponse = [function (data) {
  // 这里主要处理 id 超过 大数字的时候  转化 不正确的问题  JSONBig.parse是第三方的包 内部怎么实现的,我们不需要关心
  // 只需要知道它可以帮助我们 转化正确
  // const result = JSON.parse(data)
  // return result
  // 用json-bigint的转化来做
  // 这里需要判断一下 data 是不是为空 如果为空就不能转化了
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器开发
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user-token')// 在缓存中拿到token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  // 注入token后把请求到的数据返回出去
  return config
}, function (error) {
  return Promise.reject(error)
}
)
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数 是响应体
  // 在拦截器中 需要将数据返回  将数据进行解构
  // 如过请求到数据就返回出去，没有就返回一个空数组，
  return response.data ? response.data : {}
}, function (error) {
  // 如果请求到的错误状态码是402，那么就是钥匙不对/失效/过期，则需要返回去重拿钥匙，并且先删除错误的钥匙
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
