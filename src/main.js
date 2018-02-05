import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/*引入主样式*/
import './styles/index.less'

/*使用设置的路由权限*/
import './permission'

/*axios使用*/
import axios from 'axios'
Vue.prototype.$http = axios

/*vuex使用*/
import store from './store/'

/*使用国际i18n*/
import i18n from './lang'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
