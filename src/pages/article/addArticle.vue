<template>
	<div>
		<h3>这个是添加文章</h3>
		<hr>
		<div>
		aaa
			<article-detail v-bind:isEdit = "false"></article-detail>
		</div>
	</div>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
export default{
	name:'createArticle',
	components:{
		ArticleDetail,
	}
}
</script>