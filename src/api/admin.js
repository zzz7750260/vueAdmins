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

export function getChangeRole(theParams){
	console.log("===============传递的用户组以及选择的角色==============");
	console.log("roleArray:" + theParams.roleArray);
	console.log("theRole:" + theParams.theRole);
	const data = {
		userArray:theParams.roleArray,
		userRole:theParams.theRole
	}
	return request({
		url:'./admin/getChangeRoles',
		method:'post',
		data 
	})	
}