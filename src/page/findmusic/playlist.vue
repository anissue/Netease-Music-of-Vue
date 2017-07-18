<template>
  <div id="listindex" ref="index" @scroll="scrollMore">
    <ul class="playlists">
      <li class="playlist" v-for="playlist in playlists">
        <div class="cover">
          <router-link :to="{path: 'playlistDetail' ,query:{id: playlist.id}}"><img :src="playlist.imgUrl" /></router-link>
        </div>
        <p class="title">{{playlist.title}}</p>
  
        <p class="creator">by {{playlist.creator}} </p>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        playlists: [],
        index: 0,
        limit: 24,
        loading: false,
        ajaxFlag: 1,
      }
    },
    computed: {
      lastPosition() {
        return this.$store.getters.getScrollPosition;
      }
    },
    created() {
      this.fetchPlaylist(this.limit, this.index);
    },
    methods: {
      fetchPlaylist(limit, page) {
        let playlistApi = "http://112.74.56.114:8080/NetEaseMusicServer/index?limit=";
        let api = playlistApi + limit + "&pagenum=" + page;
        this.$http.get(api).then(response => {
          this.playlists = [...this.playlists, ...response.data];
          this.index = this.index + 1;
          this.ajaxFlag = 1;
        }, response => {
          console.log('playlists error');
        });
      },
      scrollMore() { //滚动到底部加载更多
        let scroll = this.$refs.index.scrollTop;
        let visiHeight = this.$refs.index.clientHeight;
        let fullHeight = this.$refs.index.scrollHeight;
        if (scroll + visiHeight >= fullHeight && this.ajaxFlag === 1) {
          this.fetchPlaylist(this.limit, this.index);
          this.ajaxFlag = 0;
        }
      },
    },
    beforeRouteLeave(to, from, next) { //离开时将滚动条位置记录进vuex
      let position = this.$refs.index.scrollTop;
      this.$store.dispatch('setScrollPosition', position);
      //console.log(position);
      next();
    },
    beforeRouteEnter(to, from, next) { //复位滚动条,enter之前无法使用this只有通过回调
      next(vm => {
        //console.log(vm.lastPosition);
        vm.$refs.index.scrollTop = vm.lastPosition;
      })
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .playlists
    display:flex;
    flex-wrap:wrap;
    aligin-items:center;
    margin-left:60px;
    text-align:left;
    .playlist
      width:145px;
      height:200px;
      margin-right:20px;
      margin-bottom:30px;
      overflow:hidden;
      cursor:default;
      .cover
        width:100%;
        height:145px;
        margin-bottom:10px;
      .title
        height:16px;
        font-size :16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-overflow:ellipsis;
        margin-bottom:10px;
      .creator
        color:#a4a4a5;
        font-size:12px;
        text-align:left;
</style>
