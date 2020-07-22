<template>
	<div class="btn-area border-bottom">
		<div class="wrapper ">
			<div class="btn" @click ="handleSwitchTo('order')">点餐</div>
		</div>
		<div class="wrapper">
			<div class="btn" @click = "handleSwitchTo('ratings')">评论</div>
		</div>
		<div class="wrapper">
			<div class="btn" @click = "handleSwitchTo('seller')">商家</div>
		</div>
	</div>
	
</template>

<script>
    export default {
      name: "tag",
			methods: {
				handleSwitchTo (path) {
					uni.navigateTo({
					    url: `/pages/${path}/${path}`
					})
				}
			}
    }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  border-bottom()
	.btn-area
		display flex
		.wrapper
			line-height 40px
			margin auto
			font-size 14px
			color rgb(77,85,93)		
</style>
