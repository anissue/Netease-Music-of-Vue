<template>
  <div class="playlist-detail">
    <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
    <div class="list" v-if="detail">
      <div class="info mdui-card">
        <div class="cover mdui-card-media">
          <img :src="detail.playlist.coverImgUrl"/>
        </div>

        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">{{detail.playlist.name}}</div>
          <div class="mdui-card-primary-subtitle">播放数：{{detail.playlist.playCount}}</div>
        </div>

        <div class="mdui-card-content">标签：
          <span v-for="tag in detail.playlist.tags">{{tag}}|</span>
        </div>
        <div class="mdui-card-content">{{detail.playlist.description}}</div>
      </div>
      <ul class="mdui-list mdui-list-dense">
        <li class="song mdui-list-item mdui-ripple"
            v-for="(song,index) in detail.playlist.tracks">
          <div class="no mdui-list-item-content">{{index+1}}.</div>
          <div class="songName mdui-list-item-content ">{{song.name}}</div>
          <div class="songArtists mdui-list-item-content">
            <div v-for="artist in song.ar">
              <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
            </div>
          </div>
          <div class="songAlbum mdui-list-item-content">{{song.al.name}}</div>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="addSong(song)">&#xe145;</i>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="nowSong(song)">&#xe037;</i>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="favo(song)">&#xe87e;</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        detail: null,
        loading: false,
        error: null,
        localIndex: 0,
      }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        this.fetchData();
        this.searchLocal();
      },
      fetchData(){
        this.detail = null;
        this.loading = true;
        let url = 'https://api.imjad.cn/cloudmusic/?type=playlist&id=';
        this.$http.get(url + this.$route.params['id']).then(response => {
          this.loading = false;
          this.detail = response.data;
          //console.log(this.detail);
        }, response => {
          console.log('detail error');
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .playlist-detail
    .loading
      width:100%;
      height:100%;
      background-color:#353535;
      text-align:center;
    .list
      display:flex;
      &>ul
        flex:3
        width:100%;
        overflow: auto;
        &::-webkit-scrollbar
          width: 0;
        &>li
          display:flex;
          cursor:default;
          color:rgba(90,90,90,1);
          .no
            flex:1
          .songName
            flex:2
          .songArtists
            flex:2
          .songAlbum
            flex:3
          &>i
            cursor:pointer
      .info
        flex:1;
        text-align:left;
        overflow:hidden;
        height:50%;
        .cover
          width:100%;
          height:180px;
          margin-bottom:20px;
          &>img
            width:100%;
            height:100%;
</style>
