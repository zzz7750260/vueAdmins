import router from './router' 
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'  //引入NProgress
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth' 

NProgress.coufigure({ showSpinner:false })

function hasPermission(roles, permissionRoles){
	if(roles.indexOf('admin')>=0) return true
	if(!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role)>=0)
}

const whiteList = [];   //添加白名单  

router.beforeEach((to, from, next)=>{ 
	NProgress.start()
	if(getToken()){
		/*添加token*/
		if(to.path === '/login'){
			next({path:'/'})
			NProgress.done()
		}
		else{
			if(store.getters.roles.length === 0){
				store.dispatch('GetUserInfo').then(response =>{
					const res = response.data;
					const roles = res.roles
					store.dispatch('GenerateRoutes',{roles}).then(()=>{
						router.addRoutes(store.getters.addRouters)
						next({...to, repalace:true})
					})						
				}).catch(()=>{
					store.dispatch('FedLogOut').then(()=>{
						Message.error('信息错误，请再次登录')
						next({path:'/login'})
					})					
				})			
			}
			else{
				//判断权限的变化
				if(hasPermission(store.getters.roles, to.meta.roles)){
					next()
				}
				else{
					next({path:'/401', replace:true, query:{ noGoBack:true}})					
				}
			}			
		}
	}
	else{
		//白名单
		if(whiteList.indexOf(to.path) !== -1){
			next()
		}
		else{
			next('/login')
			NProgress.done()
		}		
	}
})

router.afterEach(()=>{
	NProgress.done()	
})