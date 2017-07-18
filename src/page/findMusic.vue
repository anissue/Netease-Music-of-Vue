<template>
  <div class="findMusic" ref="findMusic">
    <h4>发现音乐</h4>
    <nav class="nav">
      <ul class="links">
        <li>
          <router-link to="/special">个性推荐</router-link>
        </li>
        <li>
          <router-link to="/playlist">歌单</router-link>
        </li>
        <li>
          <router-link to="/dj">主播电台</router-link>
        </li>
        <li>
          <router-link to="/newest">最新音乐</router-link>
        </li>
        <li>
          <router-link to="/singer">歌手</router-link>
        </li>
      </ul>
    </nav>
    <keep-alive>
      <router-view class="children" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="children" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="es6">
  export default {
  
  }
</script>

<style lang="stylus">
@import '../common/style/mixin.styl'
.findMusic
  mx_pagepadding();
  position:relative;
  .children
    position:absolute;
    width:95%;
    height:600px;
    top:100px;
    bottom:0;
    overflow:auto;
	.nav
		position:absolute;
		left:30px;
		top:40px;
		width:90%;
		overflow:hidden;
		border-bottom:1px solid rgba(7,17,27,0.2);
		.links
			overflow:hidden;
			&>li
				float:left;
				margin-right:25px;
				&>a
					display:block;
					font-size:15px;
					height:40px;
					line-height:40px;
					color:#000;
					&.active
						border-bottom:2px solid #c62e2e;
</style>
