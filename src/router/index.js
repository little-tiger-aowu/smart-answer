import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
    // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
    //重定向
  {path: '/',redirect:'/login'},
    // 答题页面
  {
    path: '/topic',
    name: 'topic',
    component:() => import('../views/topic')
  },
    // 结算
  {
    path: '/settlement',
    name: 'settlement',
    component:() => import('../views/settlement')
  },
    // 抽奖
  {
    path: '/lottery',
    name:'lottery',
    component:() => import('../views/lottery')
  },
    // 表单
  {
    path: '/form',
    name: 'form',
    component:() => import('../views/form')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   let openId = VueCookies.get("openId")
//     if (openId) {
//       next()
//     } else {
//       if (to.path === '/' || to.path === '/login') { //这就是跳出循环的关键
//         next()
//       } else {
//         next('/')
//       }
//   }
// })

export default router
