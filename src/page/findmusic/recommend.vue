<template>
  <div class="recommend">
    <swiper v-if="swiperImg" :swiperImg="swiperImg" :isAutoPlay=true></swiper>
  </div>
</template>

<script type="es6">
  import swiper from '../../components/swiper.vue'
  export default{
    components: {
      swiper,
    },
    data(){
      return {
        swiperImg: null,
        playlists: [],
        index: 0,
        loading: false,
      }
    },
    created(){
      this.fetchSwiper()
    },
    methods: {
      fetchSwiper(){
        let api = "http://112.74.56.114:8080/NetEaseMusicServer/image";
        this.loading = true;
        this.$http.get(api).then(response => {
          this.swiperImg = response.data;
          this.loading = false;
        }, response => {
          console.log('swpierImg error');
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
