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
						<el-button type="primary" size="mini">
							{{$t('table.edit')}}
						</el-button>
						<el-button type="danger" size="mini">
							{{$t('table.delete')}}
						</el-button>
					</template>
				</el-table-column>				
				
			</el-table>
		</div>
	</div>	
</template>

<script>
	import {listArticle} from '../../api/article.js'
	export default{
		data(){
			return{
				changeStatus:'',
				theListArticle:[],
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
				listArticle(val).then((response)=>{
					console.log("==============切换选择状态下返回的结果===============")
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result;
				})
			}
		},
		
		mounted:function(){
			this.getListArtcle()	
		},
		methods:{
			getListArtcle(){
				listArticle().then((response)=>{
					console.log("=============输出返回文章结果===============");
					console.log(response)
					let res = response.data;
					this.theListArticle = res.result
				})
			},
			
			handleSelectionChange(){
				
			},			
		}
	}
</script>
