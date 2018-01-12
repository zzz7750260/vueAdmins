/*用户名验证*/
export function isvalidUsername(str){
	const UsernameRegex = /^[a-zA-Z]/;
	return 	UsernameRegex.test(str)
}

/*邮箱验证*/
export function isvalidEmail(str){
	const theEmailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log(theEmailRegex.test(str))
	return theEmailRegex.test(str)
}

/*电话验证*/
/**
 * 验证手机号码
 * 
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 * 
 * param cellphone
 * return
 */
export function isvalidTel(cellphone){
	const theTelRegex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	console.log("返回"+theTelRegex.test(cellphone))
	return theTelRegex.test(cellphone)
}

