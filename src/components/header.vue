<template>
  <div class="header">
    <div class="left">
      <i class="icon-arrow-left" @click="goBackForward"></i>
      <h4 class="title">SoulBeats</h4>
    </div>
    <div class="right">
      <i></i>
      <i></i>
      <i class="icon-cross"></i>
    </div>
  </div>
</template>

<script type="es6">
  export default{
    methods: {
      goBackForward(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="stylus">
	.header
		box-sizing:border-box;
		overflow:hidden;
		height:30px;
		font-size :14px;
		line-height:30px;
		padding:0 20px;
		background-color #bc2f2e;
		color:#fff;
		cursor:default;
		.left
			float:left;
			&>i
				cursor:pointer;
			&>h4
				display:inline-block;
				margin-left:30px;
		.right
			float:right;
			&>i
				margin-left:30px;
</style>
