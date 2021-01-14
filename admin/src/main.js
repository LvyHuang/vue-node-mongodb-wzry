import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
