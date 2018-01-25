<template>
	<div class="app-wrapper">
		<!--布局-->
		<!--<sidebar></sidebar>-->
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {Navbar,TagsView} from './components'
	export default{
		name:'layout',
		components:{
			Navbar,
			TagsView
		},
	
	}
	
</script>