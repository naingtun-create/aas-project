<template>
    <div id="navbar">
      <img src="https://pics.freeicons.io/uploads/icons/png/18453753581581665319-512.png" class="logo">
      <ul class="logo"> All About Sustainability</ul>
      <div class="links">
          <v-btn class="ma-2" v-on:click="$router.push({ path:'/company/physicalstore'})" dark>
            Nearby
            <v-icon dark right>mdi-store</v-icon>
          </v-btn>

          <v-btn class="ma-2" v-on:click="$router.push({ path:'/company/onlinemarketplace'})" dark>
            Marketplace
            <v-icon dark right>mdi-storefront</v-icon> 
          </v-btn>

          <v-btn class="ma-2" v-on:click="$router.push({ path:'/company/forum'})"  dark>
            Activitie
            <v-icon dark right>mdi-lifebuoy</v-icon>
          </v-btn>

          <v-btn class="ma-2" v-on:click="$router.push({ path:'/company/companypage'})" dark>
            Profile
            <v-icon dark right>mdi-account</v-icon>
          </v-btn>

          <v-btn class="ma-2" color="red" v-on:click="logout()" dark>Sign Out
          <v-icon dark right>mdi-account-remove</v-icon>
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
        this.$router.replace({path: "/"})
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
  height:80px;
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