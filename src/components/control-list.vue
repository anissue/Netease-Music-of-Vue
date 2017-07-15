<template>
  <ul class="controlList">
    <div class="head">
      <div class="head-one">播放列表</div>
      <div class="head-two">收藏全部</div>
      <div class="head-three">清空</div>
    </div>
    <li v-for="(song,index) in songs"
        class="song"
        :class="{active:song==bPlayingSong}">
      <div class="songName"
           @click="changeSong({index:index})">{{song.name}}
      </div>
      <div class="songSinger">
            <span v-for="artist in song.artist">
              <router-link :to="{path: '/artist/' + artist.id}">{{artist.name+" "}}</router-link>
            </span>
      </div>
      <div>
        <i class="deleteSong icon-cross"
           @click="deleteSong(song)"></i>
      </div>
    </li>
  </ul>
</template>

<script type="es6">
  import Vue from 'vue'
  export default{
    props: {
      songs: {
        type: Array
      },
    },
    computed:{
      bPlayingSong(){
        return this.$store.state.bPlayingSong;
      }
    },
    methods:{
      changeSong(config){
        this.$emit("changeSong",config);
      },
      deleteSong(song){
        this.$store.dispatch('deleteSong', song);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.controlList
  background-color:#fff;
  float:right;
  position:absolute;
  bottom:50px;
  right:0;
  width:475px;
  height:430px;
  font-size:12px;
  text-align:left;
  border: 1px solid rgba(7,17,27,0.1);
  overflow:auto;
  .head
    display:flex;
    height:40px;
    line-height:40px;
    font-size:14px;
    border-bottom:1px solid rgba(7,17,27,0.2);
    &>div
      cursor:default;
    .head-one
      flex:3;
      padding-left:30px;
    .head-two
      flex:2;
    .head-three
      flex:1;
  &>li
    display:flex;
    padding:0 30px;
    height:45px;
    line-height:45px;
    .songName
      flex:3;
      cursor:pointer;
      overflow:hidden;
      text-overflow:ellipsis;
    .songSinger
      flex:2;
      overflow:hidden;
      text-overflow:ellipsis;
    .deleteSong
      flex:1;
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
      position: absolute;
      left: 0;
      top:50%;
      transform: translate(0,-50%);
      display: block;
      content:"";
      background-color: #df3b3b;
      height:30px;
      width: 3px;
</style>
