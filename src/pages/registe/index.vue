<template>
	<div>
		<h3>这个是管理用户界面</h3>
		<div class="registe">
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
			  <el-form-item label="QQ号码" prop="QQNum">
				<el-input v-model.number="refusteFormData.qq" placeholder="输入QQ号码"></el-input>
			  </el-form-item>
			  <el-form-item label="电话号码" prop="TelNum">
				<el-input v-model.number="refusteFormData.tel" placeholder="输入电话号码"></el-input>
			  </el-form-item>
			  <el-form-item label="电子邮箱" prop="email">
				<el-input v-model.number="refusteFormData.email" placeholder="输入电子邮箱"></el-input>
			  </el-form-item>				
			  <el-form-item>
				<el-button type="primary" @click="submitForm('registeForm')">提交</el-button>
				<el-button @click="resetForm('registeForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
	data(){
		return{
			theTitle:"用户注册",
			refusteFormData:{
				name: '',	
				pass: '',
				checkPass: '',
				qq: '',
				tel: '',
				email: '',
			},
			refusteRules:{
				name:[
					{required:true, trigger:'blur',message:"输入正确用户名"},
					{ min:6, max:15, trigger:'blur',message:"长度在6到15个字节"},
				],
				pass:[{required:true, trigger:'blur',message:"输入正确用户名"}],
				checkPass:[{required:true, trigger:'blur',message:"输入正确用户名"}],
				QQNum:[{type: 'number', required:false, trigger:'blur',message:"输入正确qq号码"}],	
				TelNum:[{type: 'number', required:false, trigger:'blur',message:"输入正确电话号码"}],	
				email:[{required:true, trigger:'blur',message:"输入正确邮箱地址"}],					
			}
		}
	},
	mounted(){
		
	},
	methods:{
		submitForm(formName) {
			var params={
				userName:this.refusteFormData.name,
				userPass:this.refusteFormData.checkPass,
				userQQ:this.refusteFormData.qq,
				userTel:this.refusteFormData.tel,
				userEmail:this.refusteFormData.email,
				/*userJoinTime:0,*/
				userRole:0
			}
			axios.post("./admin/registe",{params}).then((response)=>{
				console.log(response);
			})
		 },
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}

</script>

<style lang="less">
	.registe{
		width:380px;
		margin:0px auto;
	}
</style>