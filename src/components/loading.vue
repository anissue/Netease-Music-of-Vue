<template>
	<div class="loading">
		<img class="loading-img" src="/static/loading.gif">
	</div>
</template>
<script>
export default {
	name: "load"
}
</script>
<style lang="stylus">
@import '../common/style/mixin.styl'
.loading
	mx_wh(100px,100px);
	margin:200px auto;
	.loading-img
		mx_wh(100%,100%);
</style>
