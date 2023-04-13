<template>
	<view class="container">
		<view class="main">
			<view v-for="(item,index) in list" :key="index" class="cont" @click="jumpTo(item.liveurl)">
				<image :src="item.avatar" class="avatar" />
				<view class="name">{{item.nickname}}</view>
				<uni-icons type="forward" />
			</view>
		</view>
		<uni-load-more :status="more" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				row: 10,
				total: 0,
				more: '',
				records: 1
			}
		},
		methods: {
			jumpTo(url) {
				window.open('https://www.yizhibo.com/' + url)
			},
			getList() {
				this.more = "loading"
				this.$post('diy/test', {}).then(res => {
					if (res.code == 200) {
						this.list = res.data
						this.total = 1
						this.records = this.list.length
						if (this.total == this.page) {
							this.more = "noMore"
						} else {
							this.more = "more"
						}
					} else {
						this.toast(res.msg)
					}
				})
			}
		},
		onLoad() {
			this.getList()
		}
	}
</script>
<style lang="scss">
	.container {
		.main {
			padding: 20upx 0 0;
			.cont {
				height: 140upx;
				display: flex;
				align-items: center;
				background-color: #fff;
				box-shadow: 0 0 4upx 4upx rgba(0, 0, 0, 0.04);
				border-radius: 10upx;
				padding: 0 30upx;
				box-sizing: border-box;
				margin: 0 20upx 20upx;
				&:last-child {
					margin: 0 20upx 0;
				}
				image {
					height: 80upx;
					width: 80upx;
					border-radius: 50%;
				}
				.name {
					margin: 0 20upx;
					flex: 1;
				}
			}
		}
	}
</style>