import {getToken,setToken,removeToken} from '../../utils/auth'
import {loginByUsername, getUserInfo,logout} from '../../api/login'
import {getChangeRole} from '../../api/admin'

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
		SET_STATUS:(state,status) =>{
			state.status = status			
		},
		SET_NAME:(state,name) =>{
			state.name = name
			
		},
		//SET_AVATAR:(state,roles) =>{
			//state.roles = roles
		//},
		SET_ROLES:(state, roles) =>{
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
		
		GetUserInfo({ commit,state }){
			return new Promise((resolve,reject)=>{
				getUserInfo(state.token).then(response =>{
					console.log("============根据token获取用户信息============");
					console.log(response);
					if(!response.data){
						reject('error')
					}
					const data = response.data.result
					commit('SET_ROLES',data.userRole)
					commit('SET_NAME',data.userName)
					//commit('SET_AVATAR',data.avatar)
					//commit('SET_INTRODUCTION',data.introduction)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})			
		},

		//切换用户权限
		ChangeRoles({ commit }, role){
			return new Promise(resolve => {
				commit('SET_ROLES', role)
				setToken(role)
				getUserInfo(role).then((response)=>{
					console.log("=========切换获取信息==========")
					console.log(response);
					let res = response.data;	
					commit('SET_ROLES', res.result.userRole)
					commit('SET_NAME', res.result.userName)
					resolve()
				})
				
			})			
		},
		
		//控制用户权限
		getChangeRolesControl({ commit },theParams){
			return new Promise((resolve) =>{
				console.log("================获取用户控制的权限=============");
				console.log("roleArray:"+ theParams.roleArray);
				console.log("theRole:"+ theParams.theRole);
				getChangeRole(theParams).then((response)=>{
					console.log(response)
					let res = response.data;									
				})				
			})			
		},

		//用户登出
		logOut({ commit,state }){
			return new Promise((resolve,reject) => {
				logout(state.token).then(()=>{
					commit('SET_TOKEN','')
					commit('SET_ROLES',[])
					removeToken()
					resolve()
				}).catch(error =>{
					reject(error)					
				})				
			})		
		}
	}
}

export default user