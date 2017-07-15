<template>
<div class="search">
  <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
  <div class="searchBar">
    <input class="searchBar" @keyup.enter="search" type="text" placeholder="搜索音乐、歌手、歌词、用户" v-model="message">
    <i class="icon-search" @click="search"></i>
  </div>
  <nav class="nav">
    <ul class="links">
      <li>
        <router-link :to="{path: '/search/song' ,query:{key: message}}">单曲</router-link>
      </li>
      <li>
        <router-link :to="{path: '/search/artist' ,query:{key: message}}">歌手</router-link>
      </li>
      <li>
        <router-link :to="{path: 'playlist' ,query:{key: message}}">歌单</router-link>
      </li>
      <li>
        <router-link to="/search/album">专辑</router-link>
      </li>
      <li>
        <router-link to="/search/mv">MV</router-link>
      </li>
      <li>
        <router-link to="/search/dj">主播电台</router-link>
      </li>
      <li>
        <router-link to="/search/user">用户</router-link>
      </li>
    </ul>
  </nav>
  <keep-alive>
    <router-view class="children" v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view class="children" v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        message: "",
        loading: false,
        index: 0,
      }
    },
    created(){
    },
    methods: {
      search(){
        this.$router.push({path: '/search/song' ,query:{key: this.message}});
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search
  position:relative;
  padding:20px 25px;
  .searchBar
    width:100%;
    height:45px;
    color:#cccccc;
    position:relative;
    &>input
      position absolute
      left:0;
      top:0;
      box-sizing border-box
      width:95%;
      height:45px;
      font-size:15px;
      padding:5px;
      border 1px solid #cccccc
      border-right:none;
      &:focus
        color:#000;
    &>i
      position:absolute;
      right:0;
      top:0;
      width:5%;
      box-sizing:border-box;
      display:inline-block;
      height:45px;
      line-height:45px;
      border 1px solid #cccccc
      border-left:none;
      font-size:18px;
  .nav
    position:absolute;
    left:30px;
    top:90px;
    width:95%;
    overflow:hidden;
    border-bottom:1px solid rgba(7,17,27,0.2);
    .links
      overflow:hidden;
      &>li
        float:left;
        margin-right:25px;
        &>a
          display:block;
          font-size:15px;
          height:40px;
          line-height:40px;
          color:#000;
          &.active
            color:#c62e2e;
            border-bottom:2px solid #c62e2e;
  .children
    position:absolute;
    width:95%;
    height:380px;
    top:160px;
    bottom:0;
    overflow:auto;
</style>
