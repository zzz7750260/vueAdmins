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
			  <el-form-item label="年龄" prop="age">
				<el-input v-model.number="refusteFormData.age" placeholder="请输入你的年龄"></el-input>
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
import {isvalidUsername,isvalidEmail,isvalidTel} from '../../utils/validate'

export default{
	name:'registe',
	data(){
		const validateUsername =(rule, value, callback)=> {
			if(!isvalidUsername(value)){
				console.log(isvalidUsername(value))
				callback(new Error('Please enter the correct user name'))
			}
			else{
				callback()
			}
		}
		const validatePassWord =(rule, value, callback)=> {
			if(value.length < 6){
				callback(new Error('密码不能少于6位数'))
			}
			else{
				callback()
			}
		}
		
		const checkValidatePassWord =(rule, value, callback)=> {
			if(value ===""){
				callback(new Error('请再次输入密码'));
			}
			else if(value !== this.refusteFormData.pass){
				callback(new Error('两次密码不一致'));
			}
			else{
				callback()
			}
		}
		
		const validateAge =(rule, value, callback)=> {
			if(!value){
				callback(new Error('年龄不能为空'));
			}
			else{
				setTimeout(() => {
					if(!Number.isInteger(value)){
						callback(new Error("必须输入整数"));
					}
					else{
						if(value < 18){							
							callback(new Error("年龄必须在18岁以上"));						
						}
						else{
							callback();
						}
					}
				},1000);
			}
		}
		
		const validateEmail =(rules, value, callback)=>{
			console.log(value)
			if(!isvalidEmail(value)){
				callback(new Error('你输入的电子邮件地址不正确'))			
			}
			else{
				callback()
			}
		
		}
		
		const validateTel =(rules, value, callback)=>{
			console.log("========这个是value=========")
			console.log(value)
			console.log("========这个是isvalidTel=========")
			console.log(isvalidTel(value))			
			if(!isvalidTel(value)){
				console.log(value)
				callback(new Error('请输入正确的电话号码'))
			}
			else{
				callback();
			}
		}
		
		return{
			theTitle:"用户注册",
			refusteFormData:{
				name: '',	
				pass: '',
				checkPass: '',
				qq: '',
				tel: null,
				email: '',
				age:'',
			},
			refusteRules:{
				name:[
					{required:true, trigger:'blur',validator:validateUsername},
					{ min:6, max:15, trigger:'blur',message:"长度在6到15个字节"},
				],
				pass:[{required:true, trigger:'blur',validator:validatePassWord}],
				checkPass:[{required:true, trigger:'blur',validator:checkValidatePassWord}],
				QQNum:[{type: 'number', required:false, trigger:'blur',message:"输入正确qq号码"}],	
				TelNum:[
					{type:'number', required:false, trigger:'blur',message:"必须为数字"},
					{trigger:'blur',validator:validateTel},	
				],	
				email:[{required:true, trigger:'blur',validator:validateEmail}],		
				age:[
					{type: 'number', required:true,trigger:'blur', message:"年龄必须为数字"},
					{required:true,trigger:'blur', validator:validateAge},	
				],
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
				userRole:0,
				userAge:this.refusteFormData.age,
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