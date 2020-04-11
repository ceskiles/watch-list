import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WatchList from '../views/WatchList.vue'
import Submission from '../views/Submission'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-list',
    name: 'WatchList',
    component: WatchList
  },
  {
    path: '/submit',
    name: 'Submission',
    component: Submission
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
