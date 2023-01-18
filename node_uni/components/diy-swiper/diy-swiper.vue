<template>
	<view class="diy-swiper">
		<move-handle @choose="choose" :dat="dat">
			<view class="diy-swiperBox" :style="{paddingTop:dat.paddingTop+'upx',paddingBottom:dat.paddingBottom+'upx'}">
				<view class="blockTitle" v-if="dat.titleShow&&dat.title!=''"><text></text>{{dat.title}}</view>
				<view class="swiperBoxOut">
					<swiper class="swiperBox"
						:previous-margin="dat.swiper_type==1?'0':'100upx'" 
						:next-margin="dat.swiper_type==1?'0':'100upx'" 
						:indicator-dots="dat.swiper_dot<3?true:false" 
						:circular="true" 
						:autoplay="dat.swiper_auto?true:false" 
						interval="5000" 
						duration="500"
						:current="current"
						:class="{swiperBox2:dat.swiper_dot==1}" 
						:style="{height:dat.height*2+'upx'}"
						@change="changeSwiper"
					>
						<swiper-item v-for="(item, index) in dat.swiperArr" :key="index" class="swiperBoxIn">
							<view class="img" :style="{backgroundImage:'url(' + item.img+ ')',borderRadius:dat.radius+'upx',height:dat.height*2+'upx'}" @click="goIcon(item.url)"  :class="{empty:item.img=='',active:current==index&&dat.swiper_type==2, notActive:dat.swiper_type==2}">
								<text v-if="item.img==''&&show">355*{{dat.height}}</text>	
							</view>
						</swiper-item>
					</swiper>
					<view class="numberBlock" v-if="dat.swiper_dot==3">{{current+1}}/{{dat.swiperArr.length}}</view>
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
				current:0,
				show:false
			}
		},
		methods: {
			changeSwiper(e){
				this.current=e.detail.current
			},
			choose() {
				this.$emit('getUnique', this.dat,this.index)
			}
		},
		watch:{
			"dat.swiperArr": {
				handler:function(n,o){
					if(n.length==this.current){
						this.current--				
					}
				}
			}
		},
		created() {
			if(this.$state.editStatus){
				this.show=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.diy-swiperBox{
		&.hide{
			opacity: 0.5;
		}
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
		.swiperBoxOut{
			position: relative;
			.swiperBox {
				width: 100%;
				text-align: center;
				
				/deep/.uni-swiper-dot {
					background-color: #F1F1F1;
					margin-right:10upx;
					width: 14upx;
					height: 14upx;
				}
				/deep/.uni-swiper-dot-active {
					background-color: $mainColor;
				}
				/deep/.uni-swiper-dots-horizontal{
					bottom:12upx;
				}
				&.swiperBox2{
					/deep/.uni-swiper-dot {
						width: 13upx;
						height: 13upx;
			
						transition: width 0.2s;
					}
					/deep/.uni-swiper-dot-active {
						width: 28upx;
						height: 13upx;
						border-radius: 16upx;
						transition: width 0.2s;
					}
				}
				.swiperBoxIn{
					display: flex;
					.img {
						width: 100%;
						border-radius: 10upx;
						overflow: hidden;
						background-size: 100% auto;
						background-position: center;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 26upx;
						background-repeat: no-repeat;
						margin: 0 20upx;
						
						&.empty{
							background-color: #e8f3fe;
						}
						&.notActive{
							transform: scale(0.9);
							transition: 0.3s;
							margin: 0;
						}
						&.active{
							transform: scale(1);
							transition: 0.3s;
						}
					}
			
				}
			}
			.numberBlock{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 10upx;
				padding: 4upx 16upx;
				background-color: rgba(0,0,0,0.3);
				color: #f1f1f1;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 20upx;
				font-size: 20upx;
			}
		}
	}
</style>
