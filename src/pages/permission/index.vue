<template>
	<div class="app-container">
		<h3>权限控制</h3>
		<div>
			<el-radio-group v-model="switchRoles">
				<el-radio-button label="editor"></el-radio-button>
			</el-radio-group>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
	name: 'permission',
	computed:{
		...mapGetters([
			'roles'
		])
	},
	watch:{
		switchRoles(val){
			this.$store.dispatch('ChangeRoles',val).then(()=>{
				this.$router.push({ path:'/permission/index?'+ +new Date()})
			})
		}
	}
	
}
</script>