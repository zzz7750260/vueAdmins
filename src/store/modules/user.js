import {getToken,setToken,removeToken} from '../../utils/auth'
import {loginByUsername, logout, getUserInfo} from '../../api/login'

const user = {
	state:{
		user:'',
		status:'',
		code:'',
		token:getToken(),
		name:'',
		avatar:'',
		introduction:'',
		roles:[],
		setting:{
			articlePlatform:[]
		}		
	},
	
	mutations:{
		SET_CODE:(state, code)=>{
			state.code = code			
		},
		SET_TOKEN: (state, token)=>{
			state.token = token			
		},
		SET_INTRODUCTION: (state,introduction)=>{
			state.introduction = introduction
		},
		SET_SETTING: (state, setting) =>{
			state.setting = setting			
		},
		SET_NAME:(state,status) =>{
			state.status = status			
		},
		SET_AVATAR:(state,roles) =>{
			state.roles = roles
		}
	},
	
	actions:{
		//用户登录
		LoginByUsername({ commit },userInfo){
			const usename = userInfo.username.trim()
			return new Promise((resolve, reject) =>{
				loginByUsername(username, userInfo.password).then(response =>{
					const data = response.data
					commit('SET_TOKEN', data.token)
					setToken(response.data.token);
					resolve()
				}).catch(err=>{
					reject(error)
				})
			})			
		},
		
		//获取用户信息
		GetUserInfo({ commit,state }){
			return new Promise((resolve,reject)=>{
				getUserInfo(state.token).then(response =>{
					if(!response.data){
						reject('error')
					}
					const data = response.data
					commit('SET_ROLES',data.roles)
					commit('SET_NAME',data.name)
					commit('SET_AVATAR',data.avatar)
					commit('SET_INTRODUCTION',data.introduction)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})			
		}		
	}
}

export default user