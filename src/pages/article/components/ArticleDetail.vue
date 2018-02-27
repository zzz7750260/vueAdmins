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
					<el-dropdown-menu class="no-border" slot="dropdown">
						<el-checkbox-group v-model="postForm.platforms" style="padding:5px 15px;">
							<el-checkbox v-for="item in platformsOptions" v-bind:label="item.key" v-bind:key="item.key">
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
				

				<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
				</el-button>
				
				<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>	
				</template>
			
			<template v-else>
				<el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
			</template>
			
			<div class="createPost-main-container">
				<el-row>
					<el-col :span="21">
						<el-form-item style="margin-bottom:40px" prop="title">
							<MDinput name="name" v-model="postForm.title" required v-bind:maxlength="100">
								标题							
							</MDinput>
							<span v-show="postForm.title.length >= 26" class="title-prompt">app可能显示不全</span>
						</el-form-item>
						
						<div class="postInfo-container">
							<el-row>
								<el-col :span="8">
									<el-form-item label-width="45px" label="作者" class="postInfo-cantainer-item">
										<el-input placeholder="文章作者,不填默认为登录用户名" v-model="postForm.author" style="min-width:150px"></el-input>
									</el-form-item>
								</el-col>
								
								<el-col :span="8">
									<el-tooltip clas="item" effect="dark" content="文章来源" placement="top">
										<el-form-item label-width="50px" label="来源" class="postInfo-container-item">
											<el-input placeholder="输入文章来源" style="min-width:150px;" v-model="postForm.source_name">
											</el-input>
										</el-form-item>
									</el-tooltip>								
								</el-col>
								
								<el-col :span="8">
									<el-form-item label-width="80px" label="发布时间" class="postInfo-cantainer-item">
										<el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
									</el-form-item>
								</el-col>
							</el-row>					
						</div>
					</el-col>				
				</el-row>
				
				<el-form-item style="margin-bottom:40px" label-width="45px" label="摘要">
					<el-input type="textarea" class="article-textarea" :rows="1" placeholder="请输入摘要内容" v-model=" postForm.content_short"></el-input>
					<span class="word-counter" v-show="contentShortLength"> {{contentShortLength}} 字</span>
				</el-form-item>
				
				<div class="editor-container">
					<tinymce v-bind:height=400 ref="editor" v-model="postForm.content"></tinymce>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
	import Tinymce from '../../../components/Tinymce'
	import MDinput from '@/components/MDinput'
	import {addArticle} from '../../../api/article'
	import {isvalidateURL} from '../../../utils/validate'
	import {getArticleDetail} from '../../../api/article.js'
	const defaultForm = {
		status:'draft',
		author:'',
		title:'',
		content:'',
		content_short:'',
		source_url:'',
		image_url:'',
		source_name:'',
		display_time:undefined,//显示时间
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
			const validateRequire = (rule, value, callback)=>{
				if(value ===''){
					this.$message({
						message:rule.field + '为必传项',
						type:'error'
					})
					callback(null)
				}
				else{
					callback()
				}
			}
			const validateSourceUrl = (rule, value, callback)=>{
				console.log("获取url的值：" + value);
				
				if(value){
					if(isvalidateURL(value)){
						callback()	
					}
					else{
						this.$message({
							message:'外链url填写不正确',
							type:'error'
						})
						callback(null)
					}
				}
				else{
					callback()
				}
			}
			return{
				postForm:Object.assign({},defaultForm),
				fetchSuccess:true,
				loading:false,
				userLIstOptions:[],
				platformsOptions:[
					{ key: 'a-platform', name: 'a-platform' },
					{ key: 'b-platform', name: 'b-platform' },
					{ key: 'c-platform', name: 'c-platform' }					
				],
				rules:{
					image_url:[{validator: validateRequire}],
					title:[{validator: validateRequire}],
					content:[{validator: validateRequire}],
					source_url:[{validator: validateSourceUrl, trigger: 'blur' }],
				}				
			}
		},
		computed:{
			contentShortLength(){
				return this.postForm.content_short.length;
			},
			articleEdierName(){
				return this.$store.getters.name
			}
		},
		
		created(){
			if(this.isEdit){
				this.theArticleDetail()
			}
			else{
				this.postForm = Object.assign({},defaultForm)
			}		
		},
		
		methods:{
			submitForm(){
				//this.postForm.display_time = parseInt(this.display_time /1000)
				console.log(this.postForm);
				if(this.postForm.author == ""){
					this.postForm.author = this.articleEdierName;
				}
				console.log("作者显示:"+this.postForm.author)
				
				this.$refs.postForm.validate(valid => {
					if(valid){
						this.loading = true
						this.postForm.status = 'published'
						addArticle(this.postForm).then((response)=>{
							console.log(response);
							let res = response.data;
							if(res.status == "2"){
								this.$notify({
									title: '成功',
									message: '文章发布成功',
									type:'success',
									duration: 2000
								})
							}
							this.loading = false;
						})
						
					}
				})
			},
			draftForm(){
				if(this.postForm.content.length === 0 || this.postForm.title.length === 0){
					this.$message({
						message:'文章标题或者内容不能为空',
						type:'warning'
					})
					return
				}
				else{
					this.loading = true
					this.postForm.status = 'draft'
					addArticle(this.postForm).then((response)=>{
						console.log(response);
						let res = response.data;
						if(res.status == "2"){
							this.$notify({
								title: '成功',
								message: '文章草稿成功',
								type:'success',
								duration: 2000
							})
						}
						this.loading = false;
					})
				}
			},
			
			theArticleDetail(){
				console.log("============vue中获取链接参数===========");
				let paramsId = this.$route.query.articleID
				console.log(paramsId)
				getArticleDetail(paramsId).then((response)=>{
					console.log("============文章详情页组件中获取到的返回文章结果======")
					console.log(response)
					let res = response.data
					var theParams = {
						status:res.result.articleStatus,
						author:res.result.articleAuthor,
						title:res.result.articleTitle,
						content:res.result.articleContent,
						content_short:res.result.articleShortContent,
						source_url:res.result.articleSource,
						image_url:res.result.articleImg,
						source_name:res.result.articleSourceName,
						display_time:res.result.articleTime,//显示时间
						id:res.result.articleID,
						platforms:['a-platform'],
						commit_disabled:res.result.articleCheck						
					}
					this.postForm = theParams
				})
			}
		},
		components:{
			MDinput,
			Tinymce
		}
	}
</script>