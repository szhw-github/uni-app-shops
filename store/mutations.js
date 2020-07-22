import Vue from 'vue'
export default {
  initCountList (state) {
    state.initializedCountList = []
    state.countList = []
    if (state.goods.length) {
      for (let i = 0; i < state.goods.length; i++) {
        let foodsLength = state.goods[i].foods.length
        state.initializedCountList.push(new Array(foodsLength).fill(0))
        state.countList.push(new Array(foodsLength).fill(0))
      }
    }
  },
  changeCount (state, data) {
    let i = data.i
    let j = data.j
    let count = data.count
    Vue.set(state.countList[i], j, count)
  },
  setCurrentFoodType (state, currentFoodType) {
    state.currentFoodType = currentFoodType
  },
  setClickMenu (state, index) {
    state.clickMenu = index
  },
  addCount (state, item) {
    state.countList.push(item)
  },
  getGoods (state, goods) {
    state.goods = goods
  },
  getSeller (state, seller) {
    state.seller = seller
  },
  getRatings (state, ratings) {
    state.ratings = ratings
  },
  setShowCartcontrol (state, action) {
    if (action === 'click') {
      state.showcartcontrol = !state.showcartcontrol
    }
    if (action === 'touch') {
      state.showcartcontrol = false
    }
		if (action === 'clear') {
		  state.showcartcontrol = false
		}
  },
  handleAddClicked (state, element) {
    state.elementClicked.push(element)
  },
  getFoodClickedIndex (state, index) {
    state.foodClickedIndex.i = index.i
    state.foodClickedIndex.j = index.j
    console.log(state.foodClickedIndex)
  }
}
