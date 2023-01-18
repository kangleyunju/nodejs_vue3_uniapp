<template>
	<view class="uni-forms-item"
		:class="{ 'uni-forms-item--border': border, 'is-first-border': border && isFirstBorder, 'uni-forms-item-error': msg }">
		<view class="uni-forms-item__box">
			<view class="uni-forms-item__inner" :class="['is-direction-' + labelPos]">
				<view class="uni-forms-item__label" :style="{ width: labelWid , justifyContent: justifyContent }">
					<slot name="left">
						<text v-if="required" class="is-required">*</text>
						<uni-icons v-if="leftIcon" class="label-icon" size="16" :type="leftIcon" :color="iconColor" />
						<text class="label-text">{{ label }}</text>
						<view v-if="label" class="label-seat"></view>
					</slot>
				</view>
				<view class="uni-forms-item__content" :class="{ 'is-input-error-border': msg }">
					<slot></slot>
				</view>
			</view>
			<view v-if="msg" class="uni-error-message" :class="{ 'uni-error-msg--boeder': border }" :style="{paddingLeft: labelLeft}">
				<text class="uni-error-message-text">{{ showMsg === 'undertext' ? msg : '' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uniFormsItem',
		props: {
			// 自定义内容
			custom: {
				type: Boolean,
				default: false
			},
			// 是否显示报错信息
			showMessage: {
				type: Boolean,
				default: true
			},
			name: String,
			required: Boolean,
			validateTrigger: {
				type: String,
				default: ''
			},
			leftIcon: String,
			iconColor: {
				type: String,
				default: '#606266'
			},
			label: String,
			// 左边标题的宽度单位px
			labelWidth: {
				type: [Number, String],
				default: ''
			},
			// 对齐方式，left|center|right
			labelAlign: {
				type: String,
				default: ''
			},
			// lable的位置，可选为 left-左边，top-上边
			labelPosition: {
				type: String,
				default: ''
			},
			errorMessage: {
				type: [String, Boolean],
				default: ''
			},
			// 表单校验规则
			rules: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				errorTop: false,
				errorBottom: false,
				labelMarginBottom: '',
				errorWidth: '',
				errMsg: '',
				val: '',
				labelPos: '',
				labelWid: '',
				labelAli: '',
				showMsg: 'undertext',
				border: false,
				isFirstBorder: false,
				isArray: false,
				arrayField: ''
			};
		},
		computed: {
			msg() {
				return this.errorMessage || this.errMsg;
			},
			fieldStyle() {
				let style = {};
				if (this.labelPos == 'top') {
					style.padding = '0 0';
					this.labelMarginBottom = '6px';
				}
				if (this.labelPos == 'left' && this.msg !== false && this.msg != '') {
					style.paddingBottom = '0px';
					this.errorBottom = true;
					this.errorTop = false;
				} else if (this.labelPos == 'top' && this.msg !== false && this.msg != '') {
					this.errorBottom = false;
					this.errorTop = true;
				} else {
					// style.paddingBottom = ''
					this.errorTop = false;
					this.errorBottom = false;
				}
				return style;
			},
			justifyContent() {
				if (this.labelAli === 'left') return 'flex-start';
				if (this.labelAli === 'center') return 'center';
				if (this.labelAli === 'right') return 'flex-end';
			},
			labelLeft() {
				return (this.labelPos === 'left' ? parseInt(this.labelWid) : 0) + 'px'
			}
		},
		watch: {
			validateTrigger(trigger) {
				this.formTrigger = trigger;
			}
		},
		created() {
			this.form = this.getForm();
			this.group = this.getForm('uniGroup');
			this.formRules = [];
			this.formTrigger = this.validateTrigger;
			// 处理 name，是否数组
			if (this.name && this.name.indexOf('[') !== -1 && this.name.indexOf(']') !== -1) {
				this.isArray = true;
				this.arrayField = this.name
				// fix by mehaotian 修改不修改的情况，动态值不检验的问题
				this.form.formData[this.name] = this.form._getValue(this.name, '')
			}
		},
		mounted() {
			if (this.form) {
				this.form.childrens.push(this);
			}
			this.init();
		},
		// #ifndef VUE3
		destroyed() {
			if (this.__isUnmounted) return
			this.unInit()
		},
		// #endif
		// #ifdef VUE3
		unmounted() {
			this.__isUnmounted = true
			this.unInit()
		},
		// #endif
		methods: {
			init() {
				if (this.form) {
					let {
						formRules,
						validator,
						formData,
						value,
						labelPosition,
						labelWidth,
						labelAlign,
						errShowType
					} = this.form;
					this.labelPos = this.labelPosition ? this.labelPosition : labelPosition;

					if (this.label) {
						this.labelWid = (this.labelWidth ? this.labelWidth : (labelWidth || 70))
					} else {
						this.labelWid = (this.labelWidth ? this.labelWidth : (labelWidth || 'auto'))
					}
					if (this.labelWid && this.labelWid !== 'auto') {
						this.labelWid += 'px'
					}
					this.labelAli = this.labelAlign ? this.labelAlign : labelAlign;

					// 判断第一个 item
					if (!this.form.isFirstBorder) {
						this.form.isFirstBorder = true;
						this.isFirstBorder = true;
					}

					// 判断 group 里的第一个 item
					if (this.group) {
						if (!this.group.isFirstBorder) {
							this.group.isFirstBorder = true;
							this.isFirstBorder = true;
						}
					}

					this.border = this.form.border;
					this.showMsg = errShowType;
					let name = this.isArray ? this.arrayField : this.name;
					if (!name) return
					if (formRules && this.rules.length > 0) {
						if (!formRules[name]) {
							formRules[name] = {
								rules: this.rules
							}
						}
						validator.updateSchema(formRules);
					}
					this.formRules = formRules[name] || {};
					this.validator = validator;
				} else {
					this.labelPos = this.labelPosition || 'left';
					this.labelWid = this.labelWidth || 65;
					this.labelAli = this.labelAlign || 'left';
				}
			},
			unInit() {
				if (this.form) {
					this.form.childrens.forEach((item, index) => {
						if (item === this) {
							this.form.childrens.splice(index, 1)
							delete this.form.formData[item.name]
						}
					})
				}
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
			clearValidate() {
				this.errMsg = '';
			},
			setValue(value) {
				let name = this.isArray ? this.arrayField : this.name;
				if (name) {
					if (this.errMsg) this.errMsg = '';
					// 给组件赋值
					this.form.formData[name] = this.form._getValue(name, value);
					if (!this.formRules || (typeof this.formRules && JSON.stringify(this.formRules) === '{}')) return;
					this.triggerCheck(this.form._getValue(this.name, value));
				}
			},

			async triggerCheck(value, formTrigger) {
				let promise = null;
				this.errMsg = '';
				// fix by mehaotian 解决没有检验规则的情况下，抛出错误的问题
				if (!this.validator || Object.keys(this.formRules).length === 0) return;
				const isNoField = this.isRequired(this.formRules.rules || []);
				let isTrigger = this.isTrigger(this.formRules.validateTrigger, this.validateTrigger, this.form
					.validateTrigger);
				let result = null;
				if (!!isTrigger || formTrigger) {
					let name = this.isArray ? this.arrayField : this.name;
					result = await this.validator.validateUpdate({
							[name]: value
						},
						this.form.formData
					);
				}
				// 判断是否必填,非必填，不填不校验，填写才校验
				if (!isNoField && (value === undefined || value === '')) {
					result = null;
				}
				const inputComp = this.form.inputChildrens.find(child => child.rename === this.name);
				if ((isTrigger || formTrigger) && result && result.errorMessage) {
					if (inputComp) {
						inputComp.errMsg = result.errorMessage;
					}
					if (this.form.errShowType === 'toast') {
						uni.showToast({
							title: result.errorMessage || '校验错误',
							icon: 'none'
						});
					}
					if (this.form.errShowType === 'modal') {
						uni.showModal({
							title: '提示',
							content: result.errorMessage || '校验错误'
						});
					}
				} else {
					if (inputComp) {
						inputComp.errMsg = '';
					}
				}

				this.errMsg = !result ? '' : result.errorMessage;
				// 触发validate事件
				this.form.validateCheck(result ? result : null);
				// typeof callback === 'function' && callback(result ? result : null);
				// if (promise) return promise
				return result ? result : null;
			},
			/**
			 * 触发时机
			 * @param {Object} event
			 */
			isTrigger(rule, itemRlue, parentRule) {
				let rl = true;
				//  bind  submit
				if (rule === 'submit' || !rule) {
					if (rule === undefined) {
						if (itemRlue !== 'bind') {
							if (!itemRlue) {
								return parentRule === 'bind' ? true : false;
							}
							return false;
						}
						return true;
					}
					return false;
				}
				return true;
			},
			// 是否有必填字段
			isRequired(rules) {
				let isNoField = false;
				for (let i = 0; i < rules.length; i++) {
					const ruleData = rules[i];
					if (ruleData.required) {
						isNoField = true;
						break;
					}
				}
				return isNoField;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.uni-forms-item {
		position: relative;
		padding: 0px;
		text-align: left;
		color: #333;
		font-size: 14px;
	}

	.uni-forms-item__box {
		position: relative;
	}

	.uni-forms-item__inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding-bottom: 56upx;
	}

	.is-direction-left {
		flex-direction: row;
	}

	.is-direction-top {
		flex-direction: column;
	}

	.uni-forms-item__label {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-shrink: 0;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		width: 65px;
		padding: 5px 0;
		height: 36px;

		.label-text {
			font-size: 14px;
			color: #333;
		}

		.label-seat {
			margin-right: 5px;
		}
	}

	.uni-forms-item__content {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		min-height: 36px;
		/* #endif */
		flex: 1;
	}

	.label-icon {
		margin-right: 5px;
		margin-top: -1px;
	}

	.is-required {
		color: $redColor;
		font-weight: bold;
	}

	.uni-error-message {
		position: absolute;
		bottom: 0px;
		left: 0;
		text-align: left;
	}

	.uni-error-message-text {
		line-height: 54upx;
		color: $redColor;
		font-size: 24upx;
	}

	.uni-error-msg--boeder {
		position: relative;
		bottom: 0;
		line-height: 22px;
	}

	.is-input-error-border {
		border-color: $redColor;
	}

	.uni-forms-item--border {
		margin-bottom: 0;
		padding: 10px 0;
		border-top: 1px #eee solid;

		.uni-forms-item__inner {
			padding: 0;
		}
	}

	.is-first-border {
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 0;
		/* #endif */
	}

	.uni-forms--no-padding {
		padding: 0;
	}
</style>
