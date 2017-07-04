<template>
  <div class="artistInfo">
    <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
    <div class="info" v-if="artistInfo">
      <div class="avatar">
        <img :src="artistInfo.artist.img1v1Url" alt=""/>

        <div class="num">
          <span>歌曲数:{{artistInfo.artist.musicSize}}</span>
          <span>专辑数:{{artistInfo.artist.albumSize}}</span>
          <span>MV数:{{artistInfo.artist.mvSize}}</span>
        </div>
      </div>
      <div class="desc">
        <span class="name">{{artistInfo.artist.name||"暂无"}}</span>
        <span class="alias"
              v-for="alia in artistInfo.artist.alias">|{{alia}}</span>

        <h2>简介:</h2>

        <div class="briefDesc">
          {{artistInfo.artist.briefDesc ||"暂无" }}
        </div>
      </div>
    </div>
    <div class="hotSongs" v-if="artistInfo">
      <ul class="mdui-list mdui-list-dense">
        <li class="song mdui-list-item mdui-ripple"
            v-for="(song,index) in artistInfo.hotSongs">
          <div class="no mdui-list-item-content">{{index+1}}.</div>
          <div class="songName mdui-list-item-content ">{{song.name}}</div>
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
        artistInfo: null,
        loading: false,
      }
    },
    created(){
      this.fetchData();
      this.searchLocal();
    },
    methods: {
      fetchData(){
        this.loading = true;
        if (this.$route.params['id'] == 0) {
          alert('暂无该歌手信息');
        }
        let url = 'https://api.imjad.cn/cloudmusic/?type=artist&id=';
        this.$http.get(url + this.$route.params['id']).then(response => {
          this.loading = false;
          this.artistInfo = response.data;
          //console.log(this.artistInfo);
        }, response => {
          console.log('artistInfo error');
        });
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
.artistInfo
  text-align:left;
  .loading
    width:100%;
    height:100%;
    background-color:#353535;
    text-align:center;
  .info
    display:flex;
    .avatar
      flex:3
      overflow:hidden;
      text-align:center;
      &>img
        width:200px;
        height:200px;
      .num
        text-align:center;
        font-size:12px;
    .desc
      flex:7
      padding-left:20px;
      .name
        color:#222;
        font-size:28px;
      .subdesc
        color:#999
        font-size:10px;
        line-height:12px;
      &>h2
        text-align:left;
        margin: 28px 0 8px 0;
        color: #333;
        font-size: 14px;
      .briefDesc
        font-size:12px;
        line-height: 25px;
        color: #666;
        text-indent: 2em;
  .hotSongs
    .song
      display:flex;
      cursor:default;
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
</style>
