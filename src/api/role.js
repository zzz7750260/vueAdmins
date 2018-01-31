import request from '../utils/request'

export function addRole(therole,theroleen){
	const data = {
		therole,
		theroleen
	}
	console.log("===========内部参数============")
	console.log(data)
	return request({
		url:'./admin/addRole',
		method:'post',
		data
	})
	
}

export function getRole(){
	return request({
		url:'./admin/getRole',
		method:'get',
	})	
}