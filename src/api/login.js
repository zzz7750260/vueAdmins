import request from "../utils/request"

export function loginByUsername(username, password){
	const data = {
		username,
		password		
	}
	return request({
		url: './admin/login',
		method:'get',
		params:{ data }		
	})
}

//根据token获取用户信息
export function getUserInfo(token){
	return request({
		url:'./admin/info',
		method:'get',
		params:{ token }		
	})	
}