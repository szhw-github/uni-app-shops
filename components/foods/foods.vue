<template>
	<div>
		
	<scroll-view scroll-y="true" class="foods scroll-Y" @scroll="scroll"
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
								<div class="link-to" @click="handleFoodClick(index_good,index_food)">
									<div class="img-wrapper">
										<img class="food-img" :src="food.image" mode="aspectFill">
									</div>
									<div class="content">
										<div class="title">{{food.name}}</div>
										<div class="description" v-show="food.description!==''">{{food.description}}</div>
										<div class="sales">月售{{food.sellCount}}份 好评率{{food.rating}}% </div>
										<div class="price">
											<span class="actual-price" :style="{fontSize: food.oldPrice ? '14px' : '10px'}">¥{{food.price}}</span>
											<span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
										</div>
									</div>
								</div>
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
		<div class="food-detail-wrapper" v-show="showFood">
			<food-detail :food="foodClicked" :index="foodClickedIndex" @closeFoodDetail="closeFoodDetail"></food-detail>
		</div>
	</div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'foods',
    data () {
      return {
				foodClicked: null,
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
			},
			handleFoodClick(i,j) {
				this.showFood =true
				this.foodClicked = this.goods[i].foods[j]
			},
			closeFoodDetail() {
				this.showFood = false
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
	    border-width 2px
	.border-left
	  &:before
	    border-color #d9dde1
	    border-width 5px
	.scroll-Y
		overflow hidden
		position absolute
		top 174px
		left 80px
		bottom 46px
		z-index 0
		.content-wrapper
			padding-right 10px
			.head
				padding-left 14px
				font-size 12px
				color rgb(147,153,159)
				line-height 24px
				font-weight normal/700
				background $grey_bg
			.food-wrapper
				padding 0 18px
				.food
					padding 18px 0
					position relative
					.link-to
						display flex
						.img-wrapper
							overflow hidden
							flex 0 0 auto
							width 60px
							height 60px
							.food-img
								height 100%
								width 100%
						.content
							flex 1
							margin-left 10px
							margin-top 2px
							.title
								font-size 14px
								color rgb(7,17,27)
								line-height 14px
								margin-top 2px
								margin-bottom 8px
							.description
								font-size 10px
								color rgb(147,153,159)
								line-height 12px
								margin-bottom 8px
							.sales
								font-size 10px
								color rgb(147,153,159)
								line-height 10px
								margin-bottom 8px
							.actual-price
								font-size 10px
								color red
								font-weight 700
								line-height 24px
							.old-price
								font-size 10px
								color rgb(147,153,159)
								font-weight 700
								line-height 24px
								text-decoration line-through
					.icons
						display flex
						flex 0 0 auto
						position absolute
						right 66px
						bottom 18px
						height 30px
						line-height 30px
						font-size 30px
						color rgb(0,160,220)
						.count
						  font-size 10px
						  color rgb(147,153,159)
						  width 24px
						  text-align center
</style>
