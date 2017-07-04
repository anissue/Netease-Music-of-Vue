<template>
  <div class="wrapper mdui-color-theme">
    <transition
      name="fade">
    <div class="list" v-show="listShowFlag" v-if="ready">
      <ul class="mdui-list mdui-list-dense" ref="list">
        <li v-for="(song,index) in songs"
            class="song mdui-list-item mdui-ripple"
            :class="{active: isSelected[index]}">
          <div class="no mdui-list-item-content">{{index+1}}.</div>
          <div class="songName mdui-list-item-content"
               @click="changeSong(index)">{{song.name}}
          </div>
          <div class="songSinger mdui-list-item-content">
            <span v-for="artist in song.artist">
              <router-link :to="{path: '/artist/' + artist.id}">{{artist.name+" "}}</router-link>
            </span>
          </div>
          <i class="deleteSong mdui-list-item-icon mdui-icon material-icons"
             @click="deleteSong(index)">&#xe5cd;</i>
        </li>
      </ul>
    </div>
    </transition>
    <div class="play-wrapper">
      <img :class="blurFlag" :src="bPlaying.imgUrl" class="mdui-img-circle">
      <audio ref="music"
             :src="bPlaying.mp3Url"
             @canplay="calTtime"
             @timeupdate="changeTime"
        >
        您的浏览器不支持 audio 标签。
      </audio>
      <div class="detail">
        <div class="ply">
          <button class="preSongBtn mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-blue-grey-900 mdui-ripple mdui-btn-raised" @click="preSong"><i class='icon-backward'></i></button>
          <button class="ply-btn mdui-btn mdui-btn-icon mdui-color-blue-grey-900 mdui-ripple mdui-btn-raised" @click="PlayorPause">
            <i :class="pIconFlag"></i>
          </button>
          <button class="nextSongBtn mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-blue-grey-900 mdui-ripple mdui-btn-raised" @click="nextSong"><i class="icon-forward"></i></button>
        </div>
        <div class="controls">
          <span class="name">{{bPlaying.name}}/</span>
          <span class="singer">
            <span v-for="artist in bPlaying.artist">
              <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
            </span>
          </span><br>

          <div ref="progressBar"
               class="progressBar"
               @click="setCtime($event)">
            <span ref="progress" class="progress"></span>
          </div>
          <div class="time">
            <span class="Ctime">{{Ctime}}</span>/
            <span class="Ttime">{{Ttime}}</span>
          </div>
          <br>

          <div class="volLine">
            <button class="noVol mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple" @click="toggleMute">
              <i :class="vIconFlag"></i>
            </button>
            <div ref="vol" class="vol" @click="setVol($event)">
              <span ref="nowVol" class="nowVol"></span>
            </div>
          </div>
        </div>
        <div class="mode">
          <span class="playMode mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple mdui-btn-raised" @click="changeMode"><i :class="mIconFlag"></i></span>
          <span class="menu mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple mdui-btn-raised" @click="toggleList"><i class="icon-menu"></i></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="es6">
  import Vue from "vue"
  export default {
    props: {
      addSong: {
        type: Object
      },
      playSong: {
        type: Object
      }
    },
    data(){
      return {
        isActive: true,
        songs: [],
        bPlaying: {
          mp3Url: 'http://orot63356.bkt.clouddn.com/maps.mp3',
          imgUrl: 'http://orot63356.bkt.clouddn.com/cover_maps.jpg',
          name: 'maps',
          artist: [{name: "maroon 5", id: "96266"}],
        },
        blurFlag: false,
        pIconFlag: 'icon-play',
        mIconFlag: 'icon-loop',
        vIconFlag: "icon-volume-medium",
        Ttime: '0:00',
        Ctime: '0:00',
        isSelected: [],
        listShowFlag: false,
        modeFlag: 0,
        songIndex: 0,
        ready: false
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.ready = true;
        for (let i = 1; i < this.songs.length; i++) {
          this.isSelected.push(0);
        }
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
        this.pIconFlag = 'icon-pause';
        this.blurFlag = 'blur';
      },
      toPause(){
        this.music.pause();
        this.pIconFlag = 'icon-play';
        this.blurFlag = '';
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
      changeSong(index, flag){ //且切换后必须设置autoplay=true play方法无效
        this.songIndex = index;
        this.bPlaying.mp3Url = this.songs[index].mp3Url;
        this.bPlaying.imgUrl = this.songs[index].imgUrl;
        this.bPlaying.name = this.songs[index].name;
        this.bPlaying.artist = this.songs[index].artist

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
        if (flag === "playNow") {
          this.music.autoplay = true;
          this.toPlay();
        }

        this.setActiveClass(index);
      },
      setActiveClass(index){
        for (let i = 0; i < this.isSelected.length; i++) {
          this.isSelected[i] = 0;
        }
        this.isSelected[index] = 1;

      },
      toggleList(){
        this.listShowFlag = !this.listShowFlag;
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
        this.changeSong(this.songIndex);
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
        this.changeSong(this.songIndex);
      },
      deleteSong(index){
        this.songs.splice(index, 1);
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
            that.changeSong(that.songIndex);
          }
        }, 1000);
      },
      oneCircle(){  //模式1 单曲循环
        clearInterval(this.timer);
        this.mIconFlag = "icon-loop2";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            that.changeSong(that.songIndex);
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
            that.changeSong(that.songIndex);
          }
        }, 1000);
      },
      orderPlay(){  //模式3  顺序播放
        clearInterval(this.timer);
        this.mIconFlag = "icon-repeat_one";
        var that = this;
        this.timer = setInterval(function () {
          if (that.music.ended) {
            that.songIndex = that.songIndex + 1;
            if (that.songIndex === that.songs.length) {
              clearInterval(that.timer);
              return;
            }
            that.changeSong(that.songIndex);
          }
        }, 1000);
      },
      animate(ele, json, fn){
        //首先清除定时器
        clearInterval(ele.timer);
        var that = this;
        ele.timer = setInterval(function () {
          //开闭原则
          var bool = true;
          //遍历属性和值，分别单独处理json
          //k:属性名 json[k]:属性值
          for (var k in json) {
            var leader;
            //获取当前属性值,如果没有则设为0
            //如果是透明度属性取值方式不同
            if (k === "opacity") {
              if (!that.getStyle(ele, k)) {
                leader = 100;
              } else {
                leader = that.getStyle(ele, k) * 100;
              }
              //leader = parseInt(that.getStyle(ele,k))*100||1;//最后还要用1乘100也就是100
            } else {
              leader = parseInt(that.getStyle(ele, k)) || 0;
            }
            //获取步长,，步长会随着leader的增大而减小，使得动画更平缓
            var step = (json[k] - leader) / 10;
            //二次处理步长，判断正负
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            //赋值给属性
            //特殊情况特殊赋值
            if (k === "opacity") {
              //最后除以100变成[0,1]之间的数
              ele.style["opacity"] = leader / 100;
              //兼容IE678
              ele.style.filter = "alpha(opacity=" + leader + ")";
            } else if (k === "zIndex") {
              //如果是层级 就一次性赋值，没有理由，需求！
              ele.style.zIndex = json[k];
            } else {
              ele.style[k] = leader + "px";
            }
            //直到这里运动完毕后定时器却并没有清除，需手动清除
            //而不是等下一次移动再清除，太被动，且占内存
            //清除定时器
            //判断每一个属性的目标值和当前值的差是否大于步长
            //如果大于步长说明还没到目标值(考虑小数)
            /*if(Math.abs(json[k]-leader)>Math.abs(step)){
             bool=false;
             }*/
            //不考虑小数
            if (json[k] !== leader) {
              bool = false;
            }
          }
          if (bool) {
            clearInterval(ele.timer);
            if (fn) {
              fn();
            }
          }
        }, 20);
      },
      //兼容方法获取元素样式
      //getComputedStyle返回属性数组，只读
      //ele.style[attr]也可以(千万不要傻到用.k)，可读可写
      getStyle(ele, attr){
        if (window.getComputedStyle) {
          return window.getComputedStyle(ele, null)[attr];
        }
        return ele.currentStyle[attr];
      },
      scrollToBottom(){//保证滚动条在最底部
        let height = this.$refs.list.scrollHeight;
        this.$refs.list.scrollTop = height;
      },
      scrollToHead(){//保证滚动条在最顶部
        this.$refs.list.scrollTop = 0;
      },
    },
    watch: {
      addSong: {
        handler: function () {
          this.songs.push(this.addSong);
          let that = this;
          Vue.nextTick(function () {
            that.scrollToBottom();
          })
        },
        deep: true
      },
      playSong: {
        handler: function () {
          this.songs.shift(0);
          this.songs.unshift(this.playSong);
          this.changeSong(0, "playNow");
          let that = this;
          Vue.nextTick(function () {
            that.scrollToHead();
          })
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  *:focus{
    outline: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  @keyframes roll{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
  .wrapper
    background-color:#fff;
    border: 1px solid rgba(7,17,27,0.2);
    box-shadow: -1px 0px 10px #333333;
    width:100%;
    position:relative;
    .play-wrapper
      display: flex;
      box-sizing:border-box;
      width:100%;
      height:50px;
      padding-left:5px;
      border-bottom: 1px solid rgba(7,17,27,0.2);
      &>img
        flex: 0 0 50px;
        width:50px;
        height: 50px;
        &.blur
          animation: roll 8s  linear infinite;
      .detail
        box-sizing: border-box;
        width:100%;
        flex:1;
        display:flex;
        .ply
          flex:3
          line-height:50px;
          .preSongBtn,.nextSongBtn,.ply-btn
            cursor: pointer;
            color:#fff !important;
          .ply-btn
            line-height:40px;
            text-align:center;
        .controls
          flex:8
          box-sizing:border-box;
          text-align:left;
          &>div
            display:inline-block;
            box-sizing: border-box;
            cursor: pointer;
          .name
             font-size: 14px;
             line-height: 1;
             font-weight: 700;
          .singer
            line-height: 1;
            font-size: 12px;
          .progressBar
            width:80%;
            height:6px;
            margin:0 auto;
            border-radius: 10px;
            background-color:#999;
            .progress
               display: block;
               width:0;
               height: 6px;
               background-color: #263238;
               border-radius: 4px;
          .time
            font-size: 14px;
          .volLine
            width:100%;
            height:20px;
            display:flex;
            align-items:center;
            .noVol
              width:20px;
              height:20px;
              line-height:20px;
              cursor: pointer;
            .vol
              width:25%;
              height:8px;
              background-color:  #999;
              border-radius: 4px;
              .nowVol
                 display: block;
                 width:50%;
                 height: 8px;
                 background-color: #263238;
                 border-radius: 4px;
        .mode
          flex:2
          line-height:50px;
          .menu
            font-size: 15px;
            border:none;
            cursor: pointer;
          &>span
            flex:1;
            box-sizing: border-box;
            font-size: 15px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
    .list ul
      position:absolute;
      bottom:100%;
      left:0;
      background-color:#fff;
      width:100%;
      min-height:20px;
      max-height:100px;
      overflow: auto;
      border-bottom:1px solid rgba(7,17,27,0.3);
      &::-webkit-scrollbar
        width: 0;
      &>li
        cursor:default;
        display:flex
        .no
          flex:1
        .songName
          flex:3
          cursor:pointer;
        .songSinger
          flex:3
        &.active
          position: relative;
          background-color: #000000;
          color:white;
        &.active:before
          position: absolute;
          left: 0;
          top:50%;
          transform: translate(0,-50%);
          display: block;
          content:"";
          background-color: rgba(155,155,155,0.8);
          height:10px;
          width: 3px;
        &>i
          cursor:pointer;
</style>
