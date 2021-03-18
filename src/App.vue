<template>
  <div id="app">
    <HomePage msg="Testing"></HomePage>
    <ProfilePage msg="Testing Alicia"></ProfilePage>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import ProfilePage from './components/ProfilePage.vue'

export default {
  name: 'App',
  components: {
    HomePage:HomePage,
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
</style>
