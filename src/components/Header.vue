<template>
    <div id="navbar">
      <img src="https://pics.freeicons.io/uploads/icons/png/18453753581581665319-512.png" class="logo">
      <ul class="logo"> All About Sustainability</ul>
      <div class="links">
        <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-home</v-icon>
          <ul><router-link to="/" exact>Home</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-store</v-icon>
          <ul><router-link to="/physicalstore" exact>Physical Store</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-storefront</v-icon>
          <ul><router-link to="/onlinemarketplace" exact>Online Marketplace</router-link></ul>   
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-lifebuoy</v-icon>
          <ul><router-link to="/incubator" exact>Incubator</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-login</v-icon>
          <ul><router-link to="/login" exact>Login</router-link></ul>
          </v-btn>
          
          <v-btn class="ma-2" color="grey lighten-2" dark>
          <v-icon dark right>mdi-account-plus</v-icon>
          <ul><router-link to="/signup" exact>Sign Up</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="grey lighten-2" v-on:click="logout" dark>
          <v-icon dark right>mdi-account-plus</v-icon>Sign out
          </v-btn>

      </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });      
    }
  }
};
</script>

<style>
#navbar {
  display: flex;
  padding-top: 0px;
  color:white;
  background-color:#c9AA88;
  height:100px;
  font-size:35px;
  padding-top: 0px;
  font-family: "Sanchez";
}
.logo {
  height:80px;
  padding-left: 50px;
  
}
.links{
  padding-left: 30%;
  text-align: left;
  display:inline-flex;
  font-size:20px;
}
</style>