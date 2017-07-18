<template>
  <ul class="controlList">
    <div class="head">
      <div class="head-one">播放列表</div>
      <div class="head-two">收藏全部</div>
      <div class="head-three">清空</div>
    </div>
    <li v-for="(song,index) in songs" class="song" :class="{active:song==bPlayingSong}">
      <div class="songName" @click="changeSong({index:index})">{{song.name}}
      </div>
      <div class="songSinger">
        <span v-for="artist in song.artist">
                <router-link :to="{path: '/artist/' + artist.id}">{{artist.name+" "}}</router-link>
              </span>
      </div>
      <div>
        <i class="deleteSong icon-cross" @click="deleteSong(song)"></i>
      </div>
    </li>
  </ul>
</template>

<script type="es6">
  import Vue from 'vue'
  export default {
    props: {
      songs: {
        type: Array
      },
    },
    computed: {
      bPlayingSong() {
        return this.$store.state.bPlayingSong;
      }
    },
    methods: {
      changeSong(config) {
        this.$emit("changeSong", config);
      },
      deleteSong(song) {
        this.$store.dispatch('deleteSong', song);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
.controlList
  mx_pofbr(50px,0);
  mx_wh(475px,430px);
  background-color:#fff;
  z-index:999;
  font-size:12px;
  text-align:left;
  border: 1px solid rgba(7,17,27,0.1);
  overflow:auto;
  .head
    mx_flex();
    mx_hlh(40px,40px);
    font-size:14px;
    border-bottom:1px solid rgba(7,17,27,0.2);
    &>div
      cursor:default;
    .head-one
      mx_flex_item(3);
      padding-left:30px;
    .head-two
      mx_flex_item(2);
    .head-three
      mx_flex_item(1);
  &>li
    mx_flex();
    mx_hlh(45px,45px);
    padding:0 30px;
    .songName
      mx_flex_item(3);
      mx_single_ellipsis();
      cursor:pointer;
    .songSinger
      mx_flex_item(2);
      mx_single_ellipsis();
    .deleteSong
      mx_flex_item(1);
      color:#b7b7b8;
    &:hover
      background-color :#e8e8eb;
    &.active
      position: relative;
      .songName,.deleteSong
        color:#df3b3b;
      .songSinger
        &>span
          &>a
            color:#df3b3b;
    &.active:before
      mx_wh(3px,30px);
      mx_postl(50%,0);
      transform: translate(0,-50%);
      display: block;
      content:"";
      background-color: #df3b3b;
</style>
