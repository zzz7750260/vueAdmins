<template>
	<div class="dashboard-container">
		<h3>仪盘表</h3>
		<component v-bind:is="currentRole"></component>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import adminDashboard from './admin'
	import eaditorDashboard from './editor'
	
	export default{
		name:'dashboard',
		components:{
			adminDashboard,
			eaditorDashboard,
		},
		data(){
			return{
				currentRole:'adminDashboard'
			}
		},
		computed:{
			...mapGetters([
				'roles'
			])
		},
		created(){
			console.log("roles的值:"+ this.roles)
			if(this.roles.includes('admin')){
				this.currentRole = 'adminDashboard'
			}
			else if(this.roles.includes('user')){
				this.currentRole = 'eaditorDashboard'
			}
		}
	}
</script>