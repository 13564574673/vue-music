import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('@/components/recommend/Recommend')
const Singer = () => import('@/components/singer/Singer')
const Rank = () => import('@/components/rank/Rank')
const Search = () => import('@/components/search/Search')

Vue.use(VueRouter)
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
