<template>
	<view class="st-goods">
		<move-handle @choose="choose" :dat="dat">
			<view class="st-goodsBox" :style="{paddingTop:dat.paddingTop+'upx',paddingBottom:dat.paddingBottom+'upx'}">
				<view class="blockTitle" v-if="dat.titleShow&&dat.title!=''"><text></text>{{dat.title}}</view>
				<view :class="dat.goodsType==2?'goodsBlock1':'goodsBlock1 goodsBlock2'">
					<view class="goodsBox" v-for="(item,index) in list" :key="index" @click="goGood(item.sku_id)">
						<image :src="item.picture||'/static/icon/emptyGood.png'" mode="aspectFill"/>
						<view class="info">
							<view class="name xzw_word2">{{item.name||'商品名称'}}</view>
							<view class="other">
								<view class="money">
									<text>￥</text>{{item.sale_price||0}}<text></text>
								</view>
								<view class="address">
									<view class="xzw_word1">{{item.store_name||'店铺名称'}}</view>
									<view><uni-icons type='location-filled' color="#ccc" size="14"/>{{item.province||'地区'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
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
				list:[]
			}
		},
		methods: {
			goGood(id){
				if(id){
					this.goIcon('/goods/detail?id='+id)
				}
			},
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			},
			solve(){
				if(this.dat.goodsArr.length==0){
					this.list=[{name:'',sale_price:'',store_name:'',province:''},{name:'',sale_price:'',store_name:'',province:''}]
				}else{
					this.list=this.dat.goodsArr
				}
			}
		},
		watch:{
			'dat.goodsArr': {
				handler:function(n,o){
					this.solve()
				}
			}
		},
		created(){
			this.solve()
		}
	}
</script>

<style lang="scss" scoped>
	.st-goodsBox{
		.blockTitle{
			display: flex;
			align-items: center;
			font-size: 30upx;
			font-weight: bold;
			padding: 15upx 20upx;
			text {
				height: 30upx;
				width: 8upx;
				border-radius: 10upx;
				background-color: $mainColor;
				margin: 0 15upx 0 0;
			}
		}
		.goodsBlock1{
			.goodsBox {
				display: flex;
				justify-content: space-between;
				padding: 15upx 30upx 25upx;
				background-color: #fff;
				image {
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
					margin: 0 22upx 0 0;
				}
				.info {
					flex:1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 6upx 0;
					.name {
						font-size: 28upx;
					}
					.other{
						.money {
							margin: 16upx 0 6upx;
							color: $redColor;
							font-size: 30upx;
							font-weight: bold;
							text {
								font-size: 24upx;
							}
						}
						.address{
							display: flex;
							justify-content: space-between;
							font-size: 26upx;
							view:nth-child(1) {
								width: 60%;
								color: #666;
							}
							view:nth-child(2) {
								flex:1;
								display: flex;
								justify-content: flex-end;
								align-items: flex-end;
								color: #999;
								.uni-icons {
									margin-right: 6upx;
								}
							}
						}
					}
				}
			}
		}
		.goodsBlock2{
			padding: 10upx 20upx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.goodsBox{
				flex-direction: column;
				width: 345upx;
				padding: 0 0 15upx;
				margin: 0 0 20upx 0;
				border-radius: 10upx;
				overflow: hidden;
				image{
					width: 345upx;
					height: 345upx;
				}
				.info{
					padding: 10upx 12upx 0;
					.other{
						.money {
							margin: 6upx 0 6upx;
						}
					}
				}
			}
		}
	}
</style>
