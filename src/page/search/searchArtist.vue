<template>
<div class="searchArtist" ref="index" @scroll="scrollMore('index','searchArtist')">
  <ul class="artists" v-if="!loading">
    <li class="artist" v-for="artist in searchRes">
      <router-link :to="{path: '/artist/' + artist.id}">
        <img class="cover" :src="artist.img1v1Url" alt=""/>
        <span class="name">{{artist.name}}</span>
      </router-link>
    </li>
  </ul>
</div>
</template>

<script type="es6">
  export default{
    data(){
      return {
        searchRes:[],
        ajaxFlag:1,
        limit:20,
        offset:1,
        loading:true,
      }
    },
    created(){
      this.fetchData(this.limit,this.offset,"searchArtist");
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.searchArtist
	.artists
		.artist
			height:70px;
			text-align:left;
			overflow:hidden;
			&>a
				display:block;
				height:70px;
				padding:10px;
				box-sizing:border-box;
				.cover
					width:50px;
					height:50px;
					margin-right:5px;
				.name
					display:inline-block;
					height:50px;
					line-height :50px;
					vertical-align:top;
					color:#5584b2;
					font-size:17px
			&:nth-child(odd)
				background-color:#f4f4f6;
</style>
