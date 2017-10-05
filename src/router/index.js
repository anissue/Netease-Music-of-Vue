import Vue from 'vue'
import Router from 'vue-router'

import findMusic from '../page/findMusic.vue'
import recommend from '../page/recommend.vue'
import playlist from '../page/playlist.vue'
import playlistDetail from '../page/playlist-detail.vue'
import search from '../page/search.vue'
import searchSong from '../page/search-song.vue'
import searchArtist from '../page/search-artist.vue'
import searchPlaylist from '../page/search-playlist.vue'
import artist from '../page/artist.vue'
import toplist from '../page/toplist.vue'
import favo from '../page/favo.vue'
import about from '../page/about.vue'
Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            redirect: '/findMusic',
        },
        {
            path: '/findMusic',
            component: findMusic,
            children: [{
                    path: '/special',
                    component: recommend,
                    meta: {
                        keepAlive: true
                    },
                },
                {
                    path: '/',
                    redirect: '/playlist'
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
            path: '/toplist',
            component: toplist,
            meta: {
                keepAlive: false
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
            path: '/about',
            component: about,
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
            children: [{
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
        },
    ]
})
