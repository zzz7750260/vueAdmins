<template>
	<div class="app-container">
		<h3>权限控制</h3>
		<div>
			<!--{{theRoles}}-->
			<el-radio-group v-model="switchRoles" v-for="tRole in theRoles" v-bind:key="tRole.theRole">
				<el-radio-button v-bind:label="tRole.theRole">{{tRole.roleName}}</el-radio-button>
			</el-radio-group>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getRole} from '../../api/role'
export default{
	name: 'permission',
	data(){
		return{
			switchRoles:'',
			theRoles:'',
		}
	},
	mounted:function(){
		this.initRole()
	},
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
	},
	methods:{
		initRole(){
			getRole().then((response)=>{
				console.log(response);
				let res = response.data;
				this.theRoles = res.result
			})
		}
	}
	
}
</script>