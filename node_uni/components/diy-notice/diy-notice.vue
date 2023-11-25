<template>
	<view class="diy-notice">
		<move-handle @choose="choose" :dat="dat">
			<view class="diy-noticeBox" :style="{marginTop:dat.marginTop+'upx',marginBottom:dat.marginBottom+'upx'}">
				<xzw-notice
					:list="list"
					:theme="dat.theme"
					:showIcon="dat.notice_icon"
					:showMore="dat.notice_more"
					:direction="dat.notice_direction"
					:speed="dat.notice_speed"
					@goItem="goIcon('/article/list')"
					@goMore="goIcon('/article/list')"
					theKey="title2"
					v-if="show" />
			</view>
		</move-handle>
	</view>
</template>
<script>
	export default {
		props: {
			dat: {},
			index: ''
		},
		data() {
			return {
				list: [],
				show: false
			}
		},
		methods: {
			choose() {
				this.$emit('getUnique', this.dat, this.index)
			},
			getList() {
				this.list = [{ id: 1, title2: '白日依山尽，黄河入海流' }, { id: 2, title2: '欲穷千里目，更上一层楼' }]
				this.show = true
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>
<style lang="scss" scoped>
	.diy-noticeBox {
		height: 90upx;
	}
</style>