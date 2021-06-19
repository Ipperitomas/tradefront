import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
export const BASE_URL_API = 'http://127.0.0.1:8000/';
Vue.prototype.$base_url = BASE_URL_API;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
