import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

//加载页面布局
import Layout from '../pages/Layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/

//公用页面或者使用页面加载
export const constantRouterMap = [
	{path:'/login', component:_import('login/index'), hidden:true},
	{path:'/registe', component:_import('registe/index'), hidden:true},
	{path:'/404', component:_import('errorPage/404'), hidden:true},
	{path:'/401', component:_import('errorPage/401'), hidden:true},
	{
		path:'',
		component:Layout,
		redirect:'dashboard',
		children:[{
			path:'dashboard',
			component: _import('dashboard/index'),
			name:'dashboard',
			meta:{title:'dashboard', icon:'dashboard',noCache:true}			
		}]
	}
	
]

export default new Router({
	routes:constantRouterMap
})

//需要权限判断页面加载
export const asyncRouterMap = [
	{
		path:'/premission', 
		component:Layout,
		redirect:'/permission/index',
		meta:{roles:['admin']},
		children:[{
			path:'index',
			component:_import('permission/index'),
			name:'permission',
			meta:{
				title: 'permission',
				icon: 'lock',
				roles: ['admin']
			}
		}]		
	},	
	{
		path:'/icon',
		component:Layout,
		children:[{
			path:'index',
			component:_import('svg-icons/index'),
			name:'icons',
			meta:{
				title:'icons',
				icon:'icon',
				noCache:true				
			}		
		}]
		
	}
			

]