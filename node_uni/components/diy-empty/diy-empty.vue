<template>
	<view class="st-empty">
		<move-handle @choose="choose" :dat="dat">
			<view :style="{background:dat.bgColor,height:dat.height+'upx'}" class="st-emptyBoxIn"></view>
		</move-handle>
	</view>
</template>

<script>
	export default {
		props: {
			dat: {},
			index: ''
		},
		methods: {
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			}
		}
	}
</script>
