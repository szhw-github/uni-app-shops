<template>
  <div id="app">
		<page-head></page-head>
		<tag></tag>
		<foodsmenu></foodsmenu>
		<foods></foods>
		<shopcart></shopcart>
  </div>
</template>

<script>
  import api from 'common/api.js'
  import {get} from 'utils/utils.js'
  import {mapState, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapState([
        'countList'
      ])
    },
    methods: {
      ...mapMutations([
        'getGoods',
        'getSeller',
        'getRatings',
        'initCountList'
      ]),
      async getData () {
        const data = await get(api.data.data)
        if (data) {
          this.getGoods(data.goods)
          this.getSeller(data.seller)
          this.getRatings(data.ratings)
          if (this.countList.length === 0) {
            this.initCountList()
          }
        }
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style>
</style>

