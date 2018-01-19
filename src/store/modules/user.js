import {getToken,setToken,removeToken} from '../../utils/auth'
import {loginByUsername} from '../../api/login'

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
			console.log("===========输入的用户信息=============")
			console.log(userInfo);
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) =>{
				loginByUsername(username, userInfo.password).then(response =>{
					console.log("=============返回的信息==============")
					console.log(response)
					const data = response.data
					commit('SET_TOKEN', data.token)
					setToken(response.data.token);
					resolve()
				}).catch(error=>{
					reject(error)
				})
			})			
		},
		
		//获取用户信息
		/*
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
		*/
	}
}

export default user