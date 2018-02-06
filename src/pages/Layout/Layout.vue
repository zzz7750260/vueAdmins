<template>
	<div class="app-wrapper">
		<!--布局-->
		<div class="main-container" v-bind:class="{hideSidebar:!sidebar.opened}">
			<sidebar class="sidebar-container"></sidebar>
			<div class="main-container">
				<navbar></navbar>				
				<tags-view></tags-view>
				<!--<router-view></router-view>-->
				<app-main></app-main>
			</div>
		</div>
	</div>
</template>

<script>
	import {Navbar,TagsView,Sidebar,AppMain} from './components'
	export default{
		name:'layout',
		components:{
			Navbar,
			TagsView,
			Sidebar,
			AppMain,
		},
		computed:{
			sidebar(){
				return this.$store.state.app.sidebar
			}
		}	
	}	
</script>

<style lang="less" scoped>
	@import (reference) "../../styles/mixin.less";
	.app-wrapper {
		&:extend(.clearfix);
		position: relative;
		height: 100%;
		width: 100%;		
	}
</style>