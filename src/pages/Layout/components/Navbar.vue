<template>
	<el-menu class="navbar" mode="horizontal">
		<!--汉堡包-->		
		<hamburger class="hamburger-container" v-bind:toggleClike="toggleSideBar" v-bind:isActive="sidebar.opened"></hamburger>	

		<!--面包屑-->
		<breadcrumb class="breadcrumb-container"></breadcrumb>
		
		<!--导航右侧-->
		<div class="right-menu">
			<error-log class="errLog-container right-menu-item"> </error-log>
			
			 <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
				<screenfull class="screenfull right-menu-item"></screenfull>
			 </el-tooltip>

			<lang-select class="international right-menu-item"></lang-select>			
			
			<!--主题选择-->
			<el-tooltip effect="dark" v-bind:content="navbar.theme" placement="bottom">
				<theme-picker class="theme-switch right-menu-item"></theme-picker>
			</el-tooltip>
			<!--下拉-->
			<el-dropdown class="avater-container right-menu-item" trigger="click">
				<div class="avatar-wrapper">
				  <img class="user-avatar" v-bind:src="avatar+'?imageView2/1/w/80/h/80'">
				  <i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/">
						<el-dropdown-item>
							首页
						</el-dropdown-item>
						<el-dropdown-item divided>
							<span style="display:block" v-on:click="logout">登出</span>
						</el-dropdown-item>
					</router-link>
				</el-dropdown-menu>				
			</el-dropdown>
		</div>
	</el-menu>	
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
	
	}

</script>