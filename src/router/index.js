import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../pages/home/'
import Login from '../pages/login'
import Registe from '../pages/registe'

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
	}
  ]
})
