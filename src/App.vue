<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
//import Header from './components/Header.vue'
//import HomePage from './components/HomePage.vue'
//import ProfilePage from './components/ProfilePage.vue'
//import SignUpPage from './components/SignUpPage.vue'
//import LoginPage from './components/LoginPage.vue'



export default {
  name: 'App',
  components: {
    //HomePage:HomePage,
    //ProfilePage:ProfilePage,
    //SignUpPage: SignUpPage,
    //LoginPage: LoginPage,
    //ProfilePage:ProfilePage,
    //Header:Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

</style>
