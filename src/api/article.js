import request from "../utils/request"
export function addArticle(postForm){
	console.log("==============这个是传入文章的数据===============");
	console.log(postForm)
	const data = postForm;
	return request({
		url:'./users/addArticle',
		method:'post',
		data
	})
}