<template>
	<div>
		<div>
			<h3>这个是文章编辑</h3>
			<hr/>
		</div>
		<div>
			<article-detail v-bind:is-edit='true'>
			
			</article-detail>
		</div>
	</div>
</template>

<script>
	import ArticleDetail from './components/ArticleDetail'
	export default{
		name:'editForm',
		components:{
			ArticleDetail,
		}	
	}
</script>