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
  @import "~styles/variable.styl"
  @import "~styles/mixins.styl"
  border-bottom()
  .scroll-Y
    overflow hidden
    position absolute
    top 174px
    left 0
    bottom 46px
    background $grey_bg
    .menu-item
      display table
      height 54px
      padding 0 12px
      &.current
        background #fff
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 14px
          font-weight 500
      .text
        display table-cell
        vertical-align middle
        height 54px
        line-height 14px
        width 56px
        padding 0 auto
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
      .icon
        display inline-block
        vertical-align middle
        width 12px
        height 12px
        margin-right 4px
        background-size 12px 12px
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
