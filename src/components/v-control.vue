<template>
  <div class="wrapper">
    <!--播放列表开始-->
    <controlList  :songs="songs" v-show="listShowFlag" ref="list" @changeSong="changeSong"></controlList>
    <!--播放列表结束-->
    <div class="play-wrapper">
      <div class="cover" @click="toggleSong">
        <img :src="bPlayingSong.imgUrl">
        <div class="mask"><i class="icon-enlarge2"></i></div>
      </div>
      <audio ref="music"
             :src="bPlayingSong.mp3Url"
             @canplay="calTtime"
             @timeupdate="changeTime"
        >
        您的浏览器不支持 audio 标签。
      </audio>
      <div class="detail">
        <!--三大金刚开始-->
        <div class="ply">
          <button class="preSongBtn" @click="preSong"><i class='icon-previous2'></i></button>
          <button class="ply-btn" @click="PlayorPause">
            <i :class="pIconFlag"></i>
          </button>
          <button class="nextSongBtn" @click="nextSong"><i class="icon-next2"></i></button>
        </div>
       <!-- 三大金刚结束-->
        <div class="controls">
          <div class="top">
            <!--   正在播放的歌曲名以及歌手 开始 -->
            <div class="bPlayingInfo">
              <span class="name">{{bPlayingSong.name}} - </span>
              <span class="singer">
                <span v-for="artist in bPlayingSong.artist">
                  <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
                </span>
              </span>
            </div>
            <!-- 正在播放的歌曲名以及歌手 结束 -->
            <!--  播放总时间 当前时间 开始 -->
            <div class="time">
              <span class="Ctime">{{Ctime}}</span>/
              <span class="Ttime">{{Ttime}}</span>
            </div>
            <!-- 播放总时间 当前时间 结束 -->
          </div>
          <div class="bottom">
            <!--  进度条 开始 -->
            <div ref="progressBar"
                 class="progressBar"
                 @click="setCtime($event)">
              <span ref="progress" class="progress"></span>
            </div>
            <!-- 进度条 结束 -->
            <!-- 音量 开始 -->
            <div class="volLine">
              <button class="noVol" @click="toggleMute">
                <i :class="vIconFlag"></i>
              </button>
              <div ref="vol" class="vol" @click="setVol($event)">
                <span ref="nowVol" class="nowVol"></span>
              </div>
            </div>
            <!--  音量 结束 -->
          </div>
        </div>
        <!--菜单开始-->
        <div class="mode">
          <span class="favo icon-heart"></span>
          <span class="playMode" @click="changeMode" :class="mIconFlag"></span>
          <span class="menu icon-list" @click="toggleList"></span>
        </div>
        <!--菜单结束-->
      </div>
    </div>
    <transition name="slide-fade">
      <div class="song" v-if="showSong">1</div>
    </transition>
  </div>
</template>

<script type="es6">
  import Vue from "vue"
  import controlList from "./control-list.vue"
  export default {
    data(){
      return {
        pIconFlag: 'icon-play3',
        mIconFlag: 'icon-loop',
        vIconFlag: "icon-volume-medium",
        Ttime: '0:00',
        Ctime: '0:00',
        listShowFlag: false,
        modeFlag: 0,
        songIndex: 0,
        showSong:false,
        bPlayingSong: {
          mp3Url: 'http://orot63356.bkt.clouddn.com/maps.mp3',
          imgUrl: 'http://orot63356.bkt.clouddn.com/cover_maps.jpg',
          name: 'maps',
          artist: [{name: "maroon 5", id: "96266"}],
        },
      }
    },
    computed: {
      songs(){
        return this.$store.getters.getSongs;
      },
      nowSong(){
        return this.$store.getters.getPlayingSong;
      },
      playFlag(){
        return this.$store.state.playFlag;
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.music = this.$refs.music;
        this.progressBar = this.$refs.progressBar;
        this.progress = this.$refs.progress;
        this.vol = this.$refs.vol;
        this.nowVol = this.$refs.nowVol;
        this.listCircle();
      },
      PlayorPause(){
        if (this.music.paused || this.music.ended) {
          this.toPlay();
        } else {
          this.toPause();
        }
      },
      toPlay(){
        this.music.play();
        this.pIconFlag = 'icon-pause2';
      },
      toPause(){
        this.music.pause();
        this.pIconFlag = 'icon-play3';
      },
      toggleMute(){
        if (this.nowVol.style.width != "0px") {
          this.lastVol = this.nowVol.offsetWidth;
          this.animate(this.nowVol, {width: 0});
          this.vIconFlag = "icon-volume-mute2";
        } else {
          this.animate(this.nowVol, {width: this.lastVol});
          this.setvIcon();
        }
      },
      calTtime(){
        let duration = this.music.duration;
        let min = parseInt(duration / 60);
        let sec = parseInt(duration - min * 60);
        if (sec < 10) {
          sec = '0' + sec;
        }
        this.Ttime = min + ':' + sec;
      },
      changeTime(){
        let currentTime = this.music.currentTime;
        let scaling = currentTime / this.music.duration;
        let min = parseInt(currentTime / 60);
        let sec = parseInt(currentTime - min * 60);
        if (sec < 10) {
          sec = '0' + sec;
        }
        this.Ctime = min + ':' + sec;
        this.progress.style.width = this.progressBar.offsetWidth * scaling + "px";
      },
      setCtime(e){
        let length = e.offsetX;
        let scaling = length / (this.progressBar.offsetWidth);
        this.progress.style.width = length;
        this.music.currentTime = this.music.duration * scaling;
      },
      setVol(e){
        let length = e.offsetX;
        let scaling = length / (this.vol.offsetWidth);
        this.animate(this.nowVol, {width: length});
        this.music.volume = scaling;
        this.setvIcon();
      },
      setvIcon(){
        if (this.music.volume >= 0 && this.music.volume <= 0.1) {
          this.vIconFlag = "icon-volume-mute";
        } else if (this.music.volume > 0.1 && this.music.volume <= 0.4) {
          this.vIconFlag = "icon-volume-low";
        } else if (this.music.volume > 0.4 && this.music.volume <= 0.7) {
          this.vIconFlag = "icon-volume-medium"
        } else if (this.music.volume > 0.7 && this.music.volume <= 1) {
          this.vIconFlag = "icon-volume-high";
        } else {
          this.vIconFlag = "icon-volume-medium";
        }
      },
      changeSong(config){ //且切换后必须设置autoplay=true play方法无效
        let song = this.songs[config.index];
        this.$store.dispatch('setActiveSong', song);
        this.songIndex = config.index;
        let url = "https://api.imjad.cn/cloudmusic/?type=song&id=";
        this.$http.get(url + song.id).then(response => {
          let mp3Url = response.data.data[0].url;
          if (mp3Url == "null") {
            song.name = "该资源暂时无法获取";
          }
          song.mp3Url = mp3Url;
          this.bPlayingSong = song;
          if (!this.music.paused) {//播放情况下切换可以自动播放
            //console.log("播放情况下切换可以自动播放");
            this.music.autoplay = true;
            this.toPlay();
          }

          if (this.music.currentTime === this.music.duration) {//音乐结束情况下切换可以自动播放
            //console.log("音乐结束情况下切换可以自动播放");
            this.music.autoplay = true;
            this.toPlay();
          }

          if (this.music.paused) {//暂停状态下切换无法自动播放
            //console.log("暂停状态下切换无法自动播放");
            this.music.autoplay = false;
            this.toPause();
          }
          if (config.flag === "playNow") {
            this.music.autoplay = true;
            this.toPlay();
          }
        }, error => {
          console.log("mp3url error")
        });
      },
      preSong(){
        if (this.modeFlag !== 2) {
          if (this.songIndex === 0) {
            this.songIndex = this.songs.length;
          }
          this.songIndex = this.songIndex - 1;
        } else {
          let rd = Math.random() * this.songs.length;
          while (rd === this.songIndex) {
            rd = Math.random() * this.songs.length;
          }
          this.songIndex = Math.floor(rd);
        }
        this.changeSong({index: this.songIndex});
      },
      nextSong(){
        if (this.modeFlag !== 2) {
          this.songIndex = this.songIndex + 1;
          if (this.songIndex === this.songs.length) {
            this.songIndex = 0;
          }
        } else {
          let rd = Math.random() * this.songs.length;
          while (rd === this.songIndex) {
            rd = Math.random() * this.songs.length;
          }
          this.songIndex = Math.floor(rd);
        }
        this.changeSong({index: this.songIndex});
      },
      toggleList(){
        this.listShowFlag = !this.listShowFlag;
      },
      changeMode(){
        if (this.modeFlag === 0) {
          this.modeFlag = 1;
          this.oneCircle();
        } else if (this.modeFlag === 1) {
          this.modeFlag = 2;
          this.listRandom();
        } else if (this.modeFlag === 2) {
          this.modeFlag = 3;
          this.orderPlay();
        } else if (this.modeFlag === 3) {
          this.modeFlag = 0;
          this.listCircle();
        }
      },
      listCircle(){  //模式0 列表循环（默认）
        clearInterval(this.timer);
        this.mIconFlag = "icon-loop";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            that.songIndex = that.songIndex + 1;
            if (that.songIndex === that.songs.length) {
              that.songIndex = 0;
            }
            that.changeSong({index: that.songIndex});
          }
        }, 1000);
      },
      oneCircle(){  //模式1 单曲循环
        clearInterval(this.timer);
        this.mIconFlag = "icon-loop2";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            that.changeSong({index: that.songIndex});
          }
        }, 1000);
      },
      listRandom(){ //模式2 随机播放
        clearInterval(this.timer);
        this.mIconFlag = "icon-shuffle";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            let rd = Math.random() * that.songs.length;
            that.songIndex = Math.floor(rd);
            that.changeSong({index: that.songIndex});
          }
        }, 1000);
      },
      orderPlay(){  //模式3  顺序播放
        clearInterval(this.timer);
        this.mIconFlag = "icon-spinner11";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            that.songIndex = that.songIndex + 1;
            if (that.songIndex === that.songs.length) {
              clearInterval(that.timer);
              return;
            }
            that.changeSong({index: that.songIndex});
          }
        }, 1000);
      },
      toggleSong(){
        this.showSong=!this.showSong;
      }
    },
    watch: {
      playFlag: {
        handler: function () {
          this.changeSong({index: 0, flag: 'playNow'});
        },
        deep: true
      }
    },
    components: {
      controlList,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .wrapper
    background-color:transparent;
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
    z-index:99999;
    .play-wrapper
      display: flex;
      box-sizing:border-box;
      width:100%;
      height:60px;
      border: 1px solid rgba(7,17,27,0.2);
      .cover
        width:60px;
        height: 60px;
        &>img
          width:100%;
          height:100%;
        .mask
          position absolute
          left:0
          top:0
          width:60px;
          height:60px;
          line-height:60px;
          font-size:25px;
          color:white;
          background-color rgba(7,17,27,0.5);
          opacity:0;
        &:hover
          .mask
            opacity:1;
            transition:all 0.5s;            
      .detail
        box-sizing: border-box;
        width:100%;
        flex:1;
        display:flex;
        .ply
          flex:1
          padding-left:15px;
          padding-top:14px;
          overflow:hidden;
          .preSongBtn,.nextSongBtn,.ply-btn
            float:left;
            width: 32px;
            height:32px;
            background-color:#df3b3b;
            &>i
              color:#fff;
              font-size:15px;
          .nextSongBtn,.ply-btn
            margin-left:20px;
        .controls
          flex:4
          box-sizing:border-box;
          text-align:left;
          flex-direction:column;
          .top
            height:30px;
            line-height:30px;
            font-size:12px;
            .bPlayingInfo
              float:left;
            .time
              float:right;
              marging-right:30px;
          .bottom
            display:flex;
            height:30px;
            .progressBar
              flex:3;
              height:4px;
              margin-top:10px;
              border-radius: 10px;
              background-color:#e5e5e5;
              cursor:pointer;
              .progress
                display: block;
                width:0;
                height: 6px;
                background-color: #df3b3b;
                border-radius: 6px;
            .volLine
              flex:1;
              display:flex;
              padding-left:30px;
              cursor:pointer;
              .noVol
                width:30px;
                height:30px;
              .vol
                flex:1;
                height:6px;
                margin-top:10px;
                background-color:#e5e5e5;
                border-radius: 6px;
                .nowVol
                   display: block;
                   width:50%;
                   height: 4px;
                   background-color: #df3b3b;
                   border-radius: 4px;
        .mode
          flex:1
          display:flex;
          &>span
            display:block;
            flex:1;
            color:#999999;
            line-height:60px;
            font-size: 15px;
            text-align: center;
            cursor: pointer;
    .song
      position:fixed;
      top:30px;
      bottom:60px;
      width:100%;
      overflow:auto;
      background-color:black;
      

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
