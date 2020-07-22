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
  @import "~styles/variable.styl"
  @import "~styles/mixins.styl"
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
        height 375px
        object-fit cover
      .icon
        position absolute
        top 10px
        left 10px
    .content
      .info
        padding 18px
        position relative
        background #fff
        .name
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
          margin-bottom 8px
        .detail
          font-size 10px
          color $font_grey
          line-height 10px
          margin-bottom 18px
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
        .old-price
          font-size 10px
          font-weight 700
          color rgb(147,153,159)
        .add
          position absolute
          right 18px
          bottom 18px
          width 74px
          height 24px
          line-height 24px
          font-size 10px
          border-radius 12px
          text-align center
          color #fff
          background $color_blue
</style>
