import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from '@/firebase'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/account-information',
    name: 'AccountInformation',
    component: () => import(/* webpackChunkName: "account-information" */ '@/components/AccountInformation.vue'),
    meta: {
      isAuthenticated: true
    }
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthenticated)) {
      if (store.state.user.userUID != null) {
          next()
      } else {
          firebase.auth.onAuthStateChanged((firebaseUser) => {
              if (firebaseUser != null) {
                  next()
              } else {
                  next('/')
              }
          })
      }
  } else {
      next()
  }
})

export default router
