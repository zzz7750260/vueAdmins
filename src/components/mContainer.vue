<template>
	<div>
		<el-row>
		<!--<h3>导航</h3>-->
			<nav-header></nav-header>	
		</el-row>	

		
		<el-row>
		<!--<h3>边导航</h3>-->
			<nav-sider></nav-sider>
			
			
		</el-row>	
			
		
		
	</div>
</template>
<script>
import navHeader from './mNavHeader'
import navSider from './mNavSider'
export default{
	name:'mContainer',
	components:{
		navHeader,
		navSider
	}
}
</script>
<style lang="less">

</style>