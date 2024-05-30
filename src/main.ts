import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/main.css'

import kebabCase from 'lodash/kebabCase'

Vue.config.productionTip = false
Vue.prototype.$kebabCase = kebabCase

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
