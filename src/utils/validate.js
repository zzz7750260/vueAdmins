export function isvalidUsername(str){
	const UsernameRegex = /^[a-zA-Z]/;
	return 	UsernameRegex.test(str)
}

/*邮箱验证*/
export function isvalidEmail(str){
	const theEmailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return theEmailRegex.test(str)
}