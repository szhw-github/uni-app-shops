<template>
	<scroll-view scroll-y="true" class="scroll-Y" v-if="goods">
    <ul>
      <li class="menu-item"
          v-for="(item,index) in goods"
          :class="{current:index === currentFoodType}"
					:key="index"
      >
        <div class="text border-bottom"
             :class="'goods_'+index"
             @click="handleMenuItemClick(index)"
        >
              <span class="icon"
                    v-if="item.type>0"
                    :class="classMap[item.type]"
              ></span>
          {{item.name}}
        </div>
      </li>
    </ul>
	</scroll-view>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name: "foodsmenu",
    data () {
      return {
				classMap : ['decrease','discount','guarantee','invoice','special']
      }
    },
    computed: {
      ...mapState([
        'goods',
        'currentFoodType',
				'clickMenu'
      ])
    },
    methods: {
      handleMenuItemClick(index) {
        if (index !== this.currentFoodType)
        this.setCurrentFoodType(index)
				this.setClickMenu(index)
      },
      ...mapMutations([
        'setCurrentFoodType',
				'setClickMenu'
      ]),
      ...mapActions([
        'handleEvent'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../styles/variable.styl"
  @import "../../styles/mixins.styl"
  border-bottom()
  .scroll-Y
    overflow hidden
    position absolute
    top 174rpx
    left 0
    bottom 46rpx
    background $grey_bg
    .menu-item
      display table
      height 54rpx
      padding 0 12rpx
      &.current
        background #fff
        .text
          font-size 12rpx
          color rgb(7,17,27)
          line-height 14rpx
          font-weight 500
      .text
        display table-cell
        vertical-align middle
        height 54rpx
        line-height 14rpx
        width 56rpx
        padding 0 auto
        font-size 12rpx
        font-weight 200
        color rgb(77,85,93)
      .icon
        display inline-block
        vertical-align middle
        width 12rpx
        height 12rpx
        margin-right 4rpx
        background-size 12rpx 12rpx
        background-repeat no-repeat
        &.decrease
          bg-icon("decrease_3")
        &.discount
          bg-icon('discount_3')
        &.guarantee
          bg-icon('guarantee_3')
        &.invoice
          bg-icon('invoice_3')
        &.special
          bg-icon('special_3')
</style>
