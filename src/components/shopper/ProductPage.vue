<template>
  <div>
    <shopper-header></shopper-header>
    <div id="intro">
        <img id="arrow" src='../../assets/arrow.png'>
        <router-link id="arrow" to="/shopper/onlinemarketplace" exact>Back to Online MarketPlace</router-link>
        <br><br>
        <p> {{this.datapacket[0].category}} <p>
        <p id="title"> {{this.datapacket[0].title}}</p>
        <p>{{this.datapacket[0].description}}</p>
        <br>
        <v-img v-bind:src="this.datapacket[0].image"></v-img>
    </div>
    <div id="contents">
        <p id="bold"> View Seller: <a v-on:click="reroute">{{this.datapacket[0].companyName}} </a></p>
        <p id="bold"> Price:</p> SGD {{this.datapacket[0].price}} <br>
        <p id="bold">Additional Information:</p> {{this.datapacket[0].sizeguide}}
        <p v-if="this.datapacket[0].sizings" id="bold"> Select Size: 
            <v-select v-model="selectedSize" :items="this.datapacket[0].sizings" filled label="Size" dense ></v-select>
        </p>
        <p v-if="this.datapacket[0].colors" id="bold"> Select Colour:
            <v-select v-model="selectedColour" :items="this.datapacket[0].colors" filled label="Colour" dense ></v-select>
        </p>
        <p id="bold"> Select Quantity: </p>
        <input v-model="qty" id=index placeholder=0 type="number" min="1">
        <br><br> 
        <span v-if="this.datapacket[0].size" id="select">Selected Size: {{ selectedSize }}</span>
        <br>
        <span v-if="this.datapacket[0].colors" id="select">Selected Colour: {{ selectedColour }}</span>
        <br>
        <span id="select">Selected Quantity: {{this.qty}}</span>
        <br><br>
        <button v-on:click="sendOrder()">Add to Cart</button>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'
import database from '../../firebase.js'
import firebase from 'firebase'
Vue.component('database',database)
export default {
    data(){  
        return{
        id: this.$route.params.id,
        qty:1,
        currentSize: '',
        selectedSize: '',
        selectedColour: '',
        datapacket:[],
        order:[],
        currentCart:[],
        user:firebase.auth().currentUser.uid,
        }
    },
    methods:{
        fetchItems: async function(){
        await database.collection('products').doc(this.id).get().then((doc)=>{
            let item ={}
            item=doc.data()
            this.datapacket.push(item)
            })
        var docRef = await database.collection("cart").doc(this.user);
        await docRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                docRef.get().then((doc) => {
                    let item={}
                    item=doc.data()
                    console.log(item)
                    this.currentCart.push(item);
                })
            }
        });
        
        },
        sendOrder: function() {
            if(Object.keys(this.currentCart).length>0){
                this.currentCart=Object.values(this.currentCart[0]);
                console.log(Object.values(this.currentCart)[0])
            }
            this.currentCart.push({
                    id:this.id,
                    qty:this.qty,
                    size:this.selectedSize,
                    color:this.selectedColour,
                    price:this.datapacket[0].price,
                });
            database.collection("cart").doc(this.user).set(Object.assign({},this.currentCart));
            alert("Your order has been added to cart")
        },
        reroute: function() {
            var companyID = this.datapacket[0].company;
            this.$router.push({ name: "viewCompanyPage", params: { id: companyID } });
        }
    },
    created: function(){
        this.fetchItems()
    },
}
</script>

<style scoped>
#intro {
    width:50%;
    float:left;
    padding-top:50px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#contents {
    width:40%;
    padding-top:100px;
    float:right;
    font-size:40px;
    margin: 100px;  
}
#bold{
    font-weight: bold;
    color:#c9AA88;
}
#title{
    font-weight: bold;
    font-size:80px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88;
}
#select{
    color:#c9AA88;
    font-size:40px;
}
button {
  width: 400px;
  height: 120px;
  background-color: #c9AA88;
  border-radius: 10px;
  border-width: 1px;
}
input[type=number] {
    background-color: #ececec;
    font-size:40px;
}
#arrow {
    height:60px;
    font-size:40px;
    color:black;
}
</style>