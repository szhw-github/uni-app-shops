<template>
	<div>
		<div class="star-wrapper"
		:style="{width: 2*(starClass.length)*size + 'rpx'}"
		v-if="starClass.length"
		>
			<div class="star"
			v-for="(item,index) in starClass"
			:style="{
				width: size + 'rpx',
				height: size + 'rpx',
				marginLeft: size * 0.5 + 'rpx',
				marginRight: size * 0.5 + 'rpx',
				backgroundSize: [size + 'rpx', size + 'rpx']
			}"
			:class="['star'+size,item]"
			:key="index"
			>
			</div>
		</div>
	</div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    name: 'star',
    props: {
      score: Number,
      size: Number
    },
    data () {
      return {
        onCount: 0,
        halfCount: 0,
        offCount: 0,
				starClass: []
      }
    },
    methods: {
      getStarClass () {
				if(this.score) {
					let res = []
					var onCount = parseInt(this.score)
					var halfCount = Math.round(this.score - onCount)
					for (var i = 0; i < LENGTH; i++) {
					  if (onCount > 0) {
					    res.push(CLS_ON)
					    onCount--
					  } else if (halfCount > 0) {
					    res.push(CLS_HALF)
					    halfCount = 0
					  } else {
					    res.push(CLS_OFF)
					  }
					}
					return res
				}
				return []
      }
    },
		mounted() {
			this.starClass = this.getStarClass()
		}
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
	.star-wrapper
		display flex
		position relative
		background rgba(0,0,0,0)
		.star
			background-repeat no-repeat
		.on
			&.star24
				bg-icon('star24_on')
			&.star36
				bg-icon('star36_on')
			&.star48
				bg-icon('star48_on')
		.half
			&.star24
				bg-icon('star24_half')
			&.star36
				bg-icon('star36_half')
			&.star48
				bg-icon('star48_half')
		.off
			&.star24
				bg-icon('star24_off')
			&.star36
				bg-icon('star36_off')
			&.star48
				bg-icon('star48_off')
</style>
