<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="!item.hidden&&item.children">
			<router-link v-if="item.children.length ===1 && !item.children[0].children && !item.alwayShow" :to="item.path+'/'+item.children[0].path" v-bind:key="item.children[0].name">
				<el-menu-item v-bind:index = "item.path + '/' + item.children[0].path" v-bind:class="{'submenu-title-noDropdown':!isNest}"> 
					<i v-if="item.children[0].meta&&item.children[0].meta.icon" v-bind:class="item.children[0].meta.icon"></i>
					<span v-if="item.children[0].meta && item.children[0].meta.title">{{item.children[0].meta.title}}</span>
				</el-menu-item>
			</router-link>
			<el-submenu v-else v-bind:index="item.path||item.name" v-bind:key="item.name">
				<template slot="title">
					<i v-if="item.meta && item.meta.icon" v-bind:class="item.meta.icon"></i>
					<span v-if="item.meta.title && item.meta">item.meta.title</span>
				</template>
				
				<template v-for="child in item.children" v-if="!child.hidden">
					<sidebar-item></sidebar-item>
					<router-link>
						<el-menu-item v-bind:index="item.path+'/'+child.path" v-bind:key="child.name">
							<i v-bind:class="child.meta.icon" v-if="child.meta&&child.meta.icon"></i>
							<span v-if="child.meta && child.meta.title">child.meta.title</span>
						</el-menu-item>
					</router-link>				
				</template>
			</el-submenu>
		</template>
	</div>	
</template>

<script>
export default{
	name:'SidebarItem',
	props:{
		routes:{
			type:Array
		},
		isNest:{
			type:Boolean,
			default:false
		}
	}
}
</script>