<template>
  <div class="toplists">
    <div class="nav mdui-list">
      <li v-for="toplist in toplists" class="mdui-list-item mdui-ripple">
        <img :src="toplist.coverUrl" alt="" class="cover">
        <router-link :to="{path: '/topDetail/' + toplist.id}">{{toplist.name}}</router-link>
      </li>
    </div>
    <div class="topSong">
      <router-view @nowSong="nowSong1"
                   @addSong="addSong1"></router-view>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        toplists: null,
        favoSong:[]
      }
    },
    created(){
      this.fetchData();
      this.searchLocal();
    },
    methods: {
      fetchData(){
        let url = 'http://112.74.56.114:8080/NetEaseMusicServer/fuckzzw';
        this.$http.get(url).then(response => {
          this.toplists = response.data;
          //console.log(this.toplists);
        }, response => {
          console.log('toplist error');
        });
      },
      nowSong1(song){
        this.$emit('nowSong', song);
      },
      addSong1(song){
        this.$emit('addSong', song);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.toplists
  position:relative;
  display:flex;
  .nav
    flex:1;
    display:flex;
    flex-direction:column;
  .topSong
    flex:3;
</style>
