<template>
	<view class="container">
		<view class="main">
			<view class="cont" v-for="(item,index) in list" :key="index">
				<view class="cont_header">{{userInfo.name}}</view>
				<view class="cont_top">
					<image :src="item.product_image" mode="aspectFill" />
					<view class="center">
						<view class="xzw_word2 name">{{item.product_name}}</view>
						<view class="price">
							<text>¥{{item.sale_price}}</text>
							<text>¥{{item.origin_price}}</text>
						</view>
					</view>
				</view>
				<view class="cont_bottom">
					<view class="ing">{{item.status==0?'审核中':item.status==1?'审核失败':item.status==2?'销售中':item.status==3?'仓库':'已删除'}}</view>
					<view class="xzwBtn_light" v-if="item.status==0&&userInfo.is_admin==1" @click="examineItem(item,index)">审核</view>
					<view class="xzwBtn_light" @click="navTo('/goods/add?product_id='+item.product_id)">编辑</view>
					<view class="xzwBtn_light" v-if="item.status<4" @click="deleteItem(item,index)">删除</view>
					<view class="xzwBtn_light" v-if="item.status==2" @click="change(item,index,3)">下架</view>
					<view class="xzwBtn_dark" v-if="item.status==3" @click="change(item,index,2)">上架</view>
					<view class="xzwBtn_dark" v-if="item.status==4" @click="change(item,index, 0)">恢复</view>
				</view>
			</view>
		</view>
		<view class="emptyBox" v-if="records==0">
			<image src="/static/icon/empty.png" mode="heightFix" />
			<view>这里空空的~</view>
			<view class="xzwBtn_dark" @click="navTo('/good/add')">添加商品</view>
		</view>
		<uni-load-more :status="more" v-if="records>0" />
		<xzw-centerPopup title="确定删除" @confirmClick="change(item,index,4)" ref="centerPopup" />
		<xzw-centerPopup title="审核" :default="false" @confirmClick="change(item,index,3)" ref="examine" leftText="不通过" rightText="通过" @leftClick="change(item,index,1)" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				page: 1,
				list: [],
				total: 1,
				records: 1,
				item: {},
				index: 0,
				userInfo: {}
			}
		},
		methods: {
			examineItem(item, index) {
				this.item = item
				this.index = index
				this.$refs.examine.open()
			},
			deleteItem(item, index) {
				this.item = item
				this.index = index
				this.$refs.centerPopup.open()
			},
			change(item, index, type) {
				this.$refs.centerPopup.close()
				this.$refs.examine.close()
				this.$post('good/status', {
					product_id: item.product_id,
					status: type
				}).then((res) => {
					if (res.code == 200) {
						this.list[index].status = res.data.status
					} else {
						this.toast(res.msg)
					}
				})
			},
			getList() {
				this.more = "loading"
				this.$get('good/list', {
					page: this.page,
					row: 10,
					status: 0 //取审核中的商品
				}).then((res) => {
					if (res.code == 200) {
						this.list = this.list.concat(res.data)
						this.total = res.total
						this.records = res.records
						if (this.total > this.page) {
							this.more = "more"
						} else {
							this.more = "noMore"
						}
					} else {
						this.toast(res.msg)
					}
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.navTo('/goods/add')
		},
		onReachBottom(e) {
			if (this.page < this.total) {
				this.page++
				this.getList()
			}
		},
		onLoad() {
			if (this.hasLogin(2)) {
				if (this.getUserInfo().is_admin == 1) {
					this.userInfo = this.getUserInfo()
					this.getList()
				} else {
					this.toast(this.$t('noPermission'))
					this.more = "no"
				}
			}
		}
	}
</script>
<style lang="scss">
	.container {
		padding: 20upx 0 0;
		.main {
			.cont {
				background-color: #fff;
				box-shadow: 0 0 4upx 4upx rgba(0, 0, 0, 0.04);
				margin: 0 20upx 20upx;
				border-radius: 10upx;
				padding: 0 30upx;
				box-sizing: border-box;
				&:last-child {
					margin: 0 20upx;
				}
				.cont_top {
					height: 170upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					image {
						height: 120upx;
						width: 120upx;
					}
					.center {
						height: 120upx;
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						flex: 1;
						margin: 0 0 0 20upx;
						.name {
							font-size: 28upx;
						}
						.price {
							font-size: 26upx;
							color: $redColor;
							text:nth-child(2) {
								font-size: 24upx;
								color: #999;
								text-decoration: line-through;
								margin: 0 0 0 10upx;
							}
						}
					}
				}
				.cont_bottom {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					height: 80upx;
					font-size: 26upx;
					border-top: 1upx solid #d8d8d8;
					position: relative;
					.ing {
						position: absolute;
						left: 0;
					}
					.xzwBtn_dark {
						border-radius: 2upx;
						margin: 0 0 0 20upx;
						padding: 2upx 22upx;
						border-radius: 20upx;
					}
					.xzwBtn_light {
						border-radius: 2upx;
						margin: 0 0 0 20upx;
						padding: 2upx 22upx;
						border-radius: 20upx;
					}
				}
			}
		}
		.emptyBox {
			text-align: center;
			margin: 30vh 0 0;
			image {
				height: 140upx;
			}
			.xzwBtn_dark {
				width: 160upx;
				height: 50upx;
				border-radius: 32upx;
				margin: 20upx auto 0;
				font-size: 28upx;
			}
		}
	}
</style>