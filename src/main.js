import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/store' 
import firebase from  'firebase';
import ShopperHeader from './components/shopper/ShopperHeader.vue'
import companyHeader from './components/company/CompanyHeader.vue'
import VueGoogleMaps from 'vue-googlemaps'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueResource from 'vue-resource'
import VueGeolocation from 'vue-browser-geolocation'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueGeolocation)
Vue.component('shopper-header',ShopperHeader)
Vue.component('company-header',companyHeader)
Vue.use(VueGoogleMaps, {
  load: {
      // put your google API key either in the ./config/local.env.js file or just hardcode in the string below
      apiKey: 'AIzaSyDCH_j7Xz32HgtT5iTwS1TyqwDFCezYjsc',
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
  if (requiresAuth && !currentUser) next('/');
  else
  next();
});

let app = '';

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