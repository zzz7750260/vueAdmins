<template>
	<div class="app-container">
		<h3>权限控制</h3>
		<div>
			<!--{{theRoles}}-->
			<el-radio-group v-model="switchRoles" v-for="tRole in theRoles" v-bind:key="tRole.theRole">
				<el-radio-button v-bind:label="tRole.theRole">{{tRole.roleName}}</el-radio-button>
			</el-radio-group>
		</div>
		
		<div>
			<el-table v-bind:data="userData" style="width:100%;"  @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="userName" label="用户名" ></el-table-column>
				<el-table-column prop="userRole" label="用户权限" ></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getRole,getUser} from '../../api/admin'
export default{
	name: 'permission',
	data(){
		return{
			switchRoles:'',
			theRoles:'',
			isActive:true,
			userData:[],
			multipleSelection:[],
			selectUserName:[],
		}
	},
	mounted:function(){
		this.initRole(),
		this.initUser()
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
		},
		
		initUser(){
			getUser().then((response)=>{
				console.log(response);
				let res = response.data;
				this.userData = res.result.theUsers;
			})
		},
		handleSelectionChange(val){
			this.multipleSelection = val
			console.log(this.multipleSelection)
			//获取选中数组的username，需要时提交给后台进行批量操作
			this.selectUserName = this.multipleSelection.map((item)=>{return item.userName})
			console.log(this.selectUserName)
		}
	}
	
}
</script>