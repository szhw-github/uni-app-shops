<template>
  <div class="container" v-if="seller">
    <div class="name">{{seller.name}}</div>
		<star class="star" :score="seller.score" :size="24"></star>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					enable-flex=true
					>
				<div class="content-wrapper">
					<div class="header">
						<div class="line"></div>
						<p class="text">优惠信息</p>
						<div class="line"></div>
					</div>
					<div class="supports-wrapper">
						<div class="supports" v-for="item in seller.supports" :key="item.type">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</div>
					</div>
					<div class="header">
						<div class="line"></div>
						<p class="text">商家公告</p>
						<div class="line"></div>
					</div>
					<div class="bulletin">{{seller.bulletin}}</div>
				</div>
    </scroll-view>
		<div class="icon-wrapper">
			<div class="iconfont icon-close" @click="closeDetail">&#xe723;</div>
		</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
		props: {
			showMore: Boolean
		},
		data () {
			return {
				classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
			}
		},
    computed: {
      ...mapState([
        'seller'
      ])
    },
    methods: {
      closeDetail() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .container
    position fixed
    z-index 10
    top 0
    left 0
    right 0
    bottom 0
    text-align center
    color #fff
    background rgba(7,17,27,0.8)
    .name
      margin-top 64px
      margin-bottom 16px
      font-size 16px
      font-weight 700
		.icon-wrapper
			position fixed
			left 50%
			bottom 32px
			transform translateX(-50%)
			font-size 32px
			.icon-close
				font-size 26px
				color rgba(255,255,255,0.5)
	.scroll-Y
		overflow hidden
		position absolute
		top 148px
		bottom 92px
		.content-wrapper
			padding 0 36px
			.header
				display flex
				align-items center
				margin-bottom 28px
				.text
					flex none
					font-size 14px
					margin 0 28px
				.line
					width 100%
					height 0
					border-top 2px solid rgba(255,255,255,0.2)
			.supports-wrapper
				padding 0 12px 28px 12px
				.supports
					display flex
					align-items center
					margin-top 12px
					.icon
						width 16px
						height 16px
						background-size 16px 16px
						margin-right 6px
						background-repeat no-repeat
						&.decrease
							bg-icon("decrease_1")
						&.discount
							bg-icon('discount_1')
						&.guarantee
							bg-icon('guarantee_1')
						&.invoice
							bg-icon('invoice_1')
						&.special
							bg-icon('special_1')
					.text
						height 12px
						font-size 10px
						font-weight 200
						margin-bottom 0
			.bulletin
					margin 24px 12px 0 12px
					font-size 12px
					line-height 24px
					text-align left
					font-weight 200
	.container >>> .star
		position absolute
		left 50%
		transform translateX(-50%)
		margin-bottom 28px
</style>
