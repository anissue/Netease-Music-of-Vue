//全局方法 挂载到Vue原型上
export default {
  install(Vue, options) {
    Vue.prototype.scrollMore = function (elem, flag) {//滚动到底部加载更多
      let scroll = this.$refs[elem].scrollTop;
      let visiHeight = this.$refs[elem].clientHeight;
      let fullHeight = this.$refs[elem].scrollHeight;
      if (scroll + visiHeight >= fullHeight && this.ajaxFlag === 1) {
        this.fetchData(this.limit, this.offset, flag);
        this.ajaxFlag = 0;
      }
    };
    Vue.prototype.fetchData = function (limit, offset, flag) {
      let url;
      if (flag == "searchSong") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=";
      } else if (flag == "searchArtist") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=100&s=";
      } else if (flag == "searchPlaylist") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s=";
      }
      if (this.$route.query['key'] == "") {
        alert("请输入关键字");
        return;
      } else {
        url = url + this.$route.query['key'] + "&limit=" + limit + "&offset=" + offset;
      }
      this.$http.get(url).then(response => {
        this.loading = false;
        if (flag === "searchSong") {
          this.searchRes = [...this.searchRes, ...response.data.result.songs];
        } else if (flag === "searchArtist") {
          if (response.data.result.artists == undefined) {
            alert('Api无法提供该歌手信息');
            return;
          } else {
            this.searchRes = [...this.searchRes, ...response.data.result.artists];
          }
        } else if (flag === "searchPlaylist") {
          this.searchRes = [...this.searchRes, ...response.data.result.playlists];
        }
        this.offset = this.offset + 1;
        this.ajaxFlag = 1;
      }, response => {
        console.log('searchSong error');
      });
    };
    Vue.prototype.animate1 = function (elem, final_x) {
      if (elem) {
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
          let x = parseInt(elem.style.left) || 0;
          if (Math.abs(x - final_x) <= 5) {
            clearInterval(elem.timer);
            //console.log(1);
            return true;
          }
          //dist会随着x的增大而变小，也就是加速度变小了，有一个渐变的效果
          let distx = (final_x - x) / 10;
          distx = distx > 0 ? Math.ceil(distx) : Math.floor(distx);
          x = x + distx;
          elem.style.left = x + "px";
        }, 25);
      }
    };
    Vue.prototype.formatTimeStamp = (timeStamp) => {
      const time = new Date(timeStamp);
      let year = time.getFullYear(),
        month = time.getMonth(),
        day = time.getDay(),
        hours = time.getHours(),
        minute = time.getMinutes(),
        seconds = time.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minute}:${seconds}`
    };
  },
}
