<template>
	<el-menu mode="vertical" class="el-menu-vertical-demo" v-bind:default-active="$route.path" v-bind:collapse="isCollapse"  background-color="#304156" 	text-color="#bfcbd9" active-text-color="#409EFF">
		<sidebar-item v-bind:routes="permission_routers"></sidebar-item>
	</el-menu>	
</template>

<script>
	import { mapGetters } from 'vuex'
	import SidebarItem from './SidebarItem'
	export default{
		components:{ 
			SidebarItem 		
		},
		computed:{
			...mapGetters([
				'permission_routers',
				'sidebar'
			]),
			isCollapse(){
				return !this.sidebar.opened
			}
			
		}
	}
</script>

<style>
</style>

