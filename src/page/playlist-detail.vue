<template>
  <div class="playlist-detail">
    <loading v-if="loading"></loading>
  
    <div class="list" v-if="detail">
      <h4>歌单</h4>
      <div class="info">
  
        <div class="cover">
          <img :src="detail.playlist.coverImgUrl" />
  
          <div class="count"><span><i class="icon-headphones"></i>{{detail.playlist.playCount}}</span></div>
        </div>
  
        <div class="others">
          <p class="title">{{detail.playlist.name}}</p>
  
          <div class="user">
            <div class="avatar"><img :src="detail.playlist.creator.avatarUrl" alt=""></div>
            <div class="userName">{{detail.playlist.creator.nickname}}</div>
            <div class="time">{{createTime}}创建</div>
          </div>
  
          <div class="btns">
            <a @click="collect"><i class="icon-folder-plus"></i>收藏({{detail.playlist.subscribedCount}})</a>
            <a href="javascript:void(0)"><i class="icon-spinner9"></i>评论({{detail.playlist.commentCount}})</a>
            <a href="javascript:void(0)"><i class="icon-share2"></i>分享({{detail.playlist.shareCount}})</a>
            <a href="javascript:void(0)"><i class="icon-folder-download"></i>下载全部</a>
            <a href="javascript:void(0)">~更多</a>
          </div>
  
          <div class="tag">标签：
            <a v-for="tag in detail.playlist.tags">{{tag}}</a>
          </div>
          <div class="des">
            <p @click="showDes" ref="des">{{detail.playlist.description}}</p>
          </div>
  
        </div>
  
      </div>
  
      <p class="playAll" @click="playAll">播放全部({{detail.playlist.tracks.length}})</p>
      <songList :songs="detail.playlist.tracks"></songList>
    </div>
    <img v-if="detail" :src="this.detail.playlist.coverImgUrl" class="bg">
  </div>
</template>

<script type="es6">
  import songList from '../components/songList.vue'
  import loading from '../components/loading.vue'
  export default {
    data() {
      return {
        detail: null,
        loading: false,
        desFlag: false
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true;
        let url = 'https://api.imjad.cn/cloudmusic/?type=playlist&id=';
        this.$http.get(url + this.$route.query['id']).then(response => {
          this.loading = false;
          this.detail = response.data;
          //console.log(this.detail);
        }, response => {
          console.log('detail error');
        })
      },
      showDes() {
        if (this.desFlag === false) {
          this.$refs.des.style.maxHeight = "100vh";
          this.desFlag = true;
        } else {
          this.$refs.des.style.maxHeight = "35px";
          this.desFlag = !this.desFlag;
        }
      },
      playAll() {
        this.$store.dispatch('playall', this.detail.playlist.tracks);
      },
      collect() {
        this.$store.dispatch('collectList', this.detail.playlist);
      }
    },
    computed: {
      createTime() {
        var date = new Date(this.detail.playlist.createTime);
        date = date.toString();
        var month = date.toString().split(' ')[1];
        switch (month) {
          case 'Jan':
            month = '01';
            break;
          case 'Feb':
            month = '02';
            break;
          case 'Mar':
            month = '03';
            break;
          case 'Apr':
            month = '04';
            break;
          case 'May':
            month = '05';
            break;
          case 'Jun':
            month = '06';
            break;
          case 'Jul':
            month = '07';
            break;
          case 'Aug':
            month = '08';
            break;
          case 'Sep':
            month = '09';
            break;
          case 'Oct':
            month = '10';
            break;
          case 'Nov':
            month = '11';
            break;
          case 'Dec':
            month = '12';
            break;
          default:
            month = month;
        }
        var day = date.toString().split(' ')[2];
        var year = date.toString().split(' ')[3];
        return year + "-" + month + "-" + day;
      },
    },
    watch: { //避免同级路由（如收藏的歌单之间相互跳转url变化但是组件不变化）相互跳转组件不刷新
      '$route' (to, from) {
        this.fetchData();
      }
    },
    components: {
      songList,
      loading,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
  .playlist-detail
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
          .count
            position:absolute;
            top:0;
            right:0;
            width:100%;
            background-color:rgba(7,17,27,0.3);
            text-align:right;
            &>span
              color:white;
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

