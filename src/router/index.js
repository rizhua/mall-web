import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/item',
    name: 'Item',
    component: () => import('../views/item/item.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/auth.vue'),
    children: [{
      path: 'signIn',
      name: 'SignIn',
      component: () => import('../views/auth/sign-in/sign-in.vue')
    }, {
      path: 'signUp',
      name: 'SignUp',
      component: () => import('../views/auth/sign-up/sign-up.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
