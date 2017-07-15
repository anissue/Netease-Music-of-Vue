<template>
  <div>
    <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
    <ul class="mdui-list mdui-list-dense" v-if="topSongs">
      <li class="song mdui-list-item mdui-ripple"
          v-for="(song,index) in topSongs">
        <div class="no mdui-list-item-content">{{index+1}}.</div>
        <div class="songName mdui-list-item-content ">{{song.name}}</div>
        <div class="songArtists mdui-list-item-content">
          <span v-for="artist in song.ar">
            <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
          </span>
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
</template>

<script type="es6">
  export default {
    data(){
      return {
        loding: false,
        topSongs: null,
      }
    },
    created(){
      this.fetchData();
      this.searchLocal();
    },
    methods: {
      fetchData(){
        this.loading = true;
        let url = 'http://112.74.56.114:8080/NetEaseMusicServer/toplist?id=';
        this.$http.get(url + this.$route.params['id']).then(response => {
          this.loading = false;
          this.topSongs = response.data;
          //console.log(this.topSongs);
        }, response => {
          console.log('detail error');
        })
      },
    },
    watch: {
      '$route' (to, from) {
        this.fetchData();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.song
  display:flex
  .no
    flex:1
  .songName
    flex:3
  .songArtists
    flex:3
  .songAlbum
    flex:3
&>i
  cursor:pointer;
</style>
