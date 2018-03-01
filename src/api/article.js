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

//获取文章列表
export function listArticle(theParams){
	//var getParams = {
	//	articleStatus:theParams,		
	//}
	return request({
		url:'./users/listArticle',
		method:'get',
		params:theParams
	})	
}

//获取文章详情
export function getArticleDetail(theID){
	var theParams = {
		articleID:theID
	}
	return request({
		url:'./users/articleDetail',
		method:'get',
		params:theParams,
	})	
}

//更新文章内容
export function updataAricle(articleParams){
	console.log("==================获取更新的文章参数================");
	console.log(articleParams);
	const data = articleParams;
	return request({
		url:'./users/editUpdataArticle',
		method:'post',
		data
	})	
} 

//删除文章
export function delArticle(theParams){
	var data = {
		articleID:theParams
	}
	return request({
		url:'./users/delArticle',
		method:'post',
		data		
	})
}