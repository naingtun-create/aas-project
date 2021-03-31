<template>
    <div id="profilepage">
        <shopper-header></shopper-header>
        <h1>My Account</h1>

        <div class="row">
          
          <div id="column1">
            <h2>View</h2>
            <ul>
              <li>
                <v-btn><router-link to="/companylogin" exact>Purchase History</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>Cart</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>My Likes</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>My Vouchers</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>Funded Kickstarters</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>Payment Details</router-link></v-btn>
              </li>
              <li>
                <v-btn><router-link to="/shopperlogin" exact>Account Settings</router-link></v-btn>
              </li>                                                                      
            </ul>
            <v-btn class="ma-2" color="grey lighten-2" v-on:click="logout" dark>
              <v-icon dark right>mdi-account-remove</v-icon>Sign out
            </v-btn>            
          </div>
          
          <div id="column2">
            <h1>Omar Yahla</h1>

          </div>
        
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



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#profilepage {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
}
h1 {
  text-align: left;
  padding-left: 500px;
  color: rgb(8, 8, 8);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
}
h2 {
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:75px;
  color: rgb(8, 31, 37);
}
h3 {
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:175px;
  color: rgb(16, 240, 210);
}
h4 {
  font-size: 20px;
  font-family: Nunito;
  font-weight: normal;
}
#column1 {
  float: left;
  width: 30%;
}
#column2 {
  float: left;
  width: 70%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
ul {
  margin-top: 100px;
  padding: 0;
}
li {
  margin-top:25px;
}
</style>
