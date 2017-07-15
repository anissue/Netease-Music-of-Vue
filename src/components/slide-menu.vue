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
          <router-link to="#"><i class="icon-video-camera"></i><span>MV</span></router-link>
        </li>
        <li>
          <router-link to="/about"><i class="icon-users"></i><span>关于</span></router-link>
        </li>
      </ul>

      <h4>我的音乐</h4>
      <ul class="links">
        <li>
          <router-link to="#"><i class="icon-headphones"></i><span>本地音乐</span></router-link>
        </li>
        <li>
          <router-link to="#"><i class="icon-download2"></i><span>下载管理</span></router-link>
        </li>
        <li>
          <router-link to="/recent"><i class="icon-clock"></i><span>最近播放</span></router-link>
        </li>
      </ul>

      <h4>创建的歌单</h4>
      <ul class="links">
        <li>
          <router-link to="favo"><i class="icon-heart"></i><span>我喜欢的音乐</span></router-link>
        </li>
      </ul>

      <h4>收藏的歌单</h4>
      <ul class="collectList links">
        <li v-for="playlist in collectList">
          <router-link :to="{path: 'collectList' , query:{id:playlist.id}}">
            <img :src="playlist.coverImgUrl"/>
            <span>{{playlist.name}}</span>
          </router-link>
          <i class="icon-cross" @click="deleteList(playlist)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  export default{
    data(){
      return {
        menuFlag: true,
      }
    },
    computed:{
      collectList(){
        return this.$store.getters.getCollectList;
      }
    },
    methods: {
      toggleMenu(){
        if (this.menuFlag === false) {
          this.animate(this.$refs.menu,{
            width : 200,
          })
          this.menuFlag = true;
        } else {
          this.animate(this.$refs.menu,{
            width :35
          })
          this.menuFlag = false;
        }
      },
      deleteList(playlist){
        this.$store.dispatch('deleteList',playlist);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slideMenu
    width:15%;
    overflow:auto;
    text-align:left;
    background-color #f3f3f5;
    &>i
      margin-left:10px;
      height:45px;
      line-height :45px;
      font-size:15px;
      cursor:pointer;
    .content
      &>h4
        margin-left:10px;
        height:45px;
        line-height :45px;
        font-size:13px;
        color:#bfbfc0;
      .links
        &>li
          box-sizing:border-box;
          height:40px;
          padding-left:12px;
          font-size :14px;
          &>a
            display:block;
            height:40px;
            line-height 40px
            color:#000;
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
            display:none;
            position:absolute
            right:3px;
            top:14px;
            font-size:12px;
            bottom:0;
          &>a
            &>span
              display inline-block
              height:40px;
              width:70%;
              vertical-align top
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            &>img
              width:35px;
              height 35px;
              margin-right:5px;
            &.active
              color:#000;
          &:hover
            .icon-cross
              display:inline;
              color:#999;
</style>
