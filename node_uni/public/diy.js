import sortablejs from "sortablejs";
export default {
	data() {
		return {
			diyData :{
				id: 0,//模板id
				sorts: [],// 项目的布局数据（可改变）
				page_name: "",//页面顶部标题
				background_color:"#F8F8F8"//页面底色
			}
		}
	},
	methods: {
		// 获取布局数据
		async getDiy(id) {
			this.noComp()
			if(this.isApi){
				await this.$get('diy/detail',{
					id:id,
				}).then(res => {
					this.diyData = res.data
					this.initSortable('xzw_sortable');
					window.parent.postMessage({
						method: 'sendPageData',
						data: res.data
					}, '*')
					return this.diyData
				})
			}else{
				this.diyData = this.getStorage('pageInfo')
				if(this.diyData==""){
					this.diyData={
						id: id,
						sorts: [],
						name:"页面名称",
						page_name: "",
						background_color:"#F8F8F8"
					}
				}else{
					this.diyData.sorts=JSON.parse(this.diyData.sorts)
				}
				this.initSortable('xzw_sortable')
				window.parent.postMessage({
					method: 'sendPageData',
					data: this.diyData
				}, '*')
				return this.diyData
			}
		},
		// 初始化 Sortablejs
		async initSortable(id) {
			let options = options = await {
				group: {
					name: 'sort',
					pull: true,
					put: true,
				},
				animation: 200,
				forceFallback: true,
				dragClass: 'drag',
				chosenClass: 'chosen',
				disabled: false,
				filter: '.filter',
				scroll: false,
				handle: '.moveHandleBox',
				// 只有在盒子内可移动项的排序发生改变时才会触发
				onUpdate: (evt) => {
					let to_id = evt.to.id;
					let from_id = evt.from.id;
					let old_index = evt.oldIndex;
					let new_index = evt.newIndex;
					this.saveSort(new_index, old_index, to_id)
					let obj = {
						id: to_id,
						old_index: new_index,
						new_index: old_index,
						type: 'sort',
					};
					if(this.$state.diySelect.unique>0){
						for(var i in this.diyData.sorts){
							if(this.diyData.sorts[i].unique==this.$state.diySelect.unique){
								var index=i
							}
						}
						this.parentGetUnique(index,2)
					}
				}
			}
			// #ifdef H5
			const el = await document.getElementById(id);
			if(this.$state.editStatus){
				sortablejs.create(el, options)
			}
			// #endif
		},
		// 保存排序
		saveSort(new_index, old_index, id) {
			const sorts = this.diyData.sorts;
			if (old_index < new_index) {
				sorts.splice(new_index + 1, 0, sorts[old_index]);
				sorts.splice(old_index, 1);
			} else {
				sorts.splice(new_index, 0, sorts[old_index]);
				sorts.splice(old_index + 1, 1);
			}
		},
		// 监听父窗口请求
		acceptMessage(event) {
			let data=event.data.data
			switch (event.data.method) {
				case 'setPageInfo':
					this.setPageInfo(data);
					break;
				case 'layoutSave':
					this.layoutSave(data);
					break;
				case 'addComponent':
					this.addComponent(data);
					break;
				case 'update':
					this.updateAttr(data);
					break;
				case 'deleteComp':
					this.deleteComp();
					break;
				case 'topComp':
					this.topComp();
					break;
				case 'downComp':
					this.downComp();
					break;
				case 'noComp':
					this.noComp();
					break;
				case 'getDiy':
					this.getDiy(event.data.id);
					break;
			}
		},
		//设置页面信息
		setPageInfo(e){
			this.diyData.background_color=e.background_color
		},
		// 保存布局到数据库
		async layoutSave(e) {
			var params={
				name:e.name,
				page_name:e.page_name,
				background_color:e.background_color,
				path:e.path,
				sorts:JSON.stringify(this.diyData.sorts),
				id:e.id
			}
			if(this.isApi){
				await this.$post('diy/edit',data)
				.then(res => {
					if(res.code==200){
						window.parent.postMessage({
							method: 'saveResult',
							data:1
						}, '*');
					}else{
						window.parent.postMessage({
							method: 'saveResult',
							data:2
						}, '*')
					}
				})
			}else{
				this.setStorage('pageInfo',params)
				setTimeout(()=>{
					window.parent.postMessage({
						method: 'saveResult',
						data:1
					}, '*')
				},1000)
			}
		},
		// 添加新组件
		addComponent(attrObj) {
			attrObj.unique = Math.floor((new Date()).getTime() / 1000);
			this.diyData.sorts.splice(0, 0, attrObj);
			if(this.$state.diySelect.unique>0){
				for(var i in this.diyData.sorts){
					if(this.diyData.sorts[i].unique==this.$state.diySelect.unique)
					var index=i
				}
				this.parentGetUnique(index,2)
			}
		},
		// 更新组件属性内容
		updateAttr(data, oldthis) {
			let sorts = this.diyData.sorts;
			for (let i in sorts) {
				if (sorts[i].unique == data.unique) {
					let item = JSON.parse(JSON.stringify(sorts[i]));
					let obj = {
						id: sorts.id,
						type: 'update',
						unique: sorts[i].unique,
						item,
						new_data: data
					};
					for (let j in data) {
						this.diyData.sorts[i][j] = data[j]
					}
					break;
				}
			}
		},
		// 删除
		deleteComp() {
			let sorts = this.diyData.sorts;
			for (let k in sorts) {
				if (sorts[k].unique == this.$state.diySelect.unique) {
					let obj = {
						id: sorts.id,
						type: 'delete',
						index: k,
						item: sorts[k],
					}
					sorts.splice(k, 1);
					this.parentGetUnique(0,1,{})
				}
			}
		},
		//上移
		topComp() {
			let sorts = this.diyData.sorts;
			var new_index;
			var old_index;
			var id = sorts.id
			for (let k in sorts) {
				if (sorts[k].unique == this.$state.diySelect.unique) {
					new_index = parseInt(k) - 1
					old_index = parseInt(k)
					let obj = {
						id: id,
						old_index: new_index,
						new_index: old_index,
						type: 'sort',
					}
				}
			}
			this.saveSort(new_index, old_index, id)
			this.parentGetUnique(new_index,2)
		},
		//下移
		downComp() {
			let sorts = this.diyData.sorts;
			var new_index;
			var old_index;
			var id= sorts.id
			for (let k in sorts) {
				if (sorts[k].unique == this.$state.diySelect.unique) {
					new_index = parseInt(k) + 1
					old_index = parseInt(k)
					let obj = {
						id: id,
						old_index: old_index,
						new_index: new_index,
						type: 'sort',
					}
				}
			}
			this.saveSort(new_index, old_index, id)
			this.parentGetUnique(new_index,2)
		},
		// 选中某个模块
		activeGetUnique(item,index) {
			if(this.$state.editStatus){
				var name = item.sorts
				var unique=item.unique
				if(this.$state.diySelect.unique==unique){
					var value={
						unique:0,
						index:index
					}
					unique = -1
					item={}
				}else{
					var value={
						unique: unique,
						index:index
					}
				}
				this.$change({
					name:'diySelect',
					value:value
				})
				this.parentGetUnique(index,1,item)
			}
		},
		// 传递给父窗口选中模块变化
		parentGetUnique(index,state,item){
			if(!item){
				item=this.diyData.sorts[this.$state.diySelect.index]
			}
			window.parent.postMessage({
				method: 'parentGetUnique',
				data: {
					item:item,
					index:parseInt(index),
					state:state,//只有选中是1
					length:this.diyData.sorts.length
				}
			}, '*')
		},
		//当设置页面属性时，取消选中的模块
		noComp(){
			this.$change({
				name:'diySelect',
				value:{
					unique:0,
					index:0
				}
			})
		}
	}
}