<template>
	<div>
		<div>
			<h3>这个是前端的文章页面</h3>
			<h4>{{articleForm.title}}</h4>
			
		</div>
		<div>
			<div>
				<span>作者：{{articleForm.author}}</span>
				<span>时间：{{articleForm.display_time}}</span>
				<span v-show = "articleForm.source_name">文章来源：{{articleForm.source_name}}</span>
			</div>
			<hr>
		</div>
		<div>
			{{articleForm.content_short}}
		</div>
		<div>
			{{articleForm.content}}
		</div>
		
	</div>
</template>

<script>
import {webGetArticle}  from "../../api/web.js"
const defaultForm = {
	status:'draft',
	author:'',
	title:'',
	content:'',
	content_short:'',
	source_url:'',
	image_url:'',
	source_name:'',
	display_time:undefined,//显示时间
	id:'',
	platforms:['a-platform'],
	commit_disabled:false
}

export default{
	name:'articlepage',
	data(){
		return{
			theArticleID:'',
			articleForm:Object.assign({},defaultForm)
		}
	},
	
	created(){
		
	},
	
	mounted:function(){
		this.getArticle()
	},
	
	methods:{
		getArticle(){
			this.theArticleID = this.$route.query.articleID
			console.log("============前端获取文章的ID================")
			console.log(this.theArticleID)
			webGetArticle(this.theArticleID).then((response)=>{
				console.log("===============前端获取文章返回数据====================");
				console.log(response);
				var res = response.data;
				var theParams = {
						status:res.result.articleStatus,
						author:res.result.articleAuthor,
						title:res.result.articleTitle,
						content:res.result.articleContent,
						content_short:res.result.articleShortContent,
						source_url:res.result.articleSource,
						image_url:res.result.articleImg,
						source_name:res.result.articleSourceName,
						display_time:res.result.articleTime,//显示时间
						id:res.result.articleID,
						platforms:['a-platform'],
						commit_disabled:res.result.articleCheck	
				}
				this.articleForm = theParams;
			})
		},
	}
}	
</script>