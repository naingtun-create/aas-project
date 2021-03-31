<template>
    <div id="profilepage">
        <shopper-header></shopper-header>
        <h1>Welcome to your AAS Account!</h1>
        <v-icon x-large>mdi-account-circle</v-icon>
        <div class="row">
          
          <div id="column1">
            <div id="content1">
            <div id="box1">
            <h2>View</h2>
            <ul>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>
                  <router-link to="/shopper/purchasehistory" exact>Purchase History</router-link>
                  <v-icon dark right>mdi-history</v-icon>
                </v-btn>                
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>
                  <router-link to="/shopper/payment" exact>Cart</router-link>
                  <v-icon dark right>mdi-cart</v-icon>
                </v-btn>                
              </li>              
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>My Likes
                  <v-icon dark right>mdi-thumb-up</v-icon>
                </v-btn>                
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>My Vouchers
                  <v-icon dark right>mdi-ticket-percent</v-icon>
                </v-btn>                
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>Funded Kickstarters
                  <v-icon dark right>mdi-cash-refund</v-icon>
                </v-btn>                
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>Payment Details
                  <v-icon dark right>mdi-credit-card</v-icon>
                </v-btn>                
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark>Account Settings
                  <v-icon dark right>mdi-account-cog</v-icon>
                </v-btn>                
              </li>                                                      
            </ul>
            <ul>
            <li>
            <v-btn class="ma-2" color="red" v-on:click="logout" dark>Sign Out
              <v-icon dark right>mdi-account-remove</v-icon>
            </v-btn>   
            </li>   
            </ul>
            </div>
            </div>
          </div>
          
          <div id="column2">
            <h1 id="h1col2">Omar Yahla</h1>
            <div id="box2">
            <h2>My Contact Details</h2>
            <ul>
              <li>
                <div id="li2">
                <v-icon>mdi-email</v-icon>
                <h4>omar_yahla@gmail.com</h4>
                </div>
              </li>
              <li>
                <div id="li2">
                <v-icon>mdi-map-marker</v-icon>
                <h4>Blk 123 Simei Road #01-01 123456</h4>
                </div>
              </li>
            </ul>
            </div>

            <div id="box3">
            <h2>Purchase History</h2>
            <ul>
              <li>
                <div id="li2">
                  <img src="https://www.ikea.com/sg/en/images/products/ikea-365-water-bottle-dark-grey__0916298_pe785100_s5.jpg" 
                  alt="Image Unavailable">
                  <v-btn class="ma-2" color="#20d3bb" dark>View More Details
                    <v-icon dark right>mdi-account-details</v-icon>
                  </v-btn>   
                </div>
              </li>
              <li>
                <div id="li2">
                  <img src="data:image/jpeg;base64,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"
                  alt="Image Unavailable">
                  <v-btn class="ma-2" color="#20d3bb" dark>View More Details
                    <v-icon dark right>mdi-account-details</v-icon>
                  </v-btn>                  
                </div>
              </li>
            </ul>    
            </div>        
            <br><br><br>
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
  padding-left: 150px;
  color: rgb(8, 8, 8);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
}
#h1col2 {
  text-align: left;
  padding-left: 500px;
  color: rgb(8, 8, 8);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
  padding-top: 50px;
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
  text-align: left;
  padding-left:100px;
  font-size: 20px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:25px;
  color: rgb(6, 7, 7);
}
h4 {
  font-size: 20px;
  font-family: Nunito;
  font-weight: normal;
}
#column1 {
  width: 30%;
}
#box1 {
  outline-style: solid;
}
#content1 {
  width:500px;
  padding-left:100px;
}
#column2 {
  float: left;
  width: 70%;
}
#box2 {
  outline-style: solid;
  width:1600px;
}
#box3 {
  outline-style: solid;
  width:1600px;
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
  list-style-type: none;
}
li {
  margin-top:25px;
}
.ul2 {
  list-style-type: none;
}
#li2 {
  display: flex;
}
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

</style>
