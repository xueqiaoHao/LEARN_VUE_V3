import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/hello',
    component: () => import('@/components/HelloWorld.vue'),
    hidden: true
  },
  {
    path: '/base',
    component: () => import('@/components/main/base'),
    hidden: true
  },
  // 一个router可以看成是一个对象
  {
    path: '/login',
    component: () => import('@/components/main/login'),
    hidden: true
  },
  {
    path: '/table',
    component: () => import('@/components/table/resumetable'),
    hidden: true
  },
  {
    path: '/resume',
    component: () => import('@/components/report/ResumeReport'),
    meta: {
      requireAuth: true
      // 添加该字段，表示进入这个路由是需要登录的
    }
  }
]
// eslint-disable-next-line no-undef
const router = new VueRouter({
  routes
})
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  // 判断该路径是否需要登录权限
  // if (to.matched.some(r => r.meta.requireAuth)) {
  //   // 通过vuexstate 获取当前的token是否存在
  //   if (store.state.token) {
  //     next()
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {redirect: to.fullPath}
  //     })
  //   }
  // } else {
  //   next()
  // }
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
