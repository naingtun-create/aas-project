import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/store' 
import firebase from  'firebase';


Vue.use(VueRouter)
Vue.config.productionTip = false

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