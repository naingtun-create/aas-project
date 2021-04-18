<template>
    <div id="navbar">
        <img src="https://pics.freeicons.io/uploads/icons/png/18453753581581665319-512.png" class="logo">
        <ul> 
            <div class="logo"> All About Sustainability</div>
                <div id="header">
                    <v-btn plain rounded color="black" class="ma-2" dark v-on:click="$router.push({ path:'/shopper/shoppercontact'})">
                        <div id='contact'>Contact Us</div>
                        <v-icon color="black" plain dark right>mdi-email</v-icon>
                    </v-btn>
                </div>
        </ul>
        <div id="links">
            <v-btn plain rounded color="white" class="ma-2" v-on:click="$router.push({ path:'/shopper/physicalstore'})" dark>
                <div id="buttoncolour">Nearby</div>
                <v-icon color="white" plain dark right>mdi-store</v-icon>
            </v-btn>

            <v-btn plain rounded color="white" class="ma-2" v-on:click="$router.push({ path:'/shopper/activities'})" dark>
                <div id="buttoncolour">Activities</div>
                <v-icon color="white" dark right>mdi-lifebuoy</v-icon>
            </v-btn>

            <v-btn plain rounded color="white" class="ma-2" v-on:click="$router.push({ path:'/shopper/onlinemarketplace'})" dark>
                <div id="buttoncolour">Marketplace</div>
                <v-icon color="white" dark right>mdi-storefront</v-icon>
            </v-btn>

            <v-btn plain rounded color="white" class="ma-2" v-on:click="$router.push({ path:'/shopper/payment'})" dark>
                <div id="buttoncolour">Cart</div>
                <v-icon color="white" dark right>mdi-cart</v-icon>
            </v-btn>

            <v-btn plain rounded color="white" class="ma-2" v-on:click="$router.push({ path:'/shopper/profile'})" dark>
                <div id="buttoncolour">Profile</div>
                <v-icon color="white" light right>mdi-account</v-icon>
            </v-btn>          

            <v-btn plain rounded class="ma-2" color="red" v-on:click="logout" dark><div id="buttoncoloursign">Sign Out</div>
                <v-icon color="#9c0707c0" dark right>mdi-account-remove</v-icon>
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  color:white;
  background-color:#079C72;
  height:80px;
  font-size:35px;
  min-width:1400px;
}
.logo {
  height:80px;
  padding-left: 50px;
  font-size:25px;
  display: block;
  font-family: Nunito;
  font-weight: bolder;
}
#links{
  float:left;
  padding-left: 10%;
  padding-top:1%;
  text-align: left;
  display:inline-flex;
  font-size:20px;
  width:40%;
  margin-left:-125px;
}
#header {
    display:flex;
    margin-top:-55px;
    margin-left:90px;
}
#contact {
    color:black;
    font-family:Nunito;
    font-weight:bold;
    font-size:14px;
}
#buttoncolour {
  font-family: Nunito;
  color:white;
  font-weight:bold;
  font-size:14px;
}
#buttoncoloursign {
    font-family:Nunito;
    color:#9c0707c0;
    font-size:14px;
    font-weight:bold;
    margin-left:-20px;
}
#shopperacc{
  color:#3d3838;
  font-size:20px;
  margin-top:-40px;
  margin-left:50px;
  font-style: italic;
  font-family:Nunito;
}
</style>
