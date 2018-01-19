<template>
	<div>
		<h3>用户注册</h3>
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
				<el-input v-model.number = "refusteFormData.QQNum" placeholder="输入你的QQ号码"></el-input>
			  </el-form-item>
			  
			  <!--v-model.number的值必须和prop的值相同-->
			  
			  <el-form-item label="电话号码" prop="TelNum">
				<el-input v-model.number="refusteFormData.TelNum" placeholder="输入电话号码"></el-input>
			  </el-form-item>
			  <el-form-item label="电子邮箱" prop="email">
				<el-input v-model="refusteFormData.email" placeholder="输入电子邮箱"></el-input>
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
import {isvalidUsername,isvalidEmail,isvalidTel,isTheNum} from '../../utils/validate'

export default{
	name:'registe',
	data(){
		var validateUsername =(rule, value, callback)=> {
			if(!isvalidUsername(value)){
				console.log(isvalidUsername(value))
				callback(new Error('用户名必须以字母开头'))
			}
			else{
				/*
					var isCheck = this.userNameCheck(value)
					console.log("是否存在"+isCheck);
					console.log(isCheck);
					if(isCheck){
						callback()
					}
					else{
						callback(new Error("该用户名已经存在"))
					}
				*/
				
				
				var isVals;
				axios.get("./admin/findUserName",{
					params:{
						userName:value
					}
				}).then((response)=>{
					console.log(response);
					var res = response.data;
					if(res.status == "2"){
						isVals = true;
						callback()
					}
					else{
						isVals = false;
						callback(new Error("该用户名已经存在"))
					}
				})
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
		
		var validateQQ = (rule, value, callback)=>{
			console.log("qq号码返回"+value)
			if(!isTheNum(value)){
				callback(new Error('QQ号码必须为数字'))
			}
			else if(!Number.isInteger(value)){
				callback(new Error("QQ号码必须为整数"));			
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
				
		return{
			theTitle:"用户注册",
			refusteFormData:{
				name: '',	
				pass: '',
				checkPass: '',
				QQNum: '',
				TelNum: '',
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
				QQNum:[			
					{trigger:'blur', validator:validateQQ,required:true},	
				
				],	
				TelNum:[	
					{trigger:'blur', validator:validateTel,required:true},				
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
			this.$refs[formName].validate((valid) => {
				if(valid){
					var params={
						userName:this.refusteFormData.name,
						userPass:this.refusteFormData.checkPass,
						userQQ:this.refusteFormData.QQNum,
						userTel:this.refusteFormData.TelNum,
						userEmail:this.refusteFormData.email,
						/*userJoinTime:0,*/
						userRole:['user'],
						userAge:this.refusteFormData.age,
					}
					axios.post("./admin/registe",{params}).then((response)=>{
						console.log(response);
						var res = response.data;
						if(res.status == 0){
							alert("注册成功");
						}
					})
				}
				else{
					alert('注册失败');
					return false;	
				}				
			})
		 },
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		
		//检测用户名是否存在,但是占时
		userNameCheck(val){
			var isVal,isTrue;
			let _this = this;
			var startCheck = function(){
				return new Promise(function(resolve, reject){
					resolve(					
						axios.get("./admin/findUserName",{
							params:{
								userName:val
							}
						}).then((response)=>{			
							console.log(response);
							var res = response.data;
							console.log("res.status:"+res.status)
							if(res.status == "1"){
								 _this.isVal = false;
							}
							else if(res.status == "2"){
								 _this.isVal = true;					
							}
							console.log("isVal:"+_this.isVal);	
							return _this.isVal
						})
					)					
				})
			}
			
			var checkJg = async function(){
				await startCheck();
				console.log("外isVal:" + _this.isVal);
				//return isTrue = _this.isVal;
			}
			
			checkJg();			
			//console.log("最外isTrue："+ checkJg());									
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