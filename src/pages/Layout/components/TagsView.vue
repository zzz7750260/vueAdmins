<template>
	<div class="tags-view-container">
		<router-link ref="tag" class="tags-view-item" v-bind:class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" v-bind:to="tag.path" v-bind:key="tag.path" v-on:contextmenu.prevent.native="openMenu(tag,$event)">
			{{tag.title}}
			<span class="el-icon-close" v-on:click.prevent.stop='closeSelectedTag(tag)'></span>
		</router-link>
		<ul class="contextmenu">
			<li v-on:click="closeSelectedTag(selectedTag)">colse</li>
			<li @click="closeOthersTags">Close Others</li>
			<li v-on:click="closeAllTags">Close All</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				visible:false,
				top:0,
				left:0,
				selectedTag:{}
			}
		},
		computed:{
			visitedViews(){
				return this.$store.state.tagsView.visitedViews
			}
		},
		watch:{
			$route(){
				this.addViewTags()
				this.moveToCurrentTag()
			},
			visible(value){
				if(value){
					window.addEventListener('click',this.closeMenu)
				}
				else{
					window.removeEvenListener('click',this.closeMenu)
				}
			}
		},		
		mounted(){
			this.addViewTags()
		},
		methods:{
			generateRoute(){
				if(this.$route.name){
					return this.$route
				}
				return false
			},
			isActive(route){
				return route.path === this.$route.path || route.name === this.$route.name
			},
			addViewTags(){
			  const route = this.generateRoute()
			  if(!route) {
				return false
			  }
			  this.$store.dispatch('addVisitedViews', route)
			},
			moveToCurrentTag(){
				const tags = this.$refs.tag
			},
			closeSelectedTag(view){
				this.$store.dispatch('delVisitedViews',view).then((views)=>{
					if(this.isActive(view)){
						const latestView = views.slice(-1)[0]
						if(latestView){
							this.$router.push(latestView.path)
						}
						else{
							this.$router.push('/')
						}
					}
				})
			},
			closeOthersTags(){
				this.$router.push(this.selectedTag.path)
				this.$store.dispatch('delOthersViews',this.selectedTag).then(()=>{
					this.moveToCurrentTag()
				})
			},
			closeAllTags(){
				this.$store.dispatch('delAllViews')
				this.$router.push('/')
			},
			openMenu(tag,e){
				this.visible = ture
				this.selectedTag = tag
				this.left = e.clientX
				this.top = e.clientY
			},
			closeMenu(){
				this.visible = false
			}			
		},
	}


</script>