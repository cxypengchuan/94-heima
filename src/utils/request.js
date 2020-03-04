import axios from 'axios'
import router from '@/router'
axios.defaults.baseURL = ('http://ttapi.research.itcast.cn/mp/v1_0') // 配置公共的请求头地址
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
