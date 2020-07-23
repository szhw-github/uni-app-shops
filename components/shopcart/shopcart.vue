<template>
  <div class="container">
		<div v-show="showcartcontrol">
			<cartcontrol></cartcontrol>
		</div>
    <div class="count" v-show="show">{{foodsTotalCount}}</div>
    <div class="shopcart">
      <div class="circle">
      </div>
      <div class="icon-wrapper" :class="{icon_wrapper_actived: show}" @click="setShowCartcontrol('click')">
        <span class="iconfont icon" :class="{icon_actived: show}">&#xe73c;</span>
      </div>
      <div class="total-price" :class="{'total-price-active': show}">¥{{totalPrice}}</div>
      <p class="text">另需配送费4元</p>
      <div class="buttom">¥20起送</div>
      <div class="buttom" :class="{buttom_actived: show}" v-show="show">去结算</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'shopcart',
    components: {
    },
    computed: {
      ...mapGetters([
        'foodsSelected'
      ]),
      ...mapState([
        'showcartcontrol',
        'totalPrice'
      ]),
      foodsTotalCount () {
        this.getTotalPrice()
        let count = 0
        for (let i = 0; i < this.foodsSelected.length; i++) {
          count += this.foodsSelected[i].count
        }
        return count
      },
      show () {
        return this.foodsSelected.length
      }
    },
    methods: {
      ...mapActions([
        'setShowCartcontrol',
        'getTotalPrice'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    z-index 10
    .count
      z-index 1
      position fixed
      left 44rpx
      bottom 42rpx
      width 24rpx
      height 16rpx
      border-radius 12rpx
      text-align center
      color #fff
      font-size 9rpx
      font-weight 700
      line-height 16rpx
      background red
    .shopcart
      display flex
      position absolute
      bottom 0
      left 0
      right 0
      height 48rpx
      line-height 48rpx
      text-align center
      color rgba(255,255,255,0.4)
      background #141d27
      .circle
        position absolute
        left 12rpx
        bottom 2rpx
        height 56rpx
        width 56rpx
        background #141d27
        border-radius 50%
      .icon-wrapper
        position absolute
        left 18rpx
        bottom 8rpx
        height 44rpx
        width 44rpx
        background rgba(255,255,255,0.2)
        border-radius 50%
        line-height 48rpx
      .icon_wrapper_actived
        background rgb(0, 160, 200)
      .icon
        font-size 24rpx
        color rgba(255,255,255,0.4)
      .icon_actived
        color #fff
      .total-price
        font-size 16rpx
        font-weight 700
        margin-left 80rpx
        margin-right 12rpx
      .total-price-active
        color #fff
      .text
        text-align left
        font-size 16rpx
        font-size 10px
        font-weight 200
        padding-left 12rpx
        padding-right 12rpx
      .buttom
        position absolute
        right 0
        bottom 0
        height 48rpx
        font-size 12rpx
        font-weight 700
        width 105rpx
        padding-left 8rpx
        padding-right 8rpx
        background rgba(255,255,255,0.2)
      .buttom_actived
        background red
        color #fff
        font-size 15rpx

</style>
