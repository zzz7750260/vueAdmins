<template>
	<div>
		<h3>
			{{theTitle}}
		</h3>
		<div>
			<el-form :model="refusteFormData" status-icon :rules="refusteRules" ref="registeForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="name">
				<el-input v-model="refusteFormData.name" auto-complete="on" placeholder="输入用户名"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="refusteFormData.pass" auto-complete="off" placeholder="输入注册密码"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="refusteFormData.checkPass" auto-complete="off" placeholder="确认注册密码"></el-input>
			  </el-form-item>
			  <el-form-item label="年龄" prop="age">
				<el-input v-model.number="refusteFormData.age"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			theTitle:"用户注册",
			refusteFormData:{
				name: '',	
				pass: '',
				checkPass: '',
				age: ''	
			},
			refusteRules:{
				name:[{required:true, trigger:'blur',message:"输入正确用户名"}],
				pass:[{required:true, trigger:'blur',message:"输入正确用户名"}],
				checkPass:[{required:true, trigger:'blur',message:"输入正确用户名"}],
				age:[{required:true, trigger:'blur',message:"输入正确用户名"}],			
			}
		}
	},
	methods:{
		submitForm(formName) {
		 },
		resetForm(formName) {
		
		}
	}
}

</script>
