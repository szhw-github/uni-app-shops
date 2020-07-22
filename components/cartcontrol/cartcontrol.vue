<template>
  <div class="shopcart-detail">
    <div class="head border-bottom">
			<div class="text">购物车</div>
			<div class="clear" @click="hangdleClear">清空</div>
    </div>
    <scroll-view scroll-y="true" class="wrapper scroll-Y">
      <div class="foods">
        <div class="item border-bottom" v-for="(item,index) in foodsSelected" :key="index">
          <img class="item-img" :src="goods[item.i].foods[item.j].image">
          <span class="name">{{goods[item.i].foods[item.j].name}}</span>
          <span class="price">¥{{goods[item.i].foods[item.j].price}}</span>
					<div class="icon-wrapper" @click="handleIconClick(item.i,item.j,'remove')">
						<div class="iconfont remove">&#xe729;</div>
					</div>
					<div class="icon-wrapper">
						<div class="count">{{countList[item.i][item.j]}}</div>
					</div>
					<div class="icon-wrapper" @click="handleIconClick(item.i,item.j,'add')">
						<div class="iconfont add">&#xe726;</div>
					</div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters,mapActions} from 'vuex'
  export default {
    name: 'cartcontrol',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'foodsSelected'
      ]),
      ...mapState([
        'goods',
        'countList'
      ])
    },
    methods: {
      ...mapMutations([
        'changeCount',
        'initCountList'
      ]),
			...mapActions([
				'setShowCartcontrol'
			]),
      handleIconClick (i, j, type) {
        let delta = type === 'add' ? 1 : -1
        let count = this.countList[i][j] + delta
        this.changeCount({
          i: i,
          j: j,
          count: count
        })
      },
      hangdleClear () {
				this.setShowCartcontrol('clear')
        this.initCountList()
				
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  border-bottom()
  .shopcart-detail
    position absolute
    bottom 48rpx
    left 0
    right 0
    z-index 0
    max-height 305.5rpx
    background #fff
	  .head
				display flex
				line-height 40rpx
				padding-left 18rpx
				padding-right 18rpx
				background #f3f5f7
				font-size 18rpx
				.text
					flex 1
					text-align left
					color rgb(7,17,27)
				.clear
					flex 1
					text-align right
					color rgb(0,160,200)
		.wrapper
		  overflow hidden
		  max-height 265.5rpx
		  .foods
		    padding 0 18rpx
		    color grey
		    .item
		      display flex
		      height 58rpx
		      align-items center
		      .item-img
		        width 40rpx
		        height 40rpx
		        margin-right 4rpx
		        object-fit cover
		      .name
		        flex 1
		        text-align left
		        font-size 14rpx
		        color rgb(7,17,27)
		        margin-right 18rpx
		      .price
		        color red
		        font-size 14rpx
		        margin-right 12rpx
						font-weight 700
		      
					.add
						color rgb(0,160,220)
					.remove
						color rgb(0,160,220)
					.count
						font-size 10rpx
						color rgb(147,153,159)
						width 24rpx
						text-align center
</style>
