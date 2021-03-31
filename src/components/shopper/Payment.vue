<template>
    <div id = "PaymentPage">
      <shopper-header></shopper-header>
        <nav>
        <v-card size="900" class="mx-auto" color = "#E3F2FD">
            <v-container>
                <ul>
                <li v-for="item in items" :key="item.id">
  
                            <div class="d-lg-flex flex-no-wrap" >

                                <v-avatar class="ma-3" size="250" tile>
                                    <v-img height="250" src="https://static.onecms.io/wp-content/uploads/sites/23/2020/08/24/what-is-a-sustainable-product-2000.jpg"></v-img>
                                </v-avatar>
                                <div>
                                    <v-card-title class="headline" color="black">{{item.totalPrice}}</v-card-title>
                                    <v-card-subtitle color="black">color[0]</v-card-subtitle>
                                </div>

                            </div>
                            <v-divider class="mx-4"></v-divider>    
                       
                </li>
                    
                </ul>
                <p id="subtotal"> SUBTOTAL:${{this.subtotal}}</p>
            </v-container>
        </v-card>
        </nav>
        <div id="contents">
            <img src = "https://upload.wikimedia.org/wikipedia/commons/e/e5/SPAYD_stored_in_the_QR_code.png" width = "700px" >
            <p>Please scan the QR code</p> 
            <p>Pay the required amount as stated in the subtotal</p>
            <v-btn class="ml-2 mt-5" outlined rounded x-large>Make Payment</v-btn>
        </div>
    </div>
</template>

<script>
import db from '../../firebase.js'
import firebase from 'firebase'

export default {
  name: 'OnlineMarketPlacePage',
  data(){
    return{
        items:[],
        subtotal:0,
    }
  },
  methods:{
    fetchItems:function(){
      var user = firebase.auth().currentUser;
      db.collection('cart').doc(user.uid).get().then(doc => {
        var product = {
          colors: [],
          title: '',
          image: '',
          id: '',
          totalPrice: 0,
        }
        var details = []
        details = doc.data()
        //console.log(details)  
        for(var info in details){
          //console.log(details[info].id)    
          for(var item in this.items){
            if(details[info].id == this.items[item].id){
              this.items[item].colors.push([details[info].color, details[info].quantity, details[info].size])
              this.items[item].totalPrice += details[info].price * details[info].quantity
              break
            } 
          }
          product.colors.push([details[info].color, details[info].qty, details[info].size])
          product.id = details[info].id
          product.totalPrice += details[info].price * details[info].qty
          this.items.push(product)
          product = {
            colors: [],
            title: '',
            image: '',
            id: '',
            totalPrice: 0,
          }

        }
        console.log(this.items)
      });
    },
  },
  created(){this.fetchItems()},
}
</script>

<style scoped>
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 500px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  width:1300px;
}
nav {
    float: left;
    width: 50%;
    padding: 30px; 
    height: 1000px; 
    margin-top:10px;
    margin-left:10px;
}
#content {
    float: right;
    padding: 30px; 
    width: 50%;
    background-color: #FFFAF0;
    height: 1000px; 
}  
p{
  font-family: "Courier New", Times, serif;
  color:"black";
  font-size: 30px;
  font-weight: bold;
}
#subtotal{
    font-size: 40px;
    text-align:end;
    padding-right:100px;
}
</style>