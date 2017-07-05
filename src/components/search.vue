<template>
  <div class="search" ref="search">
    <div class="loading" v-if="loading">
      <img src="/static/loading.gif" alt="Loading...">
    </div>
    <div class="searchBar">
      <input class="searchVal"
             type="text"
             placeholder="请输入歌曲名"
             v-model="message"
             @keyup.enter="search"/>
      <button
        class="searchBtn mdui-textfield-icon mdui-btn mdui-btn-icon"
        @click="search">
        <i class="mdui-icon material-icons">&#xe8b6;</i>
      </button>
    </div>
    <div class="result">
      <ul class="mdui-list mdui-list-dense">
        <li class="song mdui-list-item mdui-ripple"
            v-for="(song,index) in searchRes">
          <div class="no mdui-list-item-content">{{index+1}}.</div>
          <div class="songName mdui-list-item-content ">{{song.name}}</div>
          <div class="songArtists mdui-list-item-content">
          <span v-for="artist in song.ar">
            <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
          </span>
          </div>
          <div class="songAlbum mdui-list-item-content">{{song.al.name}}</div>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="addSong(song)">&#xe145;</i>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="nowSong(song)">&#xe037;</i>
          <i class="mdui-list-item-icon mdui-icon material-icons"
             @click="favo(song)">&#xe87e;</i>
        </li>
      </ul>
    </div>
    <div class="btn mdui-row-xs-2" v-show="showBtn">
      <div class="mdui-col">
        <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple" @click="prePage">上一页</button>
      </div>
      <div class="mdui-col">
        <button class="mdui-btn mdui-btn-block mdui-color-theme-accent mdui-ripple" @click="nextPage">下一页</button>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        message: "",
        loading: false,
        searchRes: null,
        showBtn: false,
        index: 0,
        favoSong:[]
      }
    },
    created(){
      this.searchLocal();
    },
    methods: {
      search(){
        let url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=";
        url = url + this.message +"&limit=20"+ "&offset=" + this.index;
        this.loading = true;
        this.$http.get(url).then(response => {
          this.loading = false;
          this.searchRes = response.data.result.songs;
          //console.log(this.searchRes);
        }, response => {
          console.log('search error');
        });
        this.showBtn = true;
      },
      prePage(){
        if (this.index == 0) {
          return;
        } else {
          this.index = this.index - 1;
        }
        this.search();
        this.scrollToHead();
      },
      nextPage(){
        this.index = this.index + 1;
        this.search();
        this.scrollToHead();
      },
      scrollToHead(){//保证滚动条在最顶部
        this.$refs.search.scrollTop = 0;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search
	.loading
		width:100%;
		height:100%;
		background-color:#353535;
		text-align:center;
	.searchBar
		.searchVal
			border:none;
			line-height:27px;
			padding:0 10px;
			color:#777777;
			font-size:16px;
			font-weight:bold;
			border-radius:5px;
			&:focus
				color:#000;
	.result
		&>ul
			.song
				display:flex;
				.no
					flex:1;
				.songName
					flex:3;
				.songArtists
					flex:3;
				.songAlbum
					flex:3;
					&>i
						cursor:pointer;
</style>
