<template>
  <div class="header">
    <div class="left">
      <i class="icon-arrow-left" @click="goBackForward"></i>
      <h2 class="title">SoulBeats</h2>
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
@import '../common/style/mixin.styl'
	.header
		mx_brbox();
		mx_fc(14px,#fff);
		mx_hlh(30px,30px);
		overflow:hidden;
		padding:0 20px;
		background-color #bc2f2e;
		cursor:default;
		.left
			float:left;
			&>i
				cursor:pointer;
			&>h2
				display:inline-block;
				margin-left:30px;
		.right
			float:right;
			&>i
				margin-left:30px;
</style>
