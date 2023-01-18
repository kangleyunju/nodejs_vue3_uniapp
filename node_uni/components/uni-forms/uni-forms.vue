<template>
	<view class="uni-forms" :class="{ 'uni-forms--top': !border }">
		<form @submit.stop="submitForm" @reset="resetForm">
			<slot></slot>
		</form>
	</view>
</template>
<script>
	// 2021-08-13
	// #ifndef VUE3
	import Vue from 'vue';
	Vue.prototype.binddata = function(name, value, formName) {
		if (formName) {
			this.$refs[formName].setValue(name, value);
		} else {
			let formVm;
			for (let i in this.$refs) {
				const vm = this.$refs[i];
				if (vm && vm.$options && vm.$options.name === 'uniForms') {
					formVm = vm;
					break;
				}
			}
			if (!formVm) return console.error('当前 uni-froms 组件缺少 ref 属性');
			formVm.setValue(name, value);
		}
	};
	// #endif
	import Validator from './validate.js';
	export default {
		name: 'uniForms',
		components: {},
		emits:['input','reset','validate','submit'],
		props: {
			// 即将弃用
			value: {
				type: Object,
				default () {
					return {};
				}
			},
			// 替换 value 属性
			modelValue: {
				type: Object,
				default () {
					return {};
				}
			},
			// 表单校验规则
			rules: {
				type: Object,
				default () {
					return {};
				}
			},
			// 校验触发器方式，默认 关闭
			validateTrigger: {
				type: String,
				default: ''
			},
			// label 位置，可选值 top/left
			labelPosition: {
				type: String,
				default: 'left'
			},
			// label 宽度，单位 px
			labelWidth: {
				type: [String, Number],
				default: ''
			},
			// label 居中方式，可选值 left/center/right
			labelAlign: {
				type: String,
				default: 'left'
			},
			errShowType: {
				type: String,
				default: 'undertext'
			},
			border: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				formData: {}
			};
		},
		computed: {
			dataValue() {
				if (JSON.stringify(this.modelValue) === '{}') {
					return this.value
				} else {
					return this.modelValue
				}
			}
		},
		watch: {
			rules(newVal) {
				// 如果规则发生变化，要初始化组件
				this.init(newVal);
			},
			labelPosition() {
				this.childrens.forEach(vm => {
					vm.init()
				})
			}
		},
		created() {
			// #ifdef VUE3
			let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata
			if (!getbinddata) {
				getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
					if (formName) {
						this.$refs[formName].setValue(name, value);
					} else {
						let formVm;
						for (let i in this.$refs) {
							const vm = this.$refs[i];
							if (vm && vm.$options && vm.$options.name === 'uniForms') {
								formVm = vm;
								break;
							}
						}
						if (!formVm) return console.error('当前 uni-froms 组件缺少 ref 属性');
						formVm.setValue(name, value);
					}
				}
			}
			// #endif

			// 存放watch 监听数组
			this.unwatchs = [];
			// 存放子组件数组
			this.childrens = [];
			// 存放 easyInput 组件
			this.inputChildrens = [];
			// 存放 dataCheckbox 组件
			this.checkboxChildrens = [];
			// 存放规则
			this.formRules = [];
			this.init(this.rules);
		},
		// mounted() {
		// 	this.init(this.rules)
		// },
		methods: {
			init(formRules) {
				// 判断是否有规则
				if (Object.keys(formRules).length === 0) {
					this.formData = this.dataValue
					return
				};
				this.formRules = formRules;
				this.validator = new Validator(formRules);
				this.registerWatch();
			},
			// 监听 watch
			registerWatch() {
				// 取消监听,避免多次调用 init 重复执行 $watch
				this.unwatchs.forEach(v => v());
				this.childrens.forEach((v) => {
					v.init()
				})
				// watch 每个属性 ，需要知道具体那个属性发变化
				Object.keys(this.dataValue).forEach(key => {
					let watch = this.$watch(
						'dataValue.' + key,
						value => {
							if (!value) return
							// 如果是对象 ，则平铺内容
							if (value.toString() === '[object Object]') {
								for (let i in value) {
									let name = `${key}[${i}]`;
									this.formData[name] = this._getValue(name, value[i]);
								}
							} else {
								this.formData[key] = this._getValue(key, value);
							}
						},
						{
							deep: true,
							immediate: true
						}
					);
					this.unwatchs.push(watch);
				});
			},
			setRules(formRules) {
				this.init(formRules);
			},
			setValue(name, value, callback) {
				let example = this.childrens.find(child => child.name === name);
				if (!example) return null;
				value = this._getValue(example.name, value);
				this.formData[name] = value;
				example.val = value;
				return example.triggerCheck(value, callback);
			},
			resetForm(event) {
				this.childrens.forEach(item => {
					item.errMsg = '';
					const inputComp = this.inputChildrens.find(child => child.rename === item.name);
					if (inputComp) {
						inputComp.errMsg = '';
						// fix by mehaotian 不触发其他组件的 setValue
						inputComp.is_reset = true
						inputComp.$emit('input', inputComp.multiple ? [] : '');
						inputComp.$emit('update:modelValue', inputComp.multiple ? [] : '');
					}
				});

				this.childrens.forEach(item => {
					if (item.name) {
						this.formData[item.name] = this._getValue(item.name, '');
					}
				});
				this.$emit('reset', event);
			},
			validateCheck(validate) {
				if (validate === null) validate = null;
				this.$emit('validate', validate);
			},
			async validateAll(invalidFields, type, keepitem, callback) {
				let childrens = []
				for (let i in invalidFields) {
					const item = this.childrens.find(v => v.name === i)
					if (item) {
						childrens.push(item)
					}
				}

				if (!callback && typeof keepitem === 'function') {
					callback = keepitem;
				}

				let promise;
				if (!callback && typeof callback !== 'function' && Promise) {
					promise = new Promise((resolve, reject) => {
						callback = function(valid, invalidFields) {
							!valid ? resolve(invalidFields) : reject(valid);
						};
					});
				}

				let results = [];
				let newFormData = {};
				if (this.validator) {
					for (let key in childrens) {
						const child = childrens[key];
						let name = child.isArray ? child.arrayField : child.name;
						if (child.isArray) {
							if (child.name.indexOf('[') !== -1 && child.name.indexOf(']') !== -1) {
								const fieldData = child.name.split('[');
								const fieldName = fieldData[0];
								const fieldValue = fieldData[1].replace(']', '');
								if (!newFormData[fieldName]) {
									newFormData[fieldName] = {};
								}
								newFormData[fieldName][fieldValue] = this._getValue(name, invalidFields[name]);
							}
						} else {
							newFormData[name] = this._getValue(name, invalidFields[name]);
						}
						const result = await child.triggerCheck(invalidFields[name], true);
						if (result) {
							results.push(result);
							if (this.errShowType === 'toast' || this.errShowType === 'modal') break;
						}
					}
				} else {
					newFormData = invalidFields
				}
				if (Array.isArray(results)) {
					if (results.length === 0) results = null;
				}

				if (Array.isArray(keepitem)) {
					keepitem.forEach(v => {
						newFormData[v] = this.dataValue[v];
					});
				}

				if (type === 'submit') {
					this.$emit('submit', {
						detail: {
							value: newFormData,
							errors: results
						}
					});
				} else {
					this.$emit('validate', results);
				}

				callback && typeof callback === 'function' && callback(results, newFormData);

				if (promise && callback) {
					return promise;
				} else {
					return null;
				}
			},
			submitForm() {},
			submit(keepitem, callback, type) {
				for (let i in this.dataValue) {
					const itemData = this.childrens.find(v => v.name === i);
					if (itemData) {
						if (this.formData[i] === undefined) {
							this.formData[i] = this._getValue(i, this.dataValue[i]);
						}
					}
				}
				if (!type) {
					console.warn('submit 方法即将废弃，请使用validate方法代替！');
				}
				return this.validateAll(this.formData, 'submit', keepitem, callback);
			},
			validate(keepitem, callback) {
				return this.submit(keepitem, callback, true);
			},
			validateField(props, callback) {
				props = [].concat(props);
				let invalidFields = {};
				this.childrens.forEach(item => {
					if (props.indexOf(item.name) !== -1) {
						invalidFields = Object.assign({}, invalidFields, {
							[item.name]: this.formData[item.name]
						});
					}
				});
				return this.validateAll(invalidFields, 'submit', [], callback);
			},
			resetFields() {
				this.resetForm();
			},
			clearValidate(props) {
				props = [].concat(props);
				this.childrens.forEach(item => {
					const inputComp = this.inputChildrens.find(child => child.rename === item.name);
					if (props.length === 0) {
						item.errMsg = '';
						if (inputComp) {
							inputComp.errMsg = '';
						}
					} else {
						if (props.indexOf(item.name) !== -1) {
							item.errMsg = '';
							if (inputComp) {
								inputComp.errMsg = '';
							}
						}
					}
				});
			},
			_getValue(key, value) {
				const rules = (this.formRules[key] && this.formRules[key].rules) || [];
				const isRuleNum = rules.find(val => val.format && this.type_filter(val.format));
				const isRuleBool = rules.find(val => (val.format && val.format === 'boolean') || val.format === 'bool');
				// 输入值为 number
				if (isRuleNum) {
					value = isNaN(value) ? value : value === '' || value === null ? null : Number(value);
				}
				// 简单判断真假值
				if (isRuleBool) {
					value = !value ? false : true;
				}
				return value;
			},
			type_filter(format) {
				return format === 'int' || format === 'double' || format === 'number' || format === 'timestamp';
			}
		}
	};
</script>
