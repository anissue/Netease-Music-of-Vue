<template>
  <ul class="songs">
    <li class="song" v-for="(song,index) in songs">
      <div class="name-section">
        <span class="no" v-show="noFlag">{{specIndex(index)}}</span>
        <i class="icon-heart" v-show="favoFlag" @click="favoSong(song)"></i>
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
      <div v-show="delFlag">
        <i class="deleteSong icon-cross" @click="unfavoSong(song)"></i>
      </div>
    </li>
  </ul>
</template>

<script type="es6">
  export default {
    props: {
      songs: {
        type: Array
      },
      noFlag: {
        type: Boolean,
        default: true,
      },
      dtFlag: {
        type: Boolean,
        default: true,
      },
      favoFlag: {
        type: Boolean,
        default: true,
      },
      delFlag: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      duration(ms) {
        let duration = ms / 1000;
        let min = parseInt(duration / 60);
        let sec = parseInt(duration - min * 60);
        return this.specIndex(min) + ':' + this.specIndex(sec);
      },
      specIndex(i) {
        return i < 10 ? "0" + i : i;
      },
      playSong(song) {
        this.$store.dispatch('playSong', song);
      },
      addSong(song) {
        this.$store.dispatch('addSong', song);
      },
      favoSong(song) {
        this.$store.dispatch('collectFavoSong', song);
      },
      unfavoSong(song) {
        this.$store.dispatch('deleteFavoSong', song);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/style/mixin.styl'
  .songs
    mx_fc(12px, #b0b0b1);
    font-size: 12px;
    text-align: left;
    .song
      mx_flex();
      mx_hlh(45px, 45px);
      .name-section, .artist-section
        mx_flex_item(2);
        mx_single_ellipsis();
        & > i
          margin: 0 12px;
        .no, .songName
          color: #333333;
      .artist-section
      .songAlbum
        mx_flex_item(2);
      .duration
        mx_flex_item(1);
      &:neh-child(odd)
        background-color: #f4f4f6;
</style>
