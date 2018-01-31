import Cookies from 'js-cookie'

const app = {
	state:{
		sidebar:{
			opened: !+Cookies.get('sidebarStatus')				
		},
		language: Cookies.get('language') || 'en'		
	},	
	mutations:{
		TOGGLE_SIDEBAR: state => {
			if(state.sidebar.opened){
				Cookies.set('sidebarStatus', 1)				
			}
			else{
				Cookies.set('sidebarStatus', 0)			
			}
			state.sidebar.opened = !state.sidebar.opened
		},
		
		SET_LANGUAGE:(state, language) =>{
			state.language = language
			Cookies.set('language', language)
		}		
	},
	actions:{
		//切换汉堡包
		toggleSideBar({ commit }){
			commit('TOGGLE_SIDEBAR')				
		},
		//切换语言
		setLanguage({ commit }, language){
			commit('SET_LANGUAGE', language)			
		}
	}	
}

export default app