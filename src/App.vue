<template>
  <div id="app">
    <h1 id="websitename">all about Sustainability</h1>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
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
    Header:Header,
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
header {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#websitename {
  background-color: pink;
  text-align: center;
  font-size: 40px;
}
#login {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#signup {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
