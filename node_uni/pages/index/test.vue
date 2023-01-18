<template>
	<view class="container">
		<view class="topBox">
			<xzw-tab :value="current" pills :tabs="tabs" @change="change" activeColor="#ffffff" pillsBorderRadius="40upx"/>
		</view>
		<view class="online" v-show="current==0">
			<view class="block block1">
				<view class="title">Canal de recarga</view>
				<view class="content">
					<view class="option" :class="{active:payType==index}" v-for="(item,index) in optitonList" :key="index" @click="changePay(index)">
						<image :src="item.img"/>
						<view>{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="block">
				<view class="title">Montante de recarga</view>
				<view class="number">
					<view :class="{active:active==index}" v-for="(item,index) in moneyList" :key="index" @click="changeMoney(index)">
						<text v-if="index!=moneyList.length-1">R$</text>{{item.name}}
					</view>
				</view>
				<view class="inputLine" v-if="active==moneyList.length-1">
					¥<input type="number" placeholder="Por favor, digite o valor de sua recarga(₹20 - 50000)" v-model="money" maxlength="10" @input="checkInput">
				</view>
			</view>
			<view class="xzwBtn" :class="{active:money>0}" @click="toPay">Recarregue agora</view>
		</view>
		<view class="offline" v-show="current==1">
			<view class="emptyBox"></view>
		</view>
		<xzw-centerPopup @confirmClick="confirmClick" ref="centerPopup" leftText="cancel" rightText="Click To Pay" subTitle="Will go to the payment website to pay, and the payment will be automatically credited to the account after successful payment"/>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				money:'',
				current:0,
				tabs:['Recarga online','Transferência offline'],
				payType:0,
				optitonList:[{name:'TIKPAY',img:''},{name:'TIKPAY',img:''}],
				active:0,
				moneyList:[{name:'20'},{name:'50'},{name:'100'},{name:'300'},{name:'500'},{name:'1000'},{name:'2000'},{name:'3000'},{name:'5000'},{name:'Outros'}]
			}
		},
		methods:{
			checkInput(e){
				let val = e.target.value.replace(/(^\s*)|(\s*$)/g, "").replace(/\b(0+)/gi,"")
				if (!val) {
					this.money = '';
					return
				}
				var reg = /[^\d.]/g
				// 只能是数字和小数点，不能是其他输入
				val = val.replace(reg, "")
				// // 保证第一位只能是数字，不能是点
				val = val.replace(/^\./g, "");
				// // 小数只能出现1位
				val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				// // 小数点后面保留2位
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				this.$nextTick(() => {
					this.money = val;
				})
			},
			change(e){
				this.current=e
			},
			changePay(e){
				this.payType=e
			},
			changeMoney(e){
				this.active=e
				if(e==9){
					this.money=''
				}else{
					this.money=this.moneyList[e].name
				}
			},
			toPay(){
				this.$refs.centerPopup.open()
			},
			confirmClick(){
				this.toast('点击了')
				this.$refs.centerPopup.close()
			}
		},
		onLoad() {
			
		}
	}
</script>	
<style lang="scss">
	.container {
		.topBox{
			background-color: #fff;
			height: 100upx;
			display: flex;
			align-items: center;
			padding: 0 40upx;
			box-sizing: border-box;
		}
		.block{
			background-color: #fff;
			padding: 0 30upx 30upx;
			&.block1{
				border-bottom: 1upx solid #e1e1e1;
				margin: 20upx 0 0;
			}
			.title{
				font-weight: bold;
				border-bottom: 1upx solid #e1e1e1;
				height: 80upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
			}
			.content{
				display: flex;
				align-items: center;
				padding: 30upx 0 0;
				.option{
					font-size: 24upx;
					text-align: center;
					height: 150upx;
					width: 170upx;
					border-radius: 20upx;
					border: 1upx solid #ddd;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin: 0 20upx 0 0;
					overflow: hidden;
					&.active{
						border: 1upx solid #487FFC;
						position: relative;
						&:before {
						    position: absolute;
						    content: "";
						    right: 0;
						    bottom: 0;
						    border-left: 44upx solid transparent;
						    border-bottom: 44upx solid #487FFC;
						}
						&:after {
						    content: "\2714";
						    position: absolute;
						    color: #ffffff;
						    right: 4upx;
						    bottom: 0;
						    font-size: 4upx;
						    transform: scale(0.7);
						}
					}
					image{
						border: 1px solid red;
						width: 100upx;
						height: 60upx;
						margin: 0 0 10upx;
					}
				}
			}
			.inputLine{
				border-radius: 10upx;
				display: flex;
				align-items: center;
				font-size: 28upx;
				padding: 0 10upx;
				input{
					height: 60upx;
					padding: 0 10upx;
					font-size: 28upx;
					flex:1;
				}
			}
			.number{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding: 20upx 0 0;
				view{
					border: 1upx solid #ddd;
					text-align: center;
					line-height: 60upx;
					width: 150upx;
					height: 60upx;
					font-size: 28upx;
					margin: 0 20upx 20upx 0;
					border-radius: 10upx;
					overflow: hidden;
					&.active{
						border: 1upx solid #487FFC;
						position: relative;
						&:before {
						    position: absolute;
						    content: "";
						    right: 0;
						    bottom: 0;
						    border-left: 34upx solid transparent;
						    border-bottom: 34upx solid #487FFC;
						}
						&:after {
						    content: "\2714";
						    position: absolute;
						    color: #ffffff;
						    right: 0;
						    bottom: -18upx;
						    font-size: 4upx;
						    transform: scale(0.7);
						}
					}
					&:nth-child(4n){
						margin: 0 0 20upx;
					}
					text{
						font-size: 24upx;
					}
				}
			}
		}
		.xzwBtn{
			border-radius: 10upx;
			height: 80upx;
			margin: 60upx 60upx 0;
			font-size: 32upx;
			background-color: #487FFC;
			opacity: 0.6;
			color: #fff;
			&.active{
				opacity: 1;
			}
		}
	}
</style>
