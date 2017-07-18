import Vue from 'vue'
import Vuex from 'vuex'
import manager from './methods'

Vue.use(Vuex)

const state = { //需要共享的数据
    songs: [{
        id: "28661564",
        mp3Url: 'http://orot63356.bkt.clouddn.com/maps.mp3',
        album: {
            "id": 2866276,
            "name": "Maps",
            "picUrl": "https://p1.music.126.net/OC3XXrblVQPgXrkZyLaPow==/3394192437682072.jpg",
            "tns": [],
            "pic": 3394192437682072
        },
        name: 'maps',
        artist: [{ name: "maroon 5", id: "96266" }],
    }], //歌曲列表
    bPlayingSong: {
        id: "28661564",
        album: {
            "id": 2866276,
            "name": "Maps",
            "picUrl": "https://p1.music.126.net/OC3XXrblVQPgXrkZyLaPow==/3394192437682072.jpg",
            "tns": [],
            "pic": 3394192437682072
        },
        name: 'maps',
        artist: [{ name: "maroon 5", id: "96266" }],
    }, //正在播放的歌曲
    playFlag: 0, //当这个flag变化时立刻播放列表第一首歌曲并设置当前歌曲,只有在歌曲列表里点击播放时才会出发，上一曲下一曲列表选中均不会触发
    collectList: [], //收藏的歌单
    favoSongs: [], //我喜欢的歌曲
    scrollPosition: 0, //记录findMusic组件滚动位置 后退时保证上一次滚动状态
}

const mutations = {
    /*初始化:从本地储存中初始化歌单以及收藏的歌曲*/
    INIT(state) {
        if (localStorage.getItem('localList')) {
            state.collectList = [...JSON.parse(localStorage.getItem('localList'))];
        } else {
            state.collectList = [];
        }
        if (localStorage.getItem('localSongs')) {
            state.favoSongs = [...JSON.parse(localStorage.getItem('localSongs'))];
        } else {
            state.favoSongs = [];
        }
    },
    /*单曲部分*/
    PLAY_SONG(state, song) {
        state.bPlayingSong = song;
        state.songs.unshift(song);
        state.playFlag = state.playFlag + 1;
    },
    ADD_SONG(state, song) {
        state.songs.push(song);
        //state.songs = manager.unique(state.songs);//去重,不允许重复添加歌曲
        /*
         上述代码重塑了数组 导致song==bPlayingSong受到影响,
         每次添加歌曲样式丢失
         */
    },
    SET_ACTIVE_SONG(state, song) {
        state.bPlayingSong = song;
    },
    DELETE_SONG(state, song) {
        for (var i = 0; i < state.songs.length; i++) {
            if (state.songs[i] == song) {
                state.songs.splice(i, 1)
            }
        }
    },
    /*歌单部分*/
    PLAYALL(state, playlist) {
        for (let i = 0; i < playlist.length; i++) {
            state.songs.unshift(playlist[i]);
        }
        state.bPlayingSong = playlist[0];
    },
    COLLECT_LIST(state, playlist) {
        state.collectList.push(playlist);
        state.collectList = manager.unique(state.collectList); //去重,不允许重复收藏歌单
        manager.setLocalList(state.collectList);
    },
    DELETE_LIST(state, playlist) {
        for (let i = 0; i < state.collectList.length; i++) {
            let list = state.collectList[i];
            if (list == playlist) {
                state.collectList.splice(i, 1);
            }
        }
        manager.setLocalList(state.collectList);
    },
    /*我喜欢的歌曲*/
    COLLECT_FAVOSONG(state, song) {
        state.favoSongs.push(song);
        state.favoSongs = manager.unique(state.favoSongs); //去重,不允许重复收藏歌曲
        manager.setLocalSongs(state.favoSongs);
    },
    DELETE_FAVOSONG(state, song) {
        for (let i = 0; i < state.favoSongs.length; i++) {
            let list = state.favoSongs[i];
            if (list == song) {
                state.favoSongs.splice(i, 1);
            }
        }
        manager.setLocalSongs(state.favoSongs);
    },
    /*记录滚动位置*/
    SET_SCROLLPOSITION(state, position) {
        state.scrollPosition = position;
    }
}

const actions = {
    /*单曲部分*/
    playSong({ commit }, song) {
        song = manager.handleSong(song); //二次处理歌曲
        commit('PLAY_SONG', song);
    },
    addSong({ commit }, song) {
        song = manager.handleSong(song);
        commit('ADD_SONG', song);
    },
    setActiveSong({ commit }, song) {
        commit('SET_ACTIVE_SONG', song);
    },
    deleteSong({ commit }, song) {
        commit('DELETE_SONG', song);
    },
    /*歌单部分*/
    playall({ commit }, playlist) {
        let slist = []; //直接给数组项赋值改变了数组的长度 无法检测变化
        for (let i = 0; i < playlist.length; i++) {
            Vue.set(slist, i, manager.handleSong(playlist[i]));
        }
        commit('PLAYALL', slist);
    },
    collectList({ commit }, playlist) {
        commit('COLLECT_LIST', playlist);
    },
    deleteList({ commit }, playlist) {
        commit('DELETE_LIST', playlist);
    },
    collectFavoSong({ commit }, song) {
        commit('COLLECT_FAVOSONG', song);
    },
    deleteFavoSong({ commit }, song) {
        commit('DELETE_FAVOSONG', song);
    },
    setScrollPosition({ commit }, position) {
        commit('SET_SCROLLPOSITION', position);
    }
}

const getters = {
    getSongs: state => {
        return state.songs;
    },
    getPlayingSong: state => {
        return state.bPlayingSong;
    },
    getCollectList: state => {
        return state.collectList;
    },
    getScrollPosition: state => {
        return state.scrollPosition;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})