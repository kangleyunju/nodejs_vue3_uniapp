import axios from 'axios'
import store from '@/store';

const baseUrl='http://192.168.0.141:7000'//请求地址
const isDev= true
const baseName ="我的世界"//默认名称
const baseWs ='ws://172.21.151.209:8000'//socket链接
const mainColor = '#F52B43'//主题色

function $get(url, params={}) {
	var link = isDev ? baseUrl +'/'+url : '/api' + url
	if (store.state.hasLogin) {
		params.per_id= store.state.userInfo.user_id
	}
	return new Promise((resolve, reject) => {
		axios.get(link, {            
			params        
		}).then((res) =>{
			resolve(res.data)
		}).catch((fail) =>{
			let err =JSON.parse(JSON.stringify(fail))
			if(err.status){
				if(err.status==404){
					resolve({
						code:404,
						msg:'接口不存在'
					})
				}else{
					resolve({
						code:250,
						msg:err.message
					})
				}
			}else{
				resolve({
					code:400,
					msg:err.message
				})
			}
		})
	})
}

function $post(url, params={}) {
	var link = isDev ? baseUrl +'/'+url : '/api' + url
	if (store.state.hasLogin) {
		params.per_id= store.state.userInfo.user_id
	}
	return new Promise((resolve, reject) => {
		axios.post(link, params)
		.then((res) =>{
			resolve(res.data)
		}).catch((fail) =>{
			let err =JSON.parse(JSON.stringify(fail))
			if(err.status){
				if(err.status==404){
					resolve({
						code:404,
						msg:'接口不存在'
					})
				}else{
					resolve({
						code:250,
						msg:err.message
					})
				}
			}else{
				resolve({
					code:400,
					msg:err.message
				})
			}
		})
	})
}

function $uploadImg(file) {
	let type = file.type;
	let size = file.size / 1024 / 1024;
	let link = isDev ? baseUrl +'/upload' : '/api/upload'
	let typelist = 'image/jpeg, image/png, image/jpg, image/gif'
	return new Promise((resolve, reject) => {
		if (typelist.indexOf(type) === -1) {
			resolve({
				code:250,
				msg:'上传的图片格式不正确!'
			})
			return;
		}
		if (size > 0.5) {
			resolve({
				code:250,
				msg:'图片不能大于500kb!'
			})
			return;
		}
		let form = new FormData();
		form.append('file', file);
		axios.post(link,form, {
			headers: {}
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}

function  md5(code){
	code=encodeURI(code)
	var password=String.fromCharCode(code.charCodeAt(0)+code.length)
	for(var i=1;i<code.length;i++){      
		password+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1))
	}
	return password
}
// 读取缓存
function getStorage(key,type=1){
	var res=JSON.parse(localStorage.getItem(md5(key)))
	if(type==2){
		if(new Date().getTime()>=res.endTime){
			res=''
		}
	}
	return res
}
//设置缓存
function setStorage(key,data){
	 localStorage.setItem(md5(key),JSON.stringify(data))
}
//清除缓存
function removeStorage(key){
	localStorage.removeItem(md5(key))
}

function changeTime(t){
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
}


export default {
	baseUrl,
	$get,
	$post,
	$uploadImg,
	getStorage,
	setStorage,
	removeStorage,
	changeTime
}