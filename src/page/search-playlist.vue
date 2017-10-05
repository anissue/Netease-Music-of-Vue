<template>
  <div class="searchPlaylist" ref="index" @scroll="scrollMore('index','searchPlaylist')">
    <ul class="playlists">
      <li class="playlist" v-for="playlist in searchRes">
        <router-link :to="{path: '/playlistDetail' ,query:{id: playlist.id}}">
          <img class="cover" :src="playlist.coverImgUrl">
          <span class="name">{{playlist.name}}</span>
          <span class="count">{{playlist.trackCount}} 首</span>
          <span class="author">by {{playlist.creator.nickname}}</span>
          <span class="playCount">播放：{{playlist.playCount}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        searchRes: [],
        ajaxFlag: 1,
        limit: 20,
        offset: 1,
      }
    },
    created() {
      this.fetchData(this.limit, this.offset, "searchPlaylist");
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.searchPlaylist
  font-size:13px;
  .playlists
    width:100%;
    .playlist
      width:100%;
      height:70px;
      text-align:left;
      overflow:hidden;
      &>a
        display:flex;
        align-items:center;
        height:70px;
        padding:10px;
        box-sizing:border-box;
        cursor:default;
        .cover
          width:50px;
          height:50px;
          margin-right:5px;
        .name
          flex:1;
          color:#5584b2;
        .count
          flex:1;
        .author
          flex:1;
        .playCount
          flex:1;
      &:nth-child(odd)
        background-color:#f4f4f6;
</style>
