<template>
	<div>	
		<h3>{{theTitle}}</h3>
		<div class="login">
			<el-radio-group v-model="labelPosition" size="small">
			  <el-radio-button label="left">左对齐</el-radio-button>
			  <el-radio-button label="right">右对齐</el-radio-button>
			  <el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<div style="margin: 20px;"></div>			
			<el-form :label-position="labelPosition" label-width="80px" status-icon :model="loginFormData" v-bind:rules="loginRules" ref="loginForm">
			  <el-form-item label="账号：" prop="username">
				<el-input v-model="loginFormData.username" placeholder="输入用户名"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：" prop="password">
				<el-input v-model="loginFormData.password" placeholder="输入用户密码"></el-input>
			  </el-form-item>
			</el-form>
		</div>
		<div>
			<el-button v-on:click = "handleLogin('loginForm')">登录</el-button>
			<router-link to="./registe"><el-button>注册</el-button></router-link>
		</div>
	</div>
</template>
<script>
import {isvalidUsername} from '../../utils/validate'
export default{
	data(){
		const validateUsername = (rule, value, callback)=>{
			console.log("==========用户名===========");
			console.log(value)
			if(!isvalidUsername(value)){
				callback(new Error("用户名首位必须是字母"))
			}
			else{
				callback()
			}
		}
		const validatePassword = (rule, value, callback)=>{
			if(value === ""){
				callback(new Error("密码不能为空"));
			}
			else{
				callback()
			}
		
		}
		
		return{
			theTitle:"用户登录",
			labelPosition: 'left',
			loginFormData:{
			  username: '',
			  password: '',			  
			},
			loginRules:{
				username:[
					{required:true, trigger:"blur", validator:validateUsername }
				],
				password:[
					{required:true, trigger:"blur", validator:validatePassword }
				]
			}						
		}
	},
	methods:{
		handleLogin(formName){
			 this.$refs[formName].validate((valid) =>{
			  if (valid) {
				this.$store.dispatch('LoginByUsername',this.loginFormData).then(()=>{
					
					this.$router.push({path:'/'})
				})
			  } 
			  else {
				console.log('登录错误');
				return false;
			  }
			})
		}
	}
}
</script>

<style lang="less">
	.login{
		width:380px;
		margin:0 auto;
	}
</style>