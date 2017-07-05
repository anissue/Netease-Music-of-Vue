// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/mdui.css'
import './common/style/reset.css'
import './common/style/fonts.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.fetchMp3Url = function (song, method) {
  let url = "https://api.imjad.cn/cloudmusic/?type=song&id=";
  this.$http.get(url + song.id).then(response => {
    let mp3Url = response.data.data[0].url;
    if (mp3Url == "null") {
      song.name = "该资源暂时无法获取";
    }
    let combinedSong = {
      mp3Url: mp3Url,
      imgUrl: song.al.picUrl,
      name: song.name,
      artist: song.ar,
    }
    this.$emit(method, combinedSong);
  }, response => {
    console.log('detail error');
  })
};
Vue.prototype.nowSong = function (song) {
  this.fetchMp3Url(song, "nowSong");
};
Vue.prototype.addSong = function (song) {
  this.fetchMp3Url(song, "addSong");
};
Vue.prototype.favo = function (song) {
  this.searchLocal();//防止favo组件内部favoSong在删除条目后其他组件内部favoSong未及时得到更新，同步组件的favoSong
  let combinedSong = {
    id: song.id,
    name: song.name,
    ar: song.ar,
    al: song.al,
  }
  this.favoSong.push(combinedSong);
  let favoSongStr = JSON.stringify(this.favoSong);
  localStorage.setItem('favoSong', favoSongStr);
};
Vue.prototype.searchLocal = function () { //在组件初始化时或者添加收藏歌曲时同步favoSong
  if (localStorage.getItem('favoSong')) {
    this.favoSong = [...JSON.parse(localStorage.getItem('favoSong'))];
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
