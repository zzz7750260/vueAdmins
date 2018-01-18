import axios from 'axios'
import store from '../store'
import {getToken} from './auth'

//创建路由实例
const service = axios.create({
	baseURL:process.env.BASE_API,
	timeout:5000
})

//创建路由拦截器,为每个请求都付token
service.interceptors.request.use(config => {
	if(store.getters.token){
		config.header['X-Token'] = getToken();//给每个请求添加token		
	}
	return config
	},
	error =>{
		console.log(error)
		Promise.reject(error)
	}
) 

//数据接收拦截
service.interceptors.response.use(
	response => response,
	error => {
		console.log('err'+error)
		return Promise.reject(error)
	}
)

export default service