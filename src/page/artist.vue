<template>
  <div class="artistInfo">
    <loading v-if="loading"></loading>

    <h4>歌手</h4>

    <div class="info" v-if="artistInfo">

      <div class="avatar">
        <img :src="artistInfo.artist.img1v1Url" alt=""/>
      </div>

      <div class="num">
        <span class="name">{{artistInfo.artist.name || "暂无"}}</span>
        <span><i class="icon-music"></i>歌曲数:{{artistInfo.artist.musicSize}}</span>
        <span><i class="icon-shocked"></i>专辑数:{{artistInfo.artist.albumSize}}</span>
        <span><i class="icon-film"></i>MV数:{{artistInfo.artist.mvSize}}</span>
      </div>

      <div class="des">
        <p>{{artistInfo.artist.briefDesc || "暂无"}}</p>
      </div>

    </div>

    <p class="playAll" @click="playAll">热门50:播放全部</p>
    <songList :songs="artistInfo.hotSongs" v-if="artistInfo"></songList>
    <!-- <img v-if="artistInfo" :src="artistInfo.artist.img1v1Url" class="bg"> -->
  </div>
</template>

<script type="es6">
  import loading from '../components/loading.vue'
  import songList from '../components/song-list.vue'

  export default {
    data() {
      return {
        artistInfo: null,
        loading: false,
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true;
        if (this.$route.params['id'] == 0) {
          alert('暂无该歌手信息');
        }
        const URL = 'https://api.imjad.cn/cloudmusic/?type=artist&id=';
        this.$http.get(URL + this.$route.params['id']).then(response => {
          this.loading = false;
          this.artistInfo = response.data;
          //console.log(this.artistInfo);
        }, response => {
          console.log('artistInfo error');
        });
      },
      playAll() {
        this.$store.dispatch('playall', this.detail.playlist.tracks);
      },
    },
    watch: {
      '$route'(to, from) {
        this.fetchData();
      }
    },
    components: {
      songList,
      loading,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/style/mixin.styl'
  .artistInfo
    mx_pagepadding();
    .bg
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 180px;
      z-index: 1;
      filter: blur(30px);
      opacity: 0.2;
    .info
      display: flex;
      margin-bottom: 20px;
      .avatar
        flex: 0 0 200px;
        width: 200px;
        height: 200px;
        margin-right: 20px;
        position: relative;
        & > img
          width: 100%;
          height: 100%;
      .num
        flex: 1;
        margin-top: 4px;
        padding: 10px;
        .name
          margin-bottom: 45px;
          font-size: 18px;
        & > span
          display: block;
          margin-bottom: 20px;
          font-size: 12px;
          letter-spacing: 1px;
      .des
        flex: 8;
        padding-top: 40px;
        font-size: 14px;
        line-height: 25px;
    .playAll
      font-size: 15px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
</style>
