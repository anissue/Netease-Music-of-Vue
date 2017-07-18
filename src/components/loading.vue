<template>
	<div class="loading">
		<i class="icon-spinner10"></i>
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
	margin:0 auto;
	margin-top:50px;
	width:30px;
	height:30px;
	background-color #fafafc;
	animation: roll 4s  linear infinite;
	position:relative;
	.icon-spinner10
		mx_posc();
		font-size:30px;
		color:#df3b3b;
</style>
