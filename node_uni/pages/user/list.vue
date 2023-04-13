<template>
	<view class="container">
		<view class="main">
			<view class="cont" v-for="(item,index) in list" :key="index">
				<image :src="item.face||'/static/icon/face.jpg'" />
				<view class="center">
					<view class="name">{{item.nickname}}</view>
					<view class="other"><text>{{$t('level')}}:V{{item.level||'未知'}}</text><text>{{$t('balance')}}:{{item.money||0}}</text></view>
				</view>
				<view class="xzwBtn_light" :class="{active:item.status==2}" v-if="item.is_admin==0" @click="change(item,index)">{{item.status==1?$t('lock'):$t('unlock')}}</view>
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
			change(item, index) {
				this.$post('user/edit', {
					user_id: item.user_id,
					status: item.status == 1 ? 2 : 1
				}).then(res => {
					if (res.code == 200) {
						this.list[index] = res.data
						this.list.splice(0, 0)
					} else {
						this.toast(res.msg)
					}
				})
			},
			getList() {
				this.more = "loading"
				this.$get('user/list', {
					row: this.row,
					page: this.page
				}).then(res => {
					if (res.code == 200) {
						this.list = this.list.concat(res.data)
						this.total = res.total
						this.records = res.records
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
		onReachBottom() {
			if (this.page < this.total) {
				this.page++
				this.getList()
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
				.center {
					margin: 0 20upx;
					flex: 1;
					.name {
						font-size: 28upx;
					}
					.other {
						font-size: 24upx;
						color: #999;
						text {
							margin: 0 10upx 0 0;
						}
					}
				}
				.xzwBtn_light {
					font-size: 28upx;
					padding: 4upx 14upx;
					border-radius: 6upx;
					&.active {
						background-color: $mainColor;
						color: #fff;
					}
				}
			}
		}
	}
</style>