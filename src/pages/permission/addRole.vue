<template>
	<div>
		<h3>添加角色</h3>
		<div>
			<el-form label-position="right" ref="addRoleForm" label-width="80px" v-bind:model="addRoleForm">
				<el-form-item label="角色">
					<el-input placeholder="请输入添加的角色名称" v-model="addRoleForm.theRole"></el-input>
				</el-form-item>
				<el-form-item label="英文">
					<el-input placeholder="请输入角色对应的英文字段" v-model="addRoleForm.theRoleEN"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="submitForm('addRoleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>				
				</el-form-item>
			</el-form>			
		</div>
	</div>
</template>

<script>
	import {addRole} from '../../api/admin'
	export default{
		name:'addrole',
		data(){
			return{
				addRoleForm:{
					theRole:'',
					theRoleEN:'',
				}
			}
		},
		methods:{
			submitForm(addRoleForm){
				this.$refs[addRoleForm].validate((valid) => {
					if(valid){
						console.log("theRole:"+this.addRoleForm.theRole)
						console.log("theRoleEN:"+this.addRoleForm.theRoleEN)						
						addRole(this.addRoleForm.theRole,this.addRoleForm.theRoleEN).then((response)=>{
							console.log(response)
							let res = response.data;
							
							if(res.status == "4"){
								alert("添加角色失败")
							}
							else if(res.status == "3"){
								alert("英文名字重复")
							}
							else if(res.status == "2"){
								alert("该角色存在")
							}
														
							/*
							switch(res.status){
								case "2":
								alert("试试呢,此方法行")
								break;
							}	
							*/							
						})
					}
				})
			}
		}
	}
</script>