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
    path: '/layout',
    component: () => import('@/components/part/layout'),
    hidden: true
  },
  {
    path: '/hello',
    component: () => import('@/components/main/show.vue'),
    hidden: true
  },
  {
    path: '/main',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/main/main'),
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
        path: '/ResumeDelivered',
        component: () => import('@/components/sys/ResumeDelivered')
      },
      {
        path: '/ResumeCreate',
        component: () => import('@/components/sys/ResumeCreate')
      },
      {
        path: '/RecruitReport',
        component: () => import('@/components/sys/RecruitReport')
      },
      {
        path: '/RecruitPublish',
        component: () => import('@/components/sys/RecruitPublish')
      },
      {
        path: '/RecruitAnalyse',
        component: () => import('@/components/sys/RecruitAnalyse')
      },
      {
        path: '/AccountManage',
        component: () => import('@/components/sys/AccountManage')
      },
      {
        path: '/SignedState',
        component: () => import('@/components/sys/signState')
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
  //   path: '/main',
  //   component: () => import('@/components/main/main'),
  //   hidden: true
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
  if (to.meta.requireAuth) {
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
  } else {
    next()
  }
})

export default router
