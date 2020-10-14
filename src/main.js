import Vue from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
