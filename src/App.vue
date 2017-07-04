<template>
  <div id="app" class="mdui-shadow-3">
    <v-header></v-header>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive" id="view"
                     @nowSong="playNow"
                     @addSong="pushNow"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" id="view"
                     @nowSong="playNow"
                     @addSong="pushNow"></router-view>
      <!-- <router-view id="view"
                   @nowSong="playNow"
                   @addSong="pushNow"
        ></router-view> -->
    <v-control :addSong="pushSong" :playSong="playSong"></v-control>
  </div>
</template>

<script type="es6">
  import vHeader from './components/v-header.vue'
  import vControl from './components/v-control.vue'
  export default {
    data(){
      return {
        pushSong: {},
        playSong: {}
      }
    },
    methods: {
      playNow(song){
        this.playSong = song;
      },
      pushNow(song){
        this.pushSong = song;
      },

    },
    components: {
      vHeader,
      vControl
    }
  }
</script>

<style lang="stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 60%;
    border: 1px solid #333;
    margin: 10px auto;
    //background-color #fff;
  }
  #view
    padding: 10px;
    height: 450px;
    overflow: auto;
    color:#000;
    background-color:rgba(7,27,27,0.1);
    &::-webkit-scrollbar
      width: 0;
</style>
