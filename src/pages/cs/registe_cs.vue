<template>
	<div>
		<h3>这个是管理用户界面</h3>
		<div class="registe">
			<el-form :model="refusteFormData" status-icon :rules="refusteRules" ref="registeForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="refusteFormData.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="refusteFormData.checkPass" auto-complete="off"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="年龄" prop="age">
				<el-input v-model.number="refusteFormData.age"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="QQ号码" prop="QQNum">
				<el-input v-model.number="refusteFormData.QQNum"></el-input>
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
import {isvalidUsername,isvalidEmail,isvalidTel,isTheNum} from '../../utils/validate'

export default{
	name:'registe',
	data(){
		var validateUsername =(rule, value, callback)=> {
			if(!isvalidUsername(value)){
				console.log(isvalidUsername(value))
				callback(new Error('Please enter the correct user name'))
			}
			else{
				callback()
			}
		}
		
		var validatePassWord =(rule, value, callback)=> {
			if(value.length < 6){
				callback(new Error('密码不能少于6位数'))
			}
			else{
				callback()
			}
		}
		
		var checkValidatePassWord =(rule, value, callback)=> {
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
		
		
		var validateEmail =(rule, value, callback)=>{
			console.log(value)
			if(!isvalidEmail(value)){
				callback(new Error('你输入的电子邮件地址不正确'))			
			}
			else{
				callback()
			}
		
		}
			
		var validateTel =(rule, value, callback)=>{
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
		
		var validateAge =(rule, value, callback)=> {
			console.log("返回年龄"+value)
			if(!value){
				callback(new Error('aaa年龄不能为空'));
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
		
		var validateQQ = (rule, value, callback)=>{
			console.log("qq号码返回"+value)
			if(!isTheNum(value)){
				callback(new Error('QQ号码必须为数字'))
			}
			else if(!Number.isInteger(value)){
				callback(new Error("必须输入整数"));			
			}
			else{
				callback()
			}
		}
		
		
		return{
			theTitle:"用户注册",
			refusteFormData:{
				name: '',	
				pass: '',
				checkPass: '',
				QQNum: '',
				tel: null,
				email: '',
				age:'',
			},
			refusteRules:{
				pass:[{required:true, trigger:'blur',validator:validatePassWord}],
				checkPass:[
					{required:true, trigger:'blur',validator:checkValidatePassWord}
				],
				QQNum:[			
					{trigger:'blur', validator:validateQQ,required:true},				
				],	
				TelNum:[	
									
				],	
				email:[{required:true, trigger:'blur',validator:validateEmail}],		
				age:[				
					{trigger:'blur', validator:validateAge,required:true},	
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