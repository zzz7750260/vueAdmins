<template>
	<section class="app-main" style="min-height:100%">
		<transition name="fade" mode="out-in">
			<keep-alive v-bind:include="cachedViews">
				<router-view></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	export default{
		name:"AppMain",
		computed:{
			cachedViews(){
				this.$store.state.tagsView.cachedViews
			}
		}
	}
</script>