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

export function getUser(){
	return request({
		url:'./admin/getUser',
		method:'get'
	})	
}

export function getChangeRole(roleArray,theRole){
	const data = {
		userArray,
		userRole
	}
	return request({
		url:'./admin/getChangeRole',
		method:'post',
		data 
	})	
}