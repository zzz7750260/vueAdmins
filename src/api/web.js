import request from "../utils/request"

export function webGetArticle(theParams){
	console.log("================获取文章请求取到的文章id============")
	console.log(theParams);
	var getParams = {
		articleID:theParams,		
	}
	return request({
		url:'./web/getArticle',
		method:'get',
		params:getParams,
	})	
}