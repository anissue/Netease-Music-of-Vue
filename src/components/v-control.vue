<template>
  <div class="wrapper">
    <!--播放列表开始-->
    <controlList  :songs="songs" v-show="listShowFlag" ref="list" @changeSong="changeSong"></controlList>
    <!--播放列表结束-->
    <div class="play-wrapper">
      <div class="cover" @click="toggleSong">
        <img :src="currentSong.album.picUrl">
        <div class="mask"><i class="icon-enlarge2"></i></div>
      </div>
      <audio ref="music"
             :src="currentSong.mp3Url"
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
              <span class="name">{{currentSong.name}} - </span>
              <span class="singer">
                <span v-for="artist in currentSong.artist">
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
          <span class="icon-heart"></span>
          <span class="playMode" @click="changeMode" :class="mIconFlag"></span>
          <span class="menu icon-list" @click="toggleList"></span>
        </div>
        <!--菜单结束-->
      </div>
    </div>
    <transition name="slide-fade">
      <div class="songDetail" v-show="showSong">
        <div class="bg-blur" ref="bg"></div>
        <div class="content">
          <div class="top">
            <div class="left-cover">
              <div class="cd-around" :class="{roll:isRoll,stop:!isRoll}">
                <img :src="currentSong.album.picUrl" alt="">
              </div>
            </div>
            <div class="right-lyric">
              <div class="info">
                <p class="name">{{currentSong.name}}</p>
                <span class="album">专辑：{{currentSong.album.name}}</span>
					      <span class="songArtists">
		              <span v-for="artist in currentSong.artist">
		                歌手：{{artist.name + " "}}
		              </span>
		            </span>
              </div>
              <div class="lyric">
                <ul class="lines" ref="lyricBox">
                  <li class="line" :class="{active:isActive[index]}" v-for="(line,index) in lyric">{{line[1]}}</li>
                </ul>
              </div>
              <p @click="showSong=0">关闭</p>
            </div>
          </div>
        </div>
      </div>
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
        isRoll:false,
        currentTime:0,
        lyric:[],
        isActive:[],
        currentSong: {
          id:"28661564",
          mp3Url: 'http://orot63356.bkt.clouddn.com/maps.mp3',
          album: {
            "id": 2866276,
            "name": "Maps",
            "picUrl": "https://p1.music.126.net/OC3XXrblVQPgXrkZyLaPow==/3394192437682072.jpg",
            "tns": [],
            "pic": 3394192437682072
          },
          name: 'maps',
          artist: [{name: "maroon 5", id: "96266"}],
        },
      }
    },
    created(){
      var that = this;
      Vue.nextTick(function(){
        that.initWallPaper();
      });
      this.fetchLyric();
    },
    computed: {
      songs(){
        return this.$store.getters.getSongs;
      },
      playFlag(){
        return this.$store.state.playFlag;
      },
      bPlayingSong(){
        return this.$store.state.bPlayingSong;
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
        this.isRoll = true;
        this.music.play();
        this.pIconFlag = 'icon-pause2';
      },
      toPause(){
        this.isRoll = false;
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
        /*改变进度条*/
        let currentTime = this.music.currentTime;
        let scaling = currentTime / this.music.duration;
        let min = parseInt(currentTime / 60);
        let sec = parseInt(currentTime - min * 60);
        if (sec < 10) {
          sec = '0' + sec;
        }
        this.Ctime = min + ':' + sec;
        this.progress.style.width = this.progressBar.offsetWidth * scaling + "px";
        /*歌词同步*/
        for(let i=0;i<this.lyric.length;i++){
          if(this.music.currentTime > this.lyric[i][0] - 1){
            for(let j=0;j<this.isActive.length;j++){
              this.isActive[j]=0;
            }
            this.isActive[i]=1;
            this.animate(this.$refs.lyricBox,{
              top:140 - 35 * (i + 1)
            })
          }
        }
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
          this.currentSong.mp3Url=mp3Url;
          this.currentSong.id = song.id;
          this.currentSong.album = song.album;
          this.currentSong.name = song.name;
          this.currentSong.artist = song.artist
          this.fetchLyric();
          this.initWallPaper();
          if (this.music.currentTime === this.music.duration || !this.music.paused || config.flag === "playNow") {//音乐结束情况下切换可以自动播放
            //console.log("音乐结束情况下切换可以自动播放");
            this.music.autoplay = true;
            this.toPlay();
          }else{
            this.music.autoplay = false;;
            this.toPause();
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
      },
      initWallPaper(){
        this.$refs.bg.style.backgroundImage = "url(" + this.currentSong.album.picUrl + ")";
      },
      fetchLyric(){
        let url = 'https://api.imjad.cn/cloudmusic/?type=lyric&id=' + this.currentSong.id;
        this.$http.get(url).then(response => {
          if (response.data.code === 200) {
            if(response.data.sgc){
              this.lyric = this.parseLyric(response.data.lrc.lyric);
              for (let i = 0; i < this.lyric.length; i++) {
                Vue.set(this.isActive, i, 0);
              }
            }else{
              this.lyric=[[0.00,"该歌曲暂无歌词"]];
              console.log("该歌曲暂无歌词");
              //console.log(this.lyric);
            }
          } else {
            console.log("not found lyric");
          }
        }, error => {
          console.log("lyric error");
        });
      },
      parseLyric(text) {
        //将文本分隔成一行一行，存入数组
        var lines = text.split('\n');
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        var pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g;
        //保存最终结果的数组
        var  result = [];
        //去掉不含时间的行
        while (!pattern.test(lines[0])) {
          lines = lines.slice(1);
        };
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
        lines[lines.length - 1].length === 0 && lines.pop();
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var value = line.replace(pattern, '');//提取歌词 将时间清空 返回一个新的字符串
          var times = line.match(pattern); //返回数组 [时间]，对该数组做处理，将时间转为秒数，同时注意此类情况:多个时间点共享同一句歌词，[时间1，时间2...]
          times.forEach(function (time) {
            //去掉时间里的中括号得到xx:xx.xx并用:分割得到[xx,xx.xx]的数组
            var t = time.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);//组合成 [时间,歌词]
            //此处可能多个时间对应同一句歌词，而result.push显然会打乱顺序的，例如第一个时间点和最后一个时间点共享同一句歌词，而此时Push进去他们是相邻的，应按照时间顺序进行排序
          });
        }
        result.sort(function (a, b) {
          return a[0] - b[0];//加上下标 是为了取出时间 result[0][0]与result[1][0]做比较而不是result[0]与result[1]做比较
        });
        return result;
      }
    },
    watch: {
      playFlag:{
        handler:function(){
          this.changeSong({index: 0, flag: 'playNow'});
        },
        deep:true
      },
      bPlayingSong:{
        handler:function(){
          if(this.music.paused){
            this.isRoll=false;
          }else{
            this.isRoll=true;
          }
        },
        deep:true
      }
    },
    components: {
      controlList,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './v-control';
</style>
