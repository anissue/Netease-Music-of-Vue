<template>
  <div class="searchSong" ref="index" @scroll="scrollMore('index','searchSong')">
    <songList :noFlag="false" :songs="searchRes"></songList>
  </div>
</template>

<script type="es6">
  import songList from '../components/song-list.vue'
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
      this.fetchData(this.limit, this.offset, "searchSong");
    },
    watch: {
      '$route' (to, from) {
        this.searchRes = [];
        this.offset = 1;
        this.fetchData(this.limit, this.offset, "searchSong");
      }
    },
    components: {
      songList,
    }
  }
</script>
