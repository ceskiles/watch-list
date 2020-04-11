import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './assets/mock-data.js'

Vue.config.productionTip = false

let data = {
  movies: mock,
  watchlist: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
