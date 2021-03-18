<template>
  <div id="app" :style="{backgroundImage:'url(https://vuejs.org/images/logo.png)'}">
    <HomePage></HomePage>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
//import ProfilePage from './components/ProfilePage.vue'
//import SignUpPage from './components/SignUpPage.vue'
//import LoginPage from './components/LoginPage.vue'


export default {
  name: 'App',
  components: {
    HomePage:HomePage,
    //ProfilePage:ProfilePage,
    //SignUpPage: SignUpPage,
    //LoginPage: LoginPage,
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
  margin-top: 60px;
}
</style>
