<template>
	<div class="createPost-container">
		<el-form class="form-container" v-bind:model="postForm" v-bind:rules="rules" ref="postForm">
			<template v-if="fetchSuccess">
				<router-link style="margin-right:15px;" v-show="isEdit" v-bind:to="{path:'create-from'}">
					<el-button type="info">创建form</el-button>
				</router-link>
				
				<el-dropdown trigger="click">
					<el-button plain>
						{{!postForm.commit_disabled?'评论已打开':'评论已关闭'}}
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</el-button>
					<el-dropdown-menu class="no-padding" slot="dropdown">
						<el-dropdown-item>
							<el-radio-group v-model="postForm.commit_disabled">
								<el-radio v-bind:label="true">关闭评论</el-radio>
								<el-radio v-bind:label="false">打开评论</el-radio>								
							</el-radio-group>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				
				<el-dropdown trigger="click">
					<el-button plain>平台
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</el-button>
					<el-dropdown-menu>
						<el-checkbox-group v-model="postForm.platforms" style="padding:5px 15px;">
							<el-checkbox v-for:"item in platformsOptions" v-bind:label="item.key" v-bind:key="item.key">
								{{item.name}}
							</el-checkbox>
						</el-checkbox-group>
					</el-dropdown-menu>
				</el-dropdown>
				
				<el-dropdown trigger="click">
					<el-button plain>外链
						<i class="el-icon-caret-bottom el-icon--right"></i>	
					</el-button>				
					<el-dropdown-menu class="no-padding no-border" style="width:300px" slot="dropdown">
						<el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_url">
							<el-input placeholder="请输入url地址" v-model="postForm.source_url">
								<template slot="prepend">填写url</template>
							</el-input>
						</el-form-item>
					</el-dropdown-menu>
				</el-dropdown>
				
				<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()>
					发布
				</el-button>
				
				<el-button v-loading="loading" type="warning" @click="draftForm">
					草稿
				</el-button>	
			</template>
			
			<template v-else>
				<el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
			</template>
		</el-form>
	</div>
</template>

<script>
	const defaultForm = {
		status:'draft',
		title:'',
		content:'',
		content_short:'',
		source_url:'',
		image_url:'',
		source_name:'',
		display_time:'',
		id:'',
		platforms:['a-platform'],
		commit_disabled:false
	}
	
	export default{
		name:'articleDetail',
		props:{
			isEdit:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				fetchSuccess:true
			}
		}
	}
</script>