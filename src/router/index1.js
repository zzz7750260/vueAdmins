import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../pages/home/'
import Login from '../pages/login'
import RegisteLoad from '../pages/registeLoad'
import Registe from '../pages/registe'
import AdminHome from '../pages/adminHome'

const _import = require('./_import_' + process.env.NODE_ENV)


//这个是测试
import Cs from '../pages/cs/registe_cs'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/home',
		name: 'home',
		component: Home
    },
	{
		path: '/login',
		name: 'login',
		component: Login,		
	},
	{
		path: '/registe',
		name: 'registe',
		component: Registe,
	},
	{
		path: '/registeload',
		name: 'registeload',
		component: RegisteLoad,
	},
	{
		path: '/adminhome',
		name: 'adminhome',
		component: AdminHome,
	},
	{
		path: '/cs',
		name: 'cs',
		component:Cs,
	}
  ]
})
