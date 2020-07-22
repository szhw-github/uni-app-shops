<template>
  <div class="home-header" v-if="seller">
	 <div v-show="showMore">
		 <head-detail @close="closeMore"></head-detail>
	  </div>
    <div class="backgroud">
      <img class="backgroud-img" :src="seller.avatar">
    </div>
    <div class="content-wrapper">
      <img class="avatar" :src="seller.avatar"/>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}},满50减10</span>
        </div>
      </div>
      <div class="supports-count" @click="handleClickMore">
        <div class="count">{{seller.supports.length}}个</div>
        <div class="icon-keyboard_arrow_right"></div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div class="icon"></div>
      <div class="bulletin">{{seller.bulletin}}</div>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
  </div> 
</template>

<script>
	import HeadDetail from './head-detail'
  import {mapState} from 'vuex'
  export default {
    name: 'page-head',
    data () {
      return {
        showMore: false,
				classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    computed: {
      ...mapState([
        'seller'
      ])
    },
		components:{
			HeadDetail
		},
    methods: {
      closeMore () {
        this.showMore = false
      },
			handleClickMore () {
				this.showMore = true
			}
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .home-header
    color #fff
    background rgba(7,17,27,0.5)
    .backgroud
      position fixed
      overflow hidden
      width 100%
      height 106rpx
      z-index -1
      filter blur(10rpx)
    .backgroud-img
      width 100%
    .content-wrapper
      display flex
      position relative
      padding 24rpx 12rpx 18rpx 24rpx
      .avatar
        width 64rpx
        height 64rpx
        border-radius 2rpx
      .content
        font-size 12rpx
        margin 2px 0 2rpx 12rpx
        .title
          display flex
          line-height 18rpx
          margin-bottom 8rpx
          .brand
            width 30rpx
            height 18rpx
            background-size 30rpx 18rpx
            bg-icon("brand")
            margin-right 6rpx
          .name
            font-size 16rpx
            font-weight bold
        .description
          height 12rpx
          font-size 12rpx
          font-weight 200
          margin-bottom 10rpx
        .supports
          display flex
          line-height 12rpx
          .icon
            width 12rpx
            height 12rpx
            background-size 12rpx 12rpx
            margin-right 4rpx
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
            height 12rpx
            font-size 10rpx
            font-weight 200
            margin-bottom 0
      .supports-count
        position absolute
        display flex
        right 12rpx
        bottom 13rpx
        line-height 24rpx
        padding 0 8rpx
        border-radius 12rpx
        background-color rgba(0,0,0,0.2)
        font-size 10rpx
        .count
          font-width 200
          margin-right 2rpx
        .icon-keyboard_arrow_right
          line-height 24rpx
    .bulletin-wrapper
      display flex
      align-items center
      padding 0 10rpx
      height 28rpx
      min-width : 0
      background-color red
      font-size 10rpx
      background rgba(7,17,27,0.2)
      .icon
        flex 0 0 auto
        width 22rpx
        height 12rpx
        align-items center
        background-size 22rpx 12rpx
        bg-icon("bulletin")
        background-repeat no-repeat
      .bulletin
        margin 0 4rpx
        font-weight 200
        padding 0
        ellipsis()
      .icon-keyboard_arrow_right
        align-items center
        color #fff

</style>
