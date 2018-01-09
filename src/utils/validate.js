export function isvalidUsername(str){
	const UsernameRegex = /^[a-zA-Z]/;
	return 	UsernameRegex.test(str)
}