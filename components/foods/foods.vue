<template>
	<scroll-view scroll-y="true" scroll-x="false" class="foods scroll-Y" @scroll="scroll"
	:scroll-into-view ="scrollInto"
	@touchstart.prevent = "setShowCartcontrol('touch')"
	>
		<div class="content-wrapper">
				<ul>
					<li class="category"
							v-for="(item,index_good) in goods"
							:key="index_good"
							:id="'item-'+index_good"
					>
						<div class="head border-left">{{item.name}}</div>
						<div class="food-wrapper food-wrapper-hook">
							<div class="food"
									 :class="{'border-top': index_food}"
									 v-for="(food,index_food) in item.foods"
									 :key="index_food"
							>
								<navigator class="link-to"
								:url="'/pages/food-detail/food-detail?item='+ encodeURIComponent(JSON.stringify({i:index_good,j:index_food}))">
									<div class="img-wrapper">
										<img class="food-img" :src="food.image" mode="aspectFill">
									</div>
									<div class="content">
										<div class="title">{{food.name}}</div>
										<div class="description" v-show="food.description!==''">{{food.description}}</div>
										<div class="sales">月售{{food.sellCount}}份 好评率{{food.rating}}% </div>
										<div class="price">
											<span class="actual-price" :style="{fontSize: food.oldPrice ? '14rpx' : '10rpx'}">¥{{food.price}}</span>
											<span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
										</div>
									</div>
								</navigator>
								<div class="icons">
									<div class="icon-wrapper"
									v-show="countList[index_good][index_food]"
									@click="handleIconClick(index_good,index_food,'remove')">
										<div class="iconfont remove">&#xe729;</div>
									</div>
									<div class="icon-wrapper" v-show="countList[index_good][index_food]">
										<div class="count">{{countList[index_good][index_food]}}</div>
									</div>
									<div class="icon-wrapper" @click="handleIconClick(index_good,index_food,'add')">
										<div class="iconfont add">&#xe726;</div>
									</div>
								</div>
								<div>
							</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroll-view>
	
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'foods',
    data () {
      return {
        showFood: false,
				heightList: [],
				scrollInto: '',
        foodClickedIndex: {
          i: 0,
          j: 0
        }
      }
    },
    computed: {
      ...mapState([
        'goods',
        'countList',
        'currentFoodType',
        'clickMenu'
      ])
		},
		watch:{
			clickMenu() {
				this.scrollInto = `item-${this.clickMenu}`
			}
		},
		methods:{
			...mapMutations([
				'setCurrentFoodType',
				'changeCount'
			]),
			...mapActions([
			  'setShowCartcontrol'
			]),
			getHeightList () {
				let view = uni.createSelectorQuery().in(this).selectAll(".category")
				view.fields({size: true}, data => {
					if(data.length) {
						let dataMap = data.map(res => {return res.height})
						dataMap.unshift(0)
						let heightList = dataMap.map((item,index,arr)=> {
							return function() {
								let currentArr = arr.slice(0, index + 1)
								return currentArr.reduce((total, currentValue) => {
									return parseInt(total + currentValue)
								})
							}()
						})
						this.heightList = heightList
					}
				}).exec()
			},
			scroll(event) {
				let scrollTop = event.detail.scrollTop
				let currentIndex = function (heightList) {
					for (let i = 0; i < heightList.length; i++) {
						if (scrollTop >= heightList[i] && scrollTop < heightList[i + 1]) {
							return i
						}
					}
					return 0
				}(this.heightList)
				
				if(this.currentFoodType !== currentIndex) {
					this.setCurrentFoodType(currentIndex)
				}
			},
			handleIconClick(i,j,type) {
				let delta = type === 'add' ? 1 : -1
				let count = this.countList[i][j] + delta
				this.changeCount({
				  i: i,
				  j: j,
				  count:count
				})
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.getHeightList()
			})
		}
	}
</script>

<style lang="stylus" scoped>
  @import "../../styles/variable.styl"
	@import "../../styles/mixins.styl"
	.border-top
	  &:before
	    border-color rgba(7,17,27,0.1)
	    border-width 2rpx
	.border-left
	  &:before
	    border-color #d9dde1
	    border-width 5rpx
	.scroll-Y
		overflow hidden
		position absolute
		top 174rpx
		left 80rpx
		bottom 46rpx
		.content-wrapper
			padding-right 10rpx
			.head
				padding-left 14rpx
				font-size 12rpx
				color rgb(147,153,159)
				line-height 24rpx
				font-weight 700
				background $grey_bg
			.food-wrapper
				.food
					position relative
					.link-to
						display flex
						.img-wrapper
							overflow hidden
							flex 0 0 auto
							width 60rpx
							height 60rpx
							.food-img
								height 100%
								width 100%
						.content
							flex 1
							margin-left 10px
							margin-top 2rpx
							.title
								font-size 14rpx
								color rgb(7,17,27)
								line-height 14rpx
								margin-top 2rpx
								margin-bottom 8rpx
							.description
								font-size 10rpx
								color rgb(147,153,159)
								line-height 12rpx
								margin-bottom 8rpx
							.sales
								font-size 10rpx
								color rgb(147,153,159)
								line-height 10rpx
								margin-bottom 8rpx
							.actual-price
								font-size 10rpx
								color red
								font-weight 700
								line-height 24rpx
							.old-price
								font-size 10rpx
								color rgb(147,153,159)
								font-weight 700
								line-height 24rpx
								text-decoration line-through
					.icons
						display flex
						overflow hidden
						flex 0 0 auto
						position absolute
						right 100rpx
						bottom 18rpx
						height 24rpx
						line-height 24rpx
						font-size 24rpx
						right 66px
						bottom 18px
						height 30px
						line-height 30px
						font-size 30px
						color rgb(0,160,220)
						.count
						  font-size 10rpx
						  color rgb(147,153,159)
						  width 24rpx
						  text-align center
</style>
