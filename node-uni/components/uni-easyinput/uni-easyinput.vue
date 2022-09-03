<template>
	<view class="uni-easyinput" :class="{'uni-easyinput-error':msg}" :style="{color:inputBorder && msg?'#FC4E48':styles.color}">
		<view class="uni-easyinput__content" :class="{'is-input-border':inputBorder ,'is-input-error-border':inputBorder && msg,'is-textarea':type==='textarea','is-disabled':disabled}"
		 :style="{'border-color':inputBorder && msg?'#FC4E48':styles.borderColor,'background-color':disabled?styles.disableColor:''}">
			<uni-icons v-if="prefixIcon" class="content-clear-icon" :type="prefixIcon" color="#c0c4cc" @click="onClickIcon('prefix')"></uni-icons>
			<textarea v-if="type === 'textarea'" class="uni-easyinput__content-textarea" :class="{'input-padding':inputBorder}"
			 :name="name" :value="val" :placeholder="placeholder" :placeholderStyle="placeholderStyle" :disabled="disabled"
			 :maxlength="inputMaxlength" :focus="focused" :autoHeight="autoHeight" @input="onInput" @blur="onBlur"  @focus="onFocus"
			 @confirm="onConfirm"></textarea>
			<input v-else :type="type === 'password'?'text':type" class="uni-easyinput__content-input" :style="{
				 'padding-right':type === 'password' ||clearable || prefixIcon?'':'10px',
				 'padding-left':prefixIcon?'':'10px'
			 }"
			 :name="name" :value="val" :password="!showPassword && type === 'password'" :placeholder="placeholder"
			 :placeholderStyle="placeholderStyle" :disabled="disabled" :maxlength="inputMaxlength" :focus="focused" :confirmType="confirmType" @focus="onFocus"
			 @blur="onBlur" @input="onInput" @confirm="onConfirm" />
			<template v-if="type === 'password' && passwordIcon" >
				<uni-icons v-if="val != '' " class="content-clear-icon" :class="{'is-textarea-icon':type==='textarea'}" :type="showPassword?'eye-slash-filled':'eye-filled'"
				 :size="18" color="#c0c4cc" @click="onEyes"></uni-icons>
			</template>
			<template v-else-if="suffixIcon">
				<uni-icons v-if="suffixIcon" class="content-clear-icon" :type="suffixIcon" color="#c0c4cc" @click="onClickIcon('suffix')"></uni-icons>
			</template>
			<template v-else>
				<uni-icons class="content-clear-icon" :class="{'is-textarea-icon':type==='textarea'}" type="clear" :size="clearSize"
				 v-if="clearable && val && !disabled" color="#c0c4cc" @click="onClear"></uni-icons>
			</template>
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	// 2021-08-20
	export default {
		name: 'uni-easyinput',
		emits:['click','iconClick','update:modelValue','input','focus','blur','confirm'],
		model:{
			prop:'modelValue',
			event:'update:modelValue'
		},
		props: {
			name: String,
			value: [Number, String],
			modelValue: [Number, String],
			type: {
				type: String,
				default: 'text'
			},
			clearable: {
				type: Boolean,
				default: true
			},
			autoHeight: {
				type: Boolean,
				default: false
			},
			placeholder: String,
			placeholderStyle: String,
			focus: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: 140
			},
			confirmType: {
				type: String,
				default: 'done'
			},
			clearSize: {
				type: [Number, String],
				default: 15
			},
			inputBorder: {
				type: Boolean,
				default: true
			},
			prefixIcon: {
				type: String,
				default: ''
			},
			suffixIcon: {
				type: String,
				default: ''
			},
			trim: {
				type: [Boolean, String],
				default: true
			},
			passwordIcon:{
				type: Boolean,
				default: true
			},
			styles: {
				type: Object,
				default () {
					return {
						color: '#333',
						disableColor: '#eee',
						borderColor: '#e5e5e5'
					}
				}
			},
			errorMessage:{
				type:[String,Boolean],
				default:''
			}
		},
		data() {
			return {
				focused: false,
				errMsg: '',
				val: '',
				showMsg: '',
				border: false,
				isFirstBorder: false,
				showClearIcon: false,
				showPassword: false
			};
		},
		computed: {
			msg() {
				return this.errorMessage || this.errMsg;
			},
			// 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
			inputMaxlength() {
				return Number(this.maxlength);
			},
		},
		watch: {
			value(newVal) {
				if (this.errMsg) this.errMsg = ''
				this.val = newVal
				// fix by mehaotian is_reset 在 uni-forms 中定义
				if (this.form && this.formItem &&!this.is_reset) {
					this.is_reset = false
					this.formItem.setValue(newVal)
				}
			},
			modelValue(newVal) {
				if (this.errMsg) this.errMsg = ''
				this.val = newVal
				if (this.form && this.formItem &&!this.is_reset) {
					this.is_reset = false
					this.formItem.setValue(newVal)
				}
			},
			focus(newVal) {
				this.$nextTick(() => {
					this.focused = this.focus
				})
			}
		},
		created() {
			if(!this.value){
				this.val = this.modelValue
			}
			if(!this.modelValue){
				this.val = this.value
			}
			this.form = this.getForm('uniForms')
			this.formItem = this.getForm('uniFormsItem')
			if (this.form && this.formItem) {
				if (this.formItem.name) {
					if(!this.is_reset){
						this.is_reset = false
						this.formItem.setValue(this.val)
					}
					this.rename = this.formItem.name
					this.form.inputChildrens.push(this)
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.focused = this.focus
			})
		},
		methods: {
			onClickIcon(type) {
				this.$emit('iconClick', type)
			},
			getForm(name = 'uniForms') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},

			onEyes() {
				this.showPassword = !this.showPassword
			},
			onInput(event) {
				let value = event.detail.value;
				// 判断是否去除空格
				if (this.trim) {
					if (typeof(this.trim) === 'boolean' && this.trim) {
						value = this.trimStr(value)
					}
					if (typeof(this.trim) === 'string') {
						value = this.trimStr(value, this.trim)
					}
				};
				if (this.errMsg) this.errMsg = ''
				this.val = value
				// TODO 兼容 vue2
				this.$emit('input', value);
				// TODO　兼容　vue3
				this.$emit('update:modelValue',value)
			},

			onFocus(event) {
				this.$emit('focus', event);
			},
			onBlur(event) {
				let value = event.detail.value;
				this.$emit('blur', event);
			},
			onConfirm(e) {
				this.$emit('confirm', e.detail.value);
			},
			onClear(event) {
				this.val = '';
				this.$emit('input', '');
				this.$emit('update:modelValue','')
			},
			fieldClick() {
				this.$emit('click');
			},
			trimStr(str, pos = 'both') {
				if (pos === 'both') {
					return str.trim();
				} else if (pos === 'left') {
					return str.trimLeft();
				} else if (pos === 'right') {
					return str.trimRight();
				} else if (pos === 'start') {
					return str.trimStart()
				} else if (pos === 'end') {
					return str.trimEnd()
				} else if (pos === 'all') {
					return str.replace(/\s+/g, '');
				} else if (pos === 'none') {
					return str;
				}
				return str;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-easyinput {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		flex: 1;
		position: relative;
		text-align: left;
		color: #333;
		font-size: 14px;
	}

	.uni-easyinput__content {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		min-height: 36px;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.uni-easyinput__content-input {
		/* #ifndef APP-NVUE */
		width: auto;
		/* #endif */
		position: relative;
		overflow: hidden;
		flex: 1;
		line-height: 1;
		font-size: 28upx;
		height: 84upx;
	}

	.is-textarea {
		align-items: flex-start;
	}

	.is-textarea-icon {
		margin-top: 5px;
	}

	.uni-easyinput__content-textarea {
		position: relative;
		overflow: hidden;
		flex: 1;
		line-height: 1.5;
		font-size: 14px;
		padding-top: 6px;
		padding-bottom: 10px;
		height: 80px;
		/* #ifndef APP-NVUE */
		min-height: 80px;
		width: auto;
		/* #endif */
	}

	.input-padding {
		padding-left: 10px;
	}

	.content-clear-icon {
		padding: 0 5px;
	}

	.label-icon {
		margin-right: 5px;
		margin-top: -1px;
	}

	// 显示边框
	.is-input-border {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		border: 1px solid $uni-border-color;
		border-radius: 4px;
	}
	.is-required {
		color: $uni-color-error;
	}

	.uni-error-message {
		position: absolute;
		bottom: -17px;
		left: 0;
		line-height: 12px;
		color: $uni-color-error;
		font-size: 12px;
		text-align: left;
	}

	.uni-error-msg--boeder {
		position: relative;
		bottom: 0;
		line-height: 22px;
	}

	.is-input-error-border {
		border-color: $uni-color-error;
	}

	.uni-easyinput--border {
		margin-bottom: 0;
		padding: 10px 15px;
		border-top: 1px #eee solid;
	}

	.uni-easyinput-error {
		padding-bottom: 0;
	}

	.is-first-border {
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 0;
		/* #endif */
	}

	.is-disabled {
		background-color: #eee;
	}
</style>
