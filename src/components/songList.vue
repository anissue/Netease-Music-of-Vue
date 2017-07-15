<template>
  <ul class="songs">
    <li class="song" v-for="(song,index) in songs">
      <div class="name-section">
        <span class="no" v-show="noFlag">{{specIndex(index)}}</span>
        <i class="icon-heart"></i>
        <span class="songName">{{song.name}}</span>
      </div>

      <div class="artist-section">
        <i class="icon-plus" @click="addSong(song)"></i>
        <i class="icon-play3" @click="playSong(song)"></i>
            <span class="songArtists">
              <span v-for="artist in song.ar">
                <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
              </span>
            </span>
      </div>
      <div class="songAlbum">{{song.al.name}}</div>
      <div class="duration" v-show="dtFlag">{{duration(song.dt)}}</div>
    </li>
  </ul>
</template>

<script type="es6">
  export default{
    props: {
      songs: {
        type: Array
      },
      noFlag:{
        type:Boolean,
        default:true,
      },
      dtFlag:{
        type:Boolean,
        default:true,
      }
    },
    methods: {
      duration(ms){
        let duration = ms / 1000;
        let min = parseInt(duration / 60);
        let sec = parseInt(duration - min * 60);
        if (sec < 10) {
          sec = '0' + sec;
        }
        return min + ':' + sec;
      },
      specIndex(i){
        if (i < 10) {
          return "0" + i;
        } else {
          return i;
        }
      },
      playSong(song){
        this.$store.dispatch('playSong', song);
      },
      addSong(song){
        this.$store.dispatch('addSong', song);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.songs
  font-size:12px;
  text-align:left;
  .song
    display:flex;
    height:45px;
    line-height:45px;
    color:#b0b0b1;
    .name-section,.artist-section
      flex:2
      overflow:hidden;
      text-overflow:ellipsis;
      &>i
        margin:0 12px;
      .no,.songName
        color:#333333;
    .artist-section
    .songAlbum
      flex:2;
    .duration
      flex:1;
    &:neh-child(odd)
      background-color:#f4f4f6;
</style>
