import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.use(VueRouter)
Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: myRouter,
  vuetify
}).$mount('#app')
