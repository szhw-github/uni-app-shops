<template>
  <div class="shopcart-detail">
    <div class="head border-bottom">
      <span class="text">购物车</span>
      <span class="clear" @click="hangdleClear">清空</span>
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
    bottom 48px
    left 0
    right 0
    z-index 0
    max-height 305.5px
    background #fff
    .head
      display flex
      line-height 40px
      padding-left 18px
      padding-right 18px
      background #f3f5f7
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
      max-height 265.5px
      .foods
        padding 0 18px
        color grey
        .item
          display flex
          height 58px
          align-items center
          .item-img
            width 40px
            height 40px
            margin-right 4px
            object-fit cover
          .name
            flex 1
            text-align left
            font-size 14px
            color rgb(7,17,27)
            margin-right 18px
          .price
            color red
            font-size 14px
            margin-right 12px
						font-weight 700
          
					.add
						color rgb(0,160,220)
					.remove
						color rgb(0,160,220)
					.count
						font-size 10px
						color rgb(147,153,159)
						width 24px
						text-align center
</style>
