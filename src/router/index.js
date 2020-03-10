import Vue from 'vue'
import SecondHome from '@/views/home/second_home'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 匹配任何找不到组件的路由
    component: () => import('@/views/404')

  },
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: SecondHome
      },
      {
        path: 'comment',
        // 按需加载
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        // 按需加载
        component: () => import('@/views/material')
      },
      {
        path: 'articles',
        // 按需加载
        component: () => import('@/views/articles')
      },
      {
        path: 'publish/:aticalId?',
        // 按需加载
        component: () => import('@/views/publish')
      },
      {
        path: 'account',
        // 按需加载
        component: () => import('@/views/account')
      }
    ]
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: '/login',
    name: 'logLoginin',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
