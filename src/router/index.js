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
    path: '/city',
    component: () => import('@/components/part/choseCity'),
    hidden: true
  },
  {
    path: '/hello',
    component: () => import('@/components/HelloWorld.vue'),
    hidden: true
  },
  {
    path: '/base',
    // redirect: 'welcome',
    component: () => import('@/components/main/base'),
    hidden: true,
    children: [
      {
        path: '/',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        component: () => import('@/components/part/welcome')
      },
      {
        path: '/ResumeReport',
        component: () => import('@/components/sys/ResumeReport')
      },
      {
        path: '/RecruitReport',
        component: () => import('@/components/sys/RecruitReport')
      },
      {
        path: '/RecruitPublish',
        component: () => import('@/components/sys/RecruitPublish')
      }
    ]
  },
  // 一个router可以看成是一个对象
  {
    path: '/login',
    component: () => import('@/components/main/login'),
    hidden: true
  }
  // {
  //   path: '/table',
  //   component: () => import('@/components/table/resumetable'),
  //   hidden: true
  // }
  // {
  //   path: '/resume',
  //   component: () => import('@/components/report/ResumeReport'),
  //   meta: {
  //     requireAuth: true
  //     // 添加该字段，表示进入这个路由是需要登录的
  //   }
  // }
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
