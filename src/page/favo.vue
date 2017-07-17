<template>
  <div class="favo">
    <div class="list" v-if="favoSongs">
      <h4>歌单</h4>
      <div class="info">

        <div class="cover">
          <img src="https://p1.music.126.net/2dBbYyB5DqJWzu1CqDg11w==/19238154951419549.jpg"/>
        </div>

        <div class="others">
          <p class="title">我喜欢的歌曲</p>

          <div class="user">
            <div class="avatar"><img src="https://p1.music.126.net/2dBbYyB5DqJWzu1CqDg11w==/19238154951419549.jpg" alt=""></div>
            <div class="userName">Zac</div>
            <div class="time">2017-07-16创建</div>
          </div>
        </div>
      </div>
      <songList :songs="favoSongs" :favoFlag="false" :delFlag="true"></songList>
    </div>
    <img src="https://p1.music.126.net/2dBbYyB5DqJWzu1CqDg11w==/19238154951419549.jpg" class="bg">
  </div>
</template>

<script type="es6">
  import songList from '../components/songList.vue'
  import loading from '../components/loading.vue'
  export default {
    computed:{
      favoSongs(){
        return this.$store.state.favoSongs;
      }
    },
    components: {
      songList,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
  .favo
    mx_pagepadding();
    position:relative;
    .list
      .info
        display:flex;
        margin-bottom:20px;
        .cover
          flex:0 0 200px;
          width:200px;
          height:200px;
          margin-right:20px;
          position:relative;
          &>img
            width:100%;
            height:100%;
        .others
          flex:1;
          .title
            font-size:20px
            margin-bottom:12px;
          .user
            &>div
              display:inline-block;
              margin-right:12px;
              margin-bottom:20px;
            .avatar
              width:30px;
              height:30px;
              border-radius:50%;
              overflow:hidden;
              &>img
                width:100%;
                height:100%
            .userName,.time
              font-size:13px;
              line-height:30px;
              vertical-align:top;
            .userName
              color:#666666;
            .time
              color:#aeaeaf;
        .btns
          margin-bottom:20px;
          &>a
            display:inline-block;
            height:18px;
            line-height:18px;
            padding:8px;
            color:#000;
            letter-spacing:1px;
            border-radius:5px;
            border 1px solid #c3c4c8;
            cursor:pointer;
        .tag
          color:#000;
          margin-bottom:15px;
          &>a
            box-sinzing:border-box;
            display:inline-block;
            margin: 0px 10px 3px 0px;
            padding:3px;
            height: 18px;
            font-size:12px;
            line-height: 18px;
            border 1px solid #c3c4c8
            border-radius:7px;
            cursor:pointer;
        .des
          &>p
            margin-top: 4px;
            line-height: 18px;
            color: rgb(102, 102, 102);
            font-weight : 600;
            max-height:35px;
            overflow:hidden;
            cursor:pointer;
          &>span
            color:#000;
      .playAll
        font-size:15px;
        margin-left:12px;
        margin-bottom:15px;
        cursor:pointer;
    .bg
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100px;
      z-index:1;
      filter:blur(30px);
      opacity:0.2;
</style>

