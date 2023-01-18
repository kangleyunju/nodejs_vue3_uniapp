<template>
	<view class="container">
		<view class="main">
			<picker :range="range" @change="change" range-key="text">
				<view class="line" :class="{'last':!hasLogin()}">
					<view>{{$t('application-language')}}</view>
					<view class="right">{{language}}
						<uni-icons type="forward" color="#999" />
					</view>
				</view>
			</picker>
			<view class="line last" @click="$refs.centerPopup.open()" v-if="hasLogin()">
				<view>{{$t('logout')}}</view>
				<view class="right">
					<uni-icons type="forward" color="#999" />
				</view>
			</view>
		</view>
		<xzw-centerPopup ref="centerPopup" :title="$t('logoutConfirm')" @confirnClick="toLogout()" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				language: ''
			}
		},
		computed: {
			range() {
				return [{
					text: this.$t('locale.zh-hans'),
					code: 'zh-Hans'
				}, {
					text: this.$t('locale.zh-hant'),
					code: 'zh-Hant'
				}, {
					text: this.$t('locale.en'),
					code: 'en'
				}]
			}
		},
		methods: {
			toLogout() {
				this.$logout()
			},
			change(e) {
				let code = this.range[e.detail.value].code
				uni.setLocale(code);
				this.language = this.$t(('locale.' + code).toLowerCase())
				this.$i18n.locale = code;
			}
		},
		onLoad() {
			this.language = this.$t(('locale.' + uni.getLocale()).toLowerCase())
		}
	}
</script>
<style lang="scss">
	.container {
		padding: 20upx 0 0;
		.main {
			background-color: #fff;
			padding: 0 20upx;
			margin: 0 20upx 20upx;
			border-radius: 10upx;
			.line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 90upx;
				font-size: 0;
				border-bottom: 1upx solid #eee;
				font-size: 28upx;
				&.last {
					border: none;
				}
				.right {
					display: flex;
					align-items: center;
					color: #999;
				}
			}
		}
	}
</style>
