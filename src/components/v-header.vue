<template>
  <div class="mdui-tab mdui-tab-centered mdui-color-black" mdui-tab>
    <div class="title mdui-typo-headline">Soul Beats</div>
    <router-link to="/home" class="mdui-ripple-white">首页</router-link>
    <router-link to="/favo" class="mdui-ripple-white">喜欢</router-link>
    <router-link to="/toplist" class="mdui-ripple-white">榜单</router-link>
    <router-link to="/search" class="mdui-ripple-white">搜索</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mdui-tab
    border-bottom:1px solid rgba(7,17,27,0.2);
    .title
    	position:absolute;
    	left:30px;
    	top:50%;
    	transform:translate(0,-50%);
    	cursor:default;
</style>
