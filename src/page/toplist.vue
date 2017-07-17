<template>
  <div class="toplist">
    <loading v-if="loading"></loading>
    <div class="content" v-if="toplists">
      <h4>排行榜</h4>
      <!--官方榜-->
      <h3>官方榜</h3>
      <ul class="special">
        <li v-for="toplist in neteaseSpec">
          <router-link :to="{path: '/playlistDetail' ,query:{id: toplist.id}}">
            <img :src="toplist.coverUrl" alt="" class="cover">
            <ul class="top3">
              <li v-for="(song,index) in toplist.songs">
                <span class="no">{{index+1}}.</span>
                <span class="name">{{song.name}} - </span>
                <span class="songArtists">
                  <span v-for="artist in song.ar">
                    <router-link :to="{path: '/artist/' + artist.id}">{{artist.name + " "}}</router-link>
                  </span>
                </span>
              </li>
            </ul>
          </router-link>
        </li>
      </ul>
     <!-- 第三方榜-->
     <h3>全球榜</h3>
      <ul class="global">
        <li v-for="toplist in global">
          <router-link :to="{path: '/playlistDetail' ,query:{id: toplist.id}}">
            <img :src="toplist.coverUrl" alt="" class="cover">
            <span class="listName">{{toplist.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  import loading from '../components/loading.vue'
  export default {
    data(){
      return {
        toplists:null,
        neteaseSpec:[],
        global:[],
        loading: false,
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
        this.loading=true;
        let url = 'http://112.74.56.114:8080/NetEaseMusicServer/fuckzzw';
        this.$http.get(url).then(response => {
          this.loading=false;
          this.toplists = response.data;
          this.neteaseSpec=this.toplists.special;
          this.global=this.toplists.global;
          //console.log(this.toplists);
        }, response => {
          console.log('toplist error');
        });
      },
    },
    components: {
      loading,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/style/mixin.styl'
.toplist
  padding:20px 5%;
  text-align:left;
  .content
    .special
      mx_flex();
      flex-wrap:wrap;
      justify-content:space-between;
      text-align:left;
      color:#818181;
      &>li
        mx_wh(48%,120px);
        border:1px solid rgba(7,17,27,0.2);
        margin-bottom:30px; 
        &>a
          mx_wh(100%,100%);
          mx_flex();
          cursor:default;
          .cover
            mx_wh(120px,120px);
          .top3
            mx_flex_item(1);
            mx_wh(1px,100%);
            padding-top:30px;
            padding-left:10px;
            &>li
              mx_hlh(20px,20px);
              margin-bottom:5px;
              mx_single_ellipsis();
              .songArtists
                &>span
                  &>a
                    color:#818181;
    .global
      mx_flex();
      flex-wrap:wrap;
      mx_fc(15px,#000);
      &>li
        mx_wh(150px,180px);
        margin-right:20px;
        margin-bottom:30px;
        overflow:hidden;
        &>a
          cursor:default;
          display:block;
          height:100%;
          .cover
            mx_wh(100%,150px);
            margin-bottom:10px;
          .listName
            display:block;
            mx_single_ellipsis();
</style>
