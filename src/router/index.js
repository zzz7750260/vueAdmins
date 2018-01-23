import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
	{path:'/login', component:_import('login/index'), hidden:true},
	{path:'/404', component:_import('errorPage/404'), hidden:true},
	{path:'/401', component:_import('errorPage/401'), hidden:true},
]

export default new Router({
	routes:constantRouterMap	
})


export const asyncRouterMap = [
	{path:'/login', component:_import('login/index'), hidden:true},		
			

]