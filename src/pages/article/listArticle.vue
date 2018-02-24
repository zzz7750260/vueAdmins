<template>
	<div>
		<div>
			<h3>这个是文章列表</h3>
			<hr>
		</div>
		
		<div>
			<el-radio-group v-model="changeStatus">
				<el-radio-button >
					{{$t('table.all')}}
				</el-radio-button>
				<el-radio-button label="published">
					{{$t('table.published')}}
				</el-radio-button>
				<el-radio-button label="draft">
					{{$t('table.draft')}}
				</el-radio-button>
			</el-radio-group>
		</div>
		<div>
			<el-table
				ref="listTable"
				:data = "theArticleList"
				tooltip-effect = "dark"
				style = "width:100%"
				@selection-change = "handleSelectionChange">
				
				<el-table-column
					type="selection"
					width="55"
				>						
				</el-table-column>
				
				<el-table-column
					v-bind:label="$t('table.id')"
					width="180"
					prop="articleID"
					>				
				</el-table-column>				
								
				<el-table-column
					v-bind:label="$t('table.title')"
					width="360"
					prop="articleTitle"
					>				
				</el-table-column>
				
				<el-table-column
					v-bind:label="$t('table.author')"
					width="120"
					prop="articleAuthor"
				>				
				</el-table-column>
				
				<el-table-column
					v-bind:label="$t('table.time')"
					width="120"
					prop="articleTime"
				>
				</el-table-column>
				
				<el-table-column
					v-bind:label="$t('table.status')"
					prop="articleStatus"
					width="120"
				>								
				</el-table-column>

				<el-table-column
					prop="articleCheck"
					v-bind:label="$t('table.review')"
					width="120"
				>				
				</el-table-column>
				
				<el-table-column
					v-bind:label="$t('table.actions')"
					width="180"
				>	
					<template slot-scope="scope">
						{{scope.row.articleID}}
						<el-button type="primary" size="mini" @click="editArticle(scope.row.articleID)">
							{{$t('table.edit')}}
						</el-button>
						<el-button type="danger" size="mini">
							{{$t('table.delete')}}
						</el-button>
					</template>
				</el-table-column>								
			</el-table>
		</div>
		<div>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="thePageSize"
				:page-sizes="thePageSizes"
				layout="total, sizes, prev, pager, next, jumper"
				:total="theTotal"
			>
			</el-pagination>
		</div>
	</div>	
</template>

<script>
	import {listArticle} from '../../api/article.js'
	export default{
		data(){
			return{
				changeStatus:'',
				thisStatus:'',
				theListArticle:[],
				currentPage:1,
				thePageSize:10,
				thePageSizes:[10,20,30,40],
				theTotal:50
			}
		},
		
		computed:{
			//因为在element的table中，文章是否审核的值为Booleans,不能进行正常显示，所以需要重新计算成新的数组
			theArticleList(){
				this.theListArticle.map(function(item){
					if(item.articleCheck === true){
						item.articleCheck = "已审核";
					}
					if(item.articleCheck === false){
						item.articleCheck = "未审核";					
					}			
				})
				return this.theListArticle
			}
		},
		
		watch:{
			changeStatus(val){
				console.log("切换状态：" + val);
				this.thisStatus = val;
				var params = {
					page:1,
					pageSize:10,
					articleStatus:val,
				}
				listArticle(params).then((response)=>{
					console.log("==============切换选择状态下返回的结果===============")
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result.theResult;
					this.theTotal = res.result.total;
				})
			}
		},
		
		mounted:function(){
			this.getListArtcle()	
		},
		methods:{
			
			getListArtcle(){
				var params = {
					page:1,
					pageSize:10,					
				}
				listArticle(params).then((response)=>{
					console.log("=============输出返回文章结果===============");
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result.theResult;
					this.theTotal = res.result.total;
				})
			},
			
			handleSelectionChange(){
				
			},
			handleSizeChange(val){
				console.log(`当前条数:${val}`)
				console.log(`获取thisStatus的状态:${this.thisStatus}`)
				this.thePageSize = val
				var params = {
					page:1,
					pageSize:val,
					articleStatus:this.thisStatus,
				}
				listArticle(params).then((response)=>{
					console.log("==============切换选择条数的状态下返回的结果===============")
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result.theResult;
					this.theTotal = res.result.total;
				})
				
			},
			handleCurrentChange(val){
				console.log(`当前页面:${val}`);
				var params = {
					page:val,
					pageSize:this.thePageSize,
					articleStatus:this.thisStatus,
				}
				listArticle(params).then((response)=>{
					console.log("==============切换选择条数的状态下返回的结果===============")
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result.theResult;
					this.theTotal = res.result.total;
				})				
			},
			editArticle(articleID){
				console.log("==============该文章的id=============");
				console.log(articleID)
				//跳转对应的文章详情页面
				this.$router.push({path:'./editarticle',query:{articleID:articleID}});
			}
			
		}
	}
</script>
