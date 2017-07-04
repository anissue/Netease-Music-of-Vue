import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import toplist from '../components/toplist.vue'
import search from '../components/search.vue'
import playlist from '../components/playlist.vue'
import artist from '../components/artist.vue'
import favo from '../components/favo.vue'
import topDetail from '../components/top-detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
      meta: {
          keepAlive: true
      }
    },
    {
      path: '/favo',
      component: favo,
      meta: {
          keepAlive: false
      }
    },
    {
      path: '/home',
      component: home,
      meta: {
          keepAlive: true
      }
    },
    {
      path:'/playlist/:id',
      component: playlist,
      meta: {
          keepAlive: false
      }
    },
    {
      path: '/toplist',
      component: toplist,
      children: [
        {
          path: '/',
          redirect: '/topDetail/19723756'
        },
        {
          path: '/topDetail/:id',
          component: topDetail,
        }
      ],
      meta: {
          keepAlive: true
      },
    },
    {
      path: '/search',
      component: search,
      meta: {
          keepAlive: true
      }
    },
    {
      path: '/artist/:id',
      component: artist,
      meta: {
          keepAlive: false
      }
    }
  ]
})
