<template>
	<div>
		<el-header style="text-align: right; font-size: 12px">
			<el-row>
				<el-col :span="18" style="padding-left:250px">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="1">处理中心</el-menu-item>
					  <el-submenu index="2">
						<template slot="title">我的工作台</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
					  </el-submenu>
					  <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="6">
					<el-col class="logo">
						<img src="../assets/logo.png">
					</el-col>
				</el-col>
			</el-row>
		</el-header>
	</div>
</template>
<style lang="less">
	.logo{
		width:50px;
		height:50px;
		border-radius:50%;
		border:1px solid #ccc;
		padding:5px;
		img{
			max-width:100%;
			
		}
	}
</style>
<script>
	export default{
		name:'navHeader',
		data(){
			return{
				activeIndex: '1',
				activeIndex2: '1'			
			}
		},
		methods:{
			handleSelect(key, keyPath) {
			console.log(key, keyPath);
      }
		}
	}

</script>