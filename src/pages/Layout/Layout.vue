<template>
	<div class="app-wrapper">
		<!--布局-->
		<div class="main-container">
			<navbar></navbar>
			<sidebar></sidebar>
			<tags-view></tags-view>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {Navbar,TagsView,Sidebar} from './components'
	export default{
		name:'layout',
		components:{
			Navbar,
			TagsView,
			Sidebar,
		},
	
	}
	
</script>