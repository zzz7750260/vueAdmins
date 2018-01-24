import router from './router' 
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'  //引入NProgress
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth' 

NProgress.configure({ showSpinner:false })

function hasPermission(roles, permissionRoles){
	if(roles.indexOf('admin')>=0) return true
	if(!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role)>=0)
}

const whiteList = ['/login','/registe','/404'];   //添加白名单  

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
					//console.log("============根据token获取用户信息============");
					//console.log(response);
					const res = response.data.result;
					const roles = res.userRole
					console.log("store.getters.roles:"+store.getters.roles)
					console.log("roles的类型"+ typeof(roles))//返回的是对象类型
					console.log("目前权限为:"+roles)
					//对象转数组
					var theRoles = [];
				//	for(var a in roles){
				//		theRoles.push(roles[a])						
				//	}
				//	console.log("数组:"+ theRoles);
				//	console.log("roles的类型"+ typeof(theRoles))
					store.dispatch('GenerateRoutes',{roles}).then(()=>{//这里的roles必须是数组
						router.addRoutes(store.getters.addRouters)
						next({...to, repalace:true})
					})						
				})/*.catch(()=>{
					store.dispatch('FedLogOut').then(()=>{
						Message.error('信息错误，请再次登录')
						next({path:'/login'})
					})					
				})*/			
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