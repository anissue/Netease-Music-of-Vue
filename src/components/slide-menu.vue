<template>
  <div class="slideMenu" ref="menu">
    <i @click="toggleMenu" class="icon-menu"></i>
  
    <div class="content" v-show="menuFlag">
      <ul class="links">
        <li>
          <router-link to="/search"><i class="icon-search"></i><span>搜索</span></router-link>
        </li>
        <li>
          <router-link to="/findMusic"><i class="icon-music"></i><span>发现音乐</span></router-link>
        </li>
        <li>
          <router-link to="/toplist"><i class="icon-star-full"></i><span>排行榜</span></router-link>
        </li>
        <li>
          <router-link to="/about"><i class="icon-users"></i><span>关于</span></router-link>
        </li>
      </ul>
  
      <h5>我的音乐</h5>
      <ul class="links">
        <li>
          <router-link to="/localmusic"><i class="icon-headphones"></i><span>本地音乐</span></router-link>
        </li>
        <li>
          <router-link to="/download"><i class="icon-download2"></i><span>下载管理</span></router-link>
        </li>
        <li>
          <router-link to="/recent"><i class="icon-clock"></i><span>最近播放</span></router-link>
        </li>
      </ul>
  
      <h5>创建的歌单</h5>
      <ul class="links">
        <li>
          <router-link to="/favo"><i class="icon-heart"></i><span>我喜欢的音乐</span></router-link>
        </li>
      </ul>
  
      <h5>收藏的歌单</h5>
      <ul class="collectList links">
        <li v-for="playlist in collectList">
          <router-link :to="{path: 'collectList' , query:{id:playlist.id}}">
            <img :src="playlist.coverImgUrl" />
            <span>{{playlist.name}}</span>
          </router-link>
          <i class="icon-cross" @click="deleteList(playlist)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        menuFlag: true,
      }
    },
    computed: {
      collectList() {
        return this.$store.getters.getCollectList;
      }
    },
    methods: {
      toggleMenu() {
        if (this.menuFlag === false) {
          this.animate(this.$refs.menu, {
            width: 200,
          })
          this.menuFlag = true;
        } else {
          this.animate(this.$refs.menu, {
            width: 35
          })
          this.menuFlag = false;
        }
      },
      deleteList(playlist) {
        this.$store.dispatch('deleteList', playlist);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
.slideMenu
    width:15%;
    overflow:auto;
    text-align:left;
    mx_fc(14px,#bfbfc0);
    background-color #f3f3f5;
    &>i
      mx_hlh(45px,45px);
      margin-left:10px;
      font-size:15px;
      cursor:pointer;
    .content
      &>h5
        margin-left:10px;
        mx_hlh(45px,45px);
      .links
        &>li
          mx_brbox();
          height:40px;
          padding-left:12px;
          &>a
            display:block;
            mx_fc(14px,#000);
            mx_hlh(40px,40px);
            &>i
              display:inline-block;
              margin-right:15px;
              font-size:15px;
            &.active
              color:#df3b3b;
          &:hover
            background-color :#e8e8eb;
      .collectList
        &>li
          position:relative;
          .icon-cross
            mx_postr(3px,14px);
            display:none;
            font-size:12px;
          &>a
            &>span
              mx_wh(70%,40px);
              mx_single_ellipsis();
              display:inline-block;
              vertical-align:top;
              mx_fc(14px,#000);
            &>img
              mx_wh(35px,35px);
              margin-right:5px;
            &.active
              color:#000;
          &:hover
            .icon-cross
              display:inline;
              color:#999;
</style>
