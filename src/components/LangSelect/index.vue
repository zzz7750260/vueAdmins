<!--语言切换组件-->
<template>
	<el-dropdown trigger="click" v-on:command ="handleSetLanguage">
		<span class="el-dropdown-link">
			语言选择<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="zh" v-bind:disabled="language==='zh'">中文</el-dropdown-item>
			<el-dropdown-item command="en" v-bind:disabled="language==='en'">English</el-dropdown-item>		
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script> 
	export default{
		name:"langselect",
		computed:{
			language(){
				return this.$store.getters.language
			}
		},
		methods:{
			handleSetLanguage(lang){
				this.$i18n.locale = lang
				this.$store.dispatch('setLanguage', lang)
				this.$message({
					message:'switch language success',
					type:'success'
				})
			}			
		}
	}	
</script>