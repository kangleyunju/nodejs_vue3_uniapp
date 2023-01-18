<template>
	<view class="st-cateBox">
		<move-handle @choose="choose" :dat="dat">
			<view class="st-cateBoxIn" :style="{paddingTop:dat.paddingTop+'upx',paddingBottom:dat.paddingBottom+'upx'}">
				<view class="tabBox">
					<view class="tab" :class="{active:tab==index}" v-for="(item,index) in list" :key="index">
						<view  @click.stop="changeTab(index)">{{item.name}}</view>
						<view  @click.stop="changeTab(index)"><text v-if="item.desc!=''">{{item.desc}}</text></view>
					</view>
				</view>
				<view :class="dat.goodsType==2?'goodsBlock1':'goodsBlock1 goodsBlock2'">
					<view class="goodsBox" v-for="(item,index) in subArr" :key="index" @click="goGood(item.sku_id)">
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
				list:[],
				subArr:[],
				tab:0
			}
		},
		methods: {
			goGood(id){
				if(id){
					this.goIcon('/goods/detail?id='+id)
				}
			},
			changeTab(index){
				if(!this.$state.editStatus){
					this.tab=index
					this.subArr=this.dat.cateArr[index].subArr
				}else{
					this.tab=index
					this.solve()
				}
			},
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			},
			solve(){
				if(this.dat.cateArr[this.tab].subArr.length==0){
					this.subArr=[{name:'',sale_price:'',store_name:'',province:''},{name:'',sale_price:'',store_name:'',province:''}]
				}else{
					this.subArr=this.dat.cateArr[this.tab].subArr
				}
				this.list=this.dat.cateArr
			}
		},
		watch:{
			'dat.cateArr': {
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
	.st-cateBox{
		.tabBox{
			padding: 10upx 0;
			display: flex;
			align-items: center;
			justify-content:space-evenly;
			.tab{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				position: relative;
				height: 90upx;
				view:nth-child(1){
					font-weight: bold;
					font-size: 32upx;
					height: 50%;
				}
				view:nth-child(2){
					height: 50%;
					text{
						padding: 5upx 10upx;
						font-size: 22upx;
						color: #999;
					}
				}
				&.active{
					view:nth-child(1){
						color: $mainColor;
					}
					view:nth-child(2){
						text{
							color: $mainColor;
							border-radius: 16upx;
							color: #fff;
							background-color: $mainColor;
						}
					}
				}
				&::after{
					content: '';
					position: absolute;
					right:0;
					top:50%;
					transform: translateY(-50%);
					height: 40upx;
					width: 2upx;
					background-color: #d8d8d8;
				}
				&:last-child{
					&::after{
						display: none;
					}
				}
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