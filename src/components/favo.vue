<template>
  <div class="favo">
    <h2>大宝贝儿</h2>

    <p class="msg" v-if="favoSong&&favoSong.length==0">您还没有喜欢的歌曲哦~</p>
    <ul class="mdui-list">
      <li class="song mdui-list-item mdui-ripple"
          v-for="(song,index) in favoSong">
        <div class="mdui-list-item-avatar"><img :src="song.al.picUrl"/></div>
        <div class="name mdui-list-item-content"
             @click="nowSong(song)">{{song.name}}
        </div>
        <div class="mdui-list-item-content">
        <span v-for="artist in song.ar">
          <router-link :to="{path: '/artist/' + artist.id}">{{artist.name+" "}}</router-link>
        </span>
        </div>
        <i class="deleteSong mdui-list-item-icon mdui-icon material-icons"
           @click="deleteFavo(index)">&#xe5cd;</i>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        loading: false,
        favoSong:[]
      }
    },
    created(){
      this.searchLocal();
    },
    methods: {
      deleteFavo(index){
        this.favoSong.splice(index, 1);
        let favoSongStr = JSON.stringify(this.favoSong);
        localStorage.setItem('favoSong', favoSongStr);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.favo
  &>h2
    color:gray;
    text-align:left;
  .msg
    width:100%;
    height:100%;
    transform:translate(0,200px);
  .mdui-list
    .song
      display:flex;
      color:white;
      cursor:default;
      color:#000;
      &>div
        flex:1;
      .name,.deleteSong
        cursor:pointer;
</style>
