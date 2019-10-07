// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'

Vue.config.productionTip = false
// 导入全局变量配置文件Common
import Common from '@/components/common/Common'
Vue.prototype.Common = Common
// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 导入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials=true
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
