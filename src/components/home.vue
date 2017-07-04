<template>
  <div id="container">
    <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
    <div class="swiper" v-if="swiperImg">
      <swiper :options="swiperOption">
        <swiper-slide v-for="swiper in swiperImg">
          <img :src="swiper.imgurl" alt=""/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <ul class="playlists">
      <li class="playlist" v-for="playlist in playlists">
        <div class="cover">
          <router-link :to="{path: '/playlist/' + playlist.id}"><img :src="playlist.imgUrl" class="mdui-img-rounded"/></router-link>
        </div>
        <div class="mdui-typo-caption">{{playlist.title}}</div>
      </li>
    </ul>
    <button class="mdui-btn mdui-btn-block mdui-color-blue-grey-900 mdui-ripple"
            @click="getMore">点击加载
    </button>
  </div>
</template>

<script type="es6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'home',
    data(){
      return {
        swiperImg: null,
        playlists: [],
        index: 0,
        loading: false,
        swiperOption: {
          //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          autoplay: 3000,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 30,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created(){
      this.fetchPlaylist(10, this.index);
      this.fetchSwiper();
    },
    methods: {
      fetchPlaylist(limit, page){
        let playlistApi = "http://112.74.56.114:8080/NetEaseMusicServer/index?limit=";
        let api = playlistApi + limit + "&pagenum=" + page;
        this.$http.get(api).then(response => {
          this.playlists = [...this.playlists, ...response.data];
          this.index = this.index + 1;
          //console.log(this.playlists);
        }, response => {
          console.log('playlists error');
        });
      },
      fetchSwiper(){
        let api = "http://112.74.56.114:8080/NetEaseMusicServer/image";
        this.loading = true;
        this.$http.get(api).then(response => {
          this.swiperImg = response.data;
          this.loading = false;
          //console.log(this.swiperImg);
        }, response => {
          console.log('swpierImg error');
        });
      },
      getMore(){
        this.fetchPlaylist(10, this.index);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loading
  width:100%;
  height:100%;
  background-color:#353535;
  text-align:center;
.playlists
  display:flex;
  flex-wrap:wrap;
  aligin-items:center;
  justify-content:space-between;
  padding:25px;
  .playlist
    width:140px;
    height:180px;
    margin-bottom:10px;
    box-shadow: -1px 0px 5px #000;
    overflow:hidden;
    .cover
      width:100%;
      height:140px;
      margin-bottom:10px;
    .mdui-typo-caption
      color:#000;
</style>
