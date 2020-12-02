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
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart/cart.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/order.vue')
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
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/favorite',
    component: () => import('../views/user/user.vue'),
    children: [{
      path: 'favorite',
      name: 'Favorite',
      component: () => import('../views/user/favorite/favorite.vue')
    }, {
      path: 'integral',
      name: 'Integral',
      component: () => import('../views/user/integral/integral.vue')
    }, {
      path: 'myorder',
      name: 'Myorder',
      component: () => import('../views/user/myorder/myorder.vue')
    }, {
      path: 'saleService',
      name: 'SaleService',
      component: () => import('../views/user/saleService/saleService.vue')
    }, {
      path: 'manage',
      name: 'Manage',
      component: () => import('../views/user/manage/manage.vue')
    }, {
      path: 'address',
      name: 'Address',
      component: () => import('../views/user/address/address.vue')
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
