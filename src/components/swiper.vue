<template>
  <div class="slider" @mouseover="showBtn" @mouseout="hideBtn" ref="swiper" v-if="newSwiper">
    <ul class="box" ref="box">
      <li v-for="(img,imgIndex) in newSwiper" :class="{active:isImgActive[imgIndex]}" ref="boxItem"><img :src="img.imgurl" alt="" />
  
        <div class="mask"></div>
      </li>
    </ul>
    <div class="dots">
      <span v-for="(img,dotIndex) in swiperImg" :class="{active:isDotActive[dotIndex]}" @click="dotChange(dotIndex)"></span>
    </div>
    <div id="arr" v-show="btnShow">
      <span id="left" @click="pre"><</span>
      <span id="right" @click="next">></span>
    </div>
  </div>
</template>

<script type="es6">
  import Vue from 'vue'
  export default {
    props: {
      swiperImg: {
        type: Array
      },
      isAutoPlay: {
        type: Boolean
      },
    },
    data() {
      return {
        newSwiper: [],
        btnShow: false,
        index: 0,
        moveDistance: null,
        halfDistance: null,
        initDistance: null,
        isImgActive: [],
        isDotActive: [],
        autoTimer: null,
        length: null,
      }
    },
    created() {
      this.initSwiper();
    },
    methods: {
      initSwiper() {
        for (let i = 0; i < this.swiperImg.length; i++) {
          Vue.set(this.newSwiper, i, this.swiperImg[i]);
        }
        this.newSwiper.push(this.swiperImg[0]);
        this.newSwiper.push(this.swiperImg[1]);
        this.newSwiper.unshift(this.swiperImg[this.swiperImg.length - 1]);
        var that = this;
        Vue.nextTick(function() {
          that.length = that.newSwiper.length;
          let swpierWidth = that.$refs.swiper.offsetWidth;
          that.moveDistance = swpierWidth / 2; //移动步长
          that.halfDistance = that.moveDistance / 2;
          that.initDistance = that.halfDistance; //起始位置距离
          let boxWidth = (swpierWidth / 2) * that.newSwiper.length; //盒子总宽度
          that.$refs.box.style.width = boxWidth + "px";
          that.$refs.box.style.left = -that.initDistance + "px"; //起始位置
          that.setActive();
          let lis = that.$refs.boxItem;
          for (let i = 0; i < lis.length; i++) {
            lis[i].style.width = boxWidth / that.length + "px";
          }
        })
        if (this.isAutoPlay) {
          this.autoPlay();
        }
      },
      autoPlay() {
        let that = this;
        this.autoTimer = setInterval(function() {
          that.next();
        }, 2000);
      },
      showBtn() {
        this.btnShow = true;
        clearInterval(this.autoTimer);
      },
      hideBtn() {
        this.btnShow = false;
        this.autoPlay();
      },
      pre() {
        this.index--;
        if (this.index < 0) {
          //迅速切换到末尾对应位置
          this.$refs.box.style.left = -this.moveDistance * (this.length - 3) - this.halfDistance + "px";
          //平滑过渡
          this.index = (this.length - 4);
        }
        this.animate1(this.$refs.box, -this.moveDistance * this.index - this.halfDistance);
        this.setActive();
      },
      next() {
        this.index++;
        if (this.index > this.length - 3) {
          //迅速切换至开头对应位置
          this.$refs.box.style.left = -this.halfDistance + "px";
          //平滑过渡
          this.index = 1;
        }
        this.animate1(this.$refs.box, -this.moveDistance * this.index - this.halfDistance);
        this.setActive();
      },
      dotChange(index) {
        this.index = index;
        this.$refs.box.style.left = -this.moveDistance * this.index - this.halfDistance + "px";
        this.setActive();
      },
      setActive() {
        for (let i = 0; i < this.newSwiper.length; i++) {
          Vue.set(this.isImgActive, i, 0);
        }
        this.isImgActive[this.index + 1] = 1;
        for (let i = 0; i < this.swiperImg.length; i++) {
          Vue.set(this.isDotActive, i, 0);
        }
        if (this.index == this.length - 3) {
          this.isDotActive[0] = 1;
        } else {
          this.isDotActive[this.index] = 1;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
.slider
  position:relative;
  margin:0 auto;
  mx_wh(80%,185px);
  overflow hidden
  .dots
    mx_posbl(0,50%);
    transform translateX(-50%)
    &>span
      display inline-block
      mx_wh(20px,3px);
      background-color :#fff
      margin-right 3px
      cursor:pointer;
      &.active
        background-color red
  #arr
    #right,#left
      mx_postl(50%,0);
      transform translateY(-50%)
      mx_whlh(40px,40px,40px);
      mx_fc(30px,#fff);
      background:#000;
      cursor:pointer;
      text-align:center;
      font-weight:bold;
      font-family:'黑体';
      opacity:0.3;
      mx_bd(1px, #fff)
    #right
      right:0;
      left:auto;
  .box
    mx_posbl(0,0);
    height:100%
    mx_flex();
    align-items:flex-end
    &>li
      float:left;
      height:160px;
      position:relative;
      .mask
        mx_wh(100%,100%);
        mx_postl(0,0);
        background-color:rgba(7,17,27,0.5);
      &>img
        mx_wh(100%,100%);
      &.active
        height 185px
        transition all .5s
        .mask
          display none
</style>
