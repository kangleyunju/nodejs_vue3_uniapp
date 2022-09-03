<template>
	<view class="moveHandle">
		<view @tap="choose" class="moveHandleBox" :class="{'active':isSelect,'edit':isEdit,'hide':!dat.show&&isEdit}" v-if="dat.show||(!dat.show&&isEdit)">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dat:{}
		},
		data() {
			return {
				isEdit: false
			}
		},
		computed:{
			isSelect() {
				if (this.$state.diySelect.unique == this.dat.unique) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			choose(e) {
				this.$emit('choose');
			}
		},
		created() {
			if(this.$state.editStatus){
				this.isEdit=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moveHandleBox {
		width: 750upx;
		box-sizing: border-box;
		&.edit {
			border: 1px solid transparent;
		}
		&.edit:hover {
			border: 1px dashed $mainColor;
		}
		&.active{
			border: 1px solid $mainColor !important;
		}
		&.hide {
			opacity: 0.5;
		}
	}
</style>
