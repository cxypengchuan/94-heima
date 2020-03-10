// 导航守卫
import router from '@/router'
import progress from 'nprogress' // 进度条包
import 'nprogress/nprogress.css' // 样式文件
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 应该在全局后置守卫的位置关闭 此时已经完成了路由的跳转

router.afterEach(() => {
  // 处理 进度条关闭的问题
  // setTimeout(() => progress.done(), 300)
  progress.done()
})
