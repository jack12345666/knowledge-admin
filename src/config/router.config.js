import { BasicLayout, UserLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

export const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/user/Login'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404'),
  },
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/knowledge',
    children: [
      // dashboard
      {
        path: '/knowledge',
        name: 'knowledge',
        component: () => import('@/views/knowledge'),
        meta: { title: '自动问答', keepAlive: true, icon: 'question-circle' },
      },
      // {
      //   path: '/form',
      //   name: 'form',
      //   meta: {
      //     keepAlive: true,
      //     title: 'menu.form.default',
      //     icon: 'question-circle',
      //   },
      //   component: RouteView,
      //   children: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basic-form',
      //       meta: {
      //         keepAlive: true,
      //         icon: 'question-circle',
      //         title: 'menu.form.basicform',
      //       },
      //       component: () => import('../views/form/basic-form'),
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'step-form',
      //       meta: {
      //         keepAlive: true,
      //         icon: 'smile',
      //         title: 'menu.form.stepform',
      //       },
      //       component: () => import('../views/form/step-form'),
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advanced-form',
      //       meta: {
      //         keepAlive: true,
      //         icon: 'smile',
      //         title: 'menu.form.advancedform',
      //       },
      //       component: () => import('../views/form/advanced-form'),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '*', redirect: '/404', hidden: true,
  },
]
