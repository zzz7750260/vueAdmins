<template>
	<el-menu class="navbar" mode="horizontal">
		<!--汉堡包	-->	
		<hamburger class="hamburger-container" v-bind:toggleClick="toggleSideBar" v-bind:isActive="sidebar.opened"></hamburger>	
		
		<!--面包屑
		<breadcrumb class="breadcrumb-container"></breadcrumb>
		-->
		<!--导航右侧-->
		<div class="right-menu">
			<!--错误提示
			<error-log class="errLog-container right-menu-item"> </error-log>-->
			
			<!--全屏
			 <el-tooltip effect="dark" content="全屏" placement="bottom">
				<screenfull class="screenfull right-menu-item"></screenfull>
			 </el-tooltip>
			-->
			
			 <!--语音选择-->
			<lang-select class="international right-menu-item"></lang-select>		
			
			
			<!--主题选择-->
			<el-tooltip effect="dark" v-bind:content="$t('navbar.theme')" placement="bottom">
				<theme-picker class="theme-switch right-menu-item"></theme-picker>
			</el-tooltip>
			
			
			<!--下拉-->
			<el-dropdown class="avatar-container right-menu-item" trigger="click">
				<div class="avatar-wrapper">
				  <img class="user-avatar" src="../../../assets/tx.gif">
				  <i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/">
						<el-dropdown-item>
							{{$t('navbar.dashboard')}}
						</el-dropdown-item>
					</router-link>
						<el-dropdown-item divided>
							<span style="display:block" v-on:click="logout">{{$t('navbar.logOut')}}</span>
						</el-dropdown-item>
					
				</el-dropdown-menu>				
			</el-dropdown>
		</div>
	</el-menu>	
</template>
<script>
	import {mapGetters} from 'vuex'
	import Hamburger from '../../../components/Hamburger'
	import LangSelect from '../../../components/LangSelect'
	import ThemePicker from '../../../components/ThemePicker'
	export default{
		components:{
			Hamburger,
			LangSelect,
			ThemePicker
		},
		computed:{
			...mapGetters([
				'sidebar',
				'token'
			])
		},
		methods:{
			toggleSideBar(){
				this.$store.dispatch('toggleSideBar')
			},
			logout(){
				console.log("这个是获取的token："+this.token)
				this.$store.dispatch('logOut',this.token).then(()=>{
					location.reload()
				})
			}
		}
	}

</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
