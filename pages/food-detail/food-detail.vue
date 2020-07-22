<template>
  <div class="food-detail">
    <div class="banner">
      <span class="icon-close icon"></span>
      <img class="food-img" :src="food.image" mode="aspectFill">
    </div>
    <div class="content border-bottom">
      <div class="food">
        <p class="name">{{food.name}}</p>
        <p class="detail">月售{{food.sellCount}}份 好评率{{food.rating}}</p>
        <p class="price">￥{{food.price}}</p>
        <p class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</p>
        <div class="add">加入购物车</div>
      </div>
      <div class="info">
        <p class="title">
          商品介绍
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
	
  export default {
    name: 'food-detail',
		data() {
			return {
				urlItem: null,
				foodClickedIndex: null,
				food: null
			}
		},
    computed: {
      ...mapState([
        'goods'
      ])
    },
		onLoad: function (option) {
		    let urlItem = JSON.parse(decodeURIComponent(option.item))
				this.food = this.goods[urlItem.i].foods[urlItem.j]
		}
  }
</script>

<style lang="stylus" scoped>
  @import "../../styles/variable.styl"
  @import "../../styles/mixins.styl"
  border-bottom()
  .food-detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    background $grey_bg
    .banner
      color #fff
      .food-img
        width 100%
        height 375rpx
        object-fit cover
      .icon
        position absolute
        top 10rpx
        left 10rpx
    .content
      .info
        padding 18rpx
        position relative
        background #fff
        .name
          font-size 14rpx
          font-weight 700
          color rgb(7,17,27)
          line-height 14rpx
          margin-bottom 8rpx
        .detail
          font-size 10rpx
          color $font_grey
          line-height 10rpx
          margin-bottom 18rpx
        .price
          font-size 14rpx
          font-weight 700
          color rgb(240,20,20)
        .old-price
          font-size 10rpx
          font-weight 700
          color rgb(147,153,159)
        .add
          position absolute
          right 18rpx
          bottom 18rpx
          width 74rpx
          height 24rpx
          line-height 24rpx
          font-size 10rpx
          border-radius 12rpx
          text-align center
          color #fff
          background $color_blue
</style>
