import store from './store.js'

export default {
	data(){
		return{
			baseUrl:'http://localhost:7000',
			// baseUrl:'http://172.21.151.209:7000',
			isDev:true,
			baseName:"我的世界",
			baseWs:'ws://192.168.0.141:8000',
			mainColor:'#F52B43'
		}
	},
	methods: {
		onLaunch(){
			let userInfo=this.getStorage('user')
			if(userInfo!=''){
				this.$login(userInfo,1)
			}
		},
		goIcon(url){
			if(!store.state.editStatus){
				if(url.toString().indexOf('http')>-1){
					if(url.toString().indexOf('pages')>-1){
						var str = url.match(/pages(\S*)/)[1];
						this.jump(str)
					}else{
						this.href(url)
					}
				}else{
					this.jump(url)
				}
			}
		},
		href(url,name){
			// #ifdef APP-PLUS
			 plus.runtime.openURL(url)
			 // #endif
			 // #ifdef H5
			 window.location.href=url
			 // #endif
		},
		changeTime(t){
			if(!t){
				t=new Date().getTime()
			}
			let res={}
			res.year=new Date(t).getFullYear()
			res.month=new Date(t).getMonth()+1
			res.month=res.month>9?res.month:'0'+res.month
			res.day=new Date(t).getDate()
			res.day=res.day>9?res.day:'0'+res.day
			res.date=res.year+'-'+res.month+'-'+res.day
			return res.date
		},
		goback() {
			// #ifdef H5
			if (window.history.length <= 1) {
				this.jump('/index/index')
			} else {
				this.$router.go(-1);
			}
			// #endif
			// #ifndef H5
			uni.navigateBack()
			// #endif
		},
		previewImg(img,index){
			var arr=[]
			if(typeof(img)=='string'){
				arr.push(img)
			}else{
				arr=img
			}
			uni.previewImage({
				urls:arr,
				current:index
			})
		},
		$login(userInfo){
			store._mutations.login[0](userInfo)
			this.setStorage('user',userInfo)
		},
		$logout(){
			this.removeStorage('user')
			store._mutations.logout[0]()
			uni.closeSocket()
		},
		getUserInfo(){
			if(store.state.hasLogin){
				return store.state.userInfo
			}else{
				return false
			}
		},
		hasLogin(e){
			if(store.state.hasLogin){
				return true
			}else{
				if(e==2){
					this.jump('/index/login',2)
				}
				return false
			}
		},
		navTo(url) {
			if (!store.state.hasLogin) {
				url = '/index/login';
			}
			this.jump(url)
		},
		jump(url,type=1) {
			var arr=['/index/index','/user/user']
			if(arr.includes(url)){
				uni.reLaunch({
					url: '/pages' + url
				})
			}else{
				if (type == 2) {
					uni.redirectTo({
						url: '/pages' + url
					});
				} else {
					uni.navigateTo({
						url: '/pages' + url
					})
				}
			}
		},
		md5(code){
			code=encodeURI(code)
			var password=String.fromCharCode(code.charCodeAt(0)+code.length)
			for(var i=1;i<code.length;i++){      
				password+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1))
			}
			return password
		},
		//获取缓存
		getStorage(key,type=1){
			var res=uni.getStorageSync(this.md5(key))
			if(type==2){
				if(new Date().getTime()>=res.endTime){
					res=''
				}
			}
			return res
		},
		//设置缓存
		setStorage(key,data){
			 uni.setStorageSync(this.md5(key),data)
		},
		//清除缓存
		removeStorage(key){
			uni.removeStorageSync(this.md5(key))
		},
		//消息提示
		toast(content,time,type,boolean) {
			if(time==true){
				boolean=true
				time=2000
			}
			if(time=='success'){
				type='success'
				time=2000
			}
			uni.showToast({
				title: content.toString(),
				duration: time||2000,
				icon: type||'none',
				mask:boolean||false
			})
		},
		$upload(filePath){
			return new Promise((resolve,reject)=>{
				uni.uploadFile({
					url:this.baseUrl+'/upload',
					filePath: filePath,
					name: 'file',
					success: (res) => {
						if(JSON.parse(res.data).code==200){
							resolve(JSON.parse(res.data).data)
						}else{
							this.toast(JSON.parse(res.data).msg)
						}	
					}
				})
			})
		},
		$post(url, data = {}) {
			var that=this
			if (this.isDev) {
				var link = this.baseUrl + '/' + url
			} else {
				var link = '/api/' + url
			}
			if (store.state.hasLogin) {
				data.per_id= store.state.userInfo.user_id
			}
			var promise = new Promise((resolve, reject) => {
				uni.request({
					url: link,
					data: data,
					method: "POST",
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						switch(res.statusCode){
							case 404:
								that.toast('接口不存在')
								break;
							case 200:
								resolve(res.data)
								break;
							default:
								that.toast(res.statusCode)
								break;
						}
					},
					error: function(error) {
						reject("error")
					}
				})
			})
			return promise
		},
		$get(url, data = {}) {
			var that=this
			if (this.isDev) {
				var link = this.baseUrl + '/' + url
			} else {
				var link = '/api/' + url
			}
			if (store.state.hasLogin) {
				data.per_id= store.state.userInfo.user_id
			}
			var promise = new Promise((resolve, reject) => {
				uni.request({
					url: link,
					data: data,
					method: "GET",
					header: {
						"content-type": "application/json"
					},
					success: function(res) {
						switch(res.statusCode){
							case 404:
								that.toast('接口不存在')
								break;
							case 200:
								resolve(res.data)
								break;
							default:
								that.toast(res.statusCode)
								break;
						}
					},
					error: function(error) {
						reject(error)
					}
				})
			})
			return promise
		}
	}
}