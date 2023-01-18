import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		editStatus:false,//是否编辑状态
		diySelect:{
			unique:0,//选中的模块id
			index:0//选中的模块索引
		}
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true
			state.userInfo = userInfo
		},
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
		},
		change(state,data){
			for(var i in state){
				if(data.name==i){
					state[i]=data.value
				}
			}
		}
	}
})
export default store
