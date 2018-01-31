import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elmentEnLocale from 'element-ui/lib/locale/lang/en'
import elmentZhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
	zh:{
		...zhLocale,
		...elmentZhLocale
	},

	en:{
		...enLocale,
		...elmentEnLocale		
	}
}

const i18n = new VueI18n({
	locale: Cookies.get('language') || 'zh',
	messages	
})

export default i18n