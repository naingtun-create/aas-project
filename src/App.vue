<template>
  <div id="app">
    <h1 id="websitename">all about Sustainability</h1>
    <header>
      <ul id="login">
        <router-link to="/login" exact>Login</router-link>
      </ul>

      <ul id="signup">
        <router-link to="/signup" exact>Sign Up</router-link>
      </ul>
    </header>
    <HomePage msg="Testing"></HomePage>
    <router-view></router-view>
    <ProfilePage msg="Testing Alicia"></ProfilePage>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import ProfilePage from './components/ProfilePage.vue'
//import SignUpPage from './components/SignUpPage.vue'
//import LoginPage from './components/LoginPage.vue'


export default {
  name: 'App',
  components: {
    HomePage:HomePage,
    //ProfilePage:ProfilePage,
    //SignUpPage: SignUpPage,
    //LoginPage: LoginPage,
    ProfilePage:ProfilePage,
    
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
