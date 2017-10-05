<template>
  <div id="app">
    <v-header></v-header>
    <div class="container">
      <slide-menu></slide-menu>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" id="view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" id="view"></router-view>
    </div>
    <v-control></v-control>
  </div>
</template>

<script type="es6">
  import vHeader from './components/header.vue'
  import vControl from './components/v-control.vue'
  import slideMenu from './components/slide-menu.vue'

  export default {
    created() {
      this.$store.commit('INIT');
    },
    components: {
      vHeader,
      vControl,
      slideMenu,
    }
  }
</script>

<style lang="stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .container
    display: flex;
    position: absolute;
    top: 30px;
    bottom: 60px;
    width: 100%;
    overflow: auto;
    #view
      flex: 1;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      color: #000;
      background-color: #fafafc;
</style>
