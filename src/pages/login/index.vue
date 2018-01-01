<template>
	<div class="login">	
		<h3>{{theTitle}}</h3>
		<div>
			<el-radio-group v-model="labelPosition" size="small">
			  <el-radio-button label="left">左对齐</el-radio-button>
			  <el-radio-button label="right">右对齐</el-radio-button>
			  <el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
			  <el-form-item label="账号：">
				<el-input v-model="formLabelAlign.name" placeholder="输入用户名"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：">
				<el-input v-model="formLabelAlign.region" placeholder="输入用户密码"></el-input>
			  </el-form-item>
			</el-form>
		</div>
		<div>
			<el-button>登录</el-button>
			<el-button>注册</el-button>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			theTitle:"用户登录",
			labelPosition: 'left',
			formLabelAlign:{
			  name: '',
			  region: '',
			  type: ''
			}
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