import Vue from 'vue'
import Router from 'vue-router'

import findMusic from '../page/findMusic.vue'
import recommend from '../page/findmusic/recommend.vue'
import playlist from '../page/findmusic/playlist.vue'
import playlistDetail from '../page/playlist-detail.vue'
import search from '../page/search.vue'
import searchSong from '../page/search/searchSong.vue'
import searchArtist from '../page/search/searchArtist.vue'
import searchPlaylist from '../page/search/searchPlaylist.vue'
import artist from '../page/artist.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
  	{
  		path:'/',
  		redirect:'/findMusic',
  	},
    {
      path: '/findMusic',
      component: findMusic,
      children: [
        {
          path: '/special',
          component: recommend,
          meta: {
            keepAlive: true
          },
        },
        {
          path: '/',
          redirect:'/playlist'
        },
        {
          path: '/playlist',
          component: playlist,
          meta: {
            keepAlive: true
          },
        },
      ],
    },
    {
      path: '/playlistDetail',
      component: playlistDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/collectList',
      component: playlistDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/artist/:id',
      component: artist,
      meta: {
          keepAlive: false
      }
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: '/search/song',
          component: searchSong,
          meta: {
            keepAlive: false
          },
        },
        {
          path: 'artist',
          component: searchArtist,
          meta: {
            keepAlive: false
          },
        },
        {
          path: 'playlist',
          component: searchPlaylist,
          meta: {
            keepAlive: false
          },
        },
      ],
    },]
})
