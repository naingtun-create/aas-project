<template>
    <div id="navbar">
      <img src="https://pics.freeicons.io/uploads/icons/png/18453753581581665319-512.png" class="logo">
      <ul class="logo"> All About Sustainability</ul>
      <div class="links">
          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-store</v-icon>
          <ul><router-link to="/shopper/physicalstore" exact>Physical Store</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-storefront</v-icon>
          <ul><router-link to="/shopper/onlinemarketplace" exact>Online Marketplace</router-link></ul>   
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-lifebuoy</v-icon>
          <ul><router-link to="/shopper/incubator" exact>Incubator</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-account</v-icon>
          <ul><router-link to="/shopper/profile" exact>Profile</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="blue-grey lighten-2" dark>
          <v-icon dark right>mdi-cart</v-icon>
          <ul><router-link to="/shopper/payment" exact>View Cart</router-link></ul>
          </v-btn>

          <v-btn class="ma-2" color="grey lighten-2" v-on:click="logout" dark>
          <v-icon dark right>mdi-account-remove</v-icon>Sign out
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