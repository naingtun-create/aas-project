import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/store' 
import firebase from  'firebase';
import shopperHeader from './components/shopper/shopperHeader.vue'
import companyHeader from './components/company/companyHeader.vue'
import VueGoogleMaps from 'vue-googlemaps'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.component('shopper-header',shopperHeader)
Vue.component('company-header',companyHeader)
Vue.use(VueGoogleMaps, {
  load: {
      // put your google API key either in the ./config/local.env.js file or just hardcode in the string below
      apiKey: process.env.GOOGLE_API_KEY || '',
      libraries: ['places'],
      useBetaRenderer: false
  }
})

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

myRouter.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else
  next();
});

let app = '';

/*new Vue({
  render: h => h(App),
  router: myRouter,
  store,
  vuetify
}).$mount('#app')*/

firebase.auth().onAuthStateChanged(user => {
  
  console.log(user)
  
  if(!app){
    app = new Vue({
      router: myRouter,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
});