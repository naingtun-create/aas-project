<template>
  <div id="companyproductpage">
    <company-header></company-header>
    <div id="intro">
        <img id="arrow" src='../../assets/arrow.png'>
        <router-link id="back" to="/company/companyproducts" exact>Back to My Products</router-link>
        <br><br>
        <p>{{this.datapacket[0].category}}<p>
        <p id="title"> {{this.datapacket[0].title}}</p>
        <p>{{this.datapacket[0].description}}</p>
        <br>
        <v-img v-bind:src="this.datapacket[0].image"></v-img>
    </div>
    <div id="contents">
        <p id="bold"> Price:</p> 
        <p id="details">SGD {{this.datapacket[0].price}} </p>
        <p id="bold">Additional Information: </p>
        <p id="details">{{this.datapacket[0].sizeguide}}</p>
        <p v-if="this.datapacket[0].size" id="bold"> Select Size: 
            <v-select v-model="selectedSize" :items="this.datapacket[0].size" filled label="Size" dense ></v-select>
        </p>
        <p id="bold"> Colours Available:</p>
        <p id="details" v-for="color in this.datapacket[0].colors" :key="color.id">{{color}}</p>
        <p id="bold"> Sizes Available:</p>
        <p id="details" v-for="size in this.datapacket[0].sizings" :key="size.id">{{size}}</p>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'
import database from '../../firebase.js'
import firebase from 'firebase'

Vue.component('database',database)

export default {
    props: ["id"],
    data() {  
        return{
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
        fetchItems: async function() {
            await database.collection('products').doc(this.id).get().then((doc)=>{
                let item ={};
                item=doc.data();
                this.datapacket.push(item);
                })
            var docRef = database.collection("cart").doc(this.user);
            await docRef.get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    docRef.get().then((doc) => {
                        let item={};
                        item=doc.data();
                        this.currentCart.push(item);
                    })
                }
            });
        },
        sendOrder: function() {
            if (Object.keys(this.currentCart).length>0) {
                this.currentCart=Object.values(this.currentCart[0]);
            }
            this.currentCart.push({
                id:this.id,
                qty:this.qty,
                size:this.selectedSize,
                color:this.selectedColour,
                price:this.datapacket[0].price,
            });
            database.collection("cart").doc(this.user).set(Object.assign({},this.currentCart));
            alert("Your order has been added to cart");
        },  
    },
    created: function() {
        this.fetchItems();
    },
}
</script>

<style scoped>
#intro {
    width:40%;
    float:left;
    padding-top:50px;
    padding-left:100px;
    font-size:20px;
    text-align:left;
}
#contents {
    width:40%;
    padding-top:50px;
    float:right;
    font-size:20px;
    margin: 100px;  
}
#bold{
    font-weight: bold;
    color:#c9AA88;
}
#title{
    font-weight: bold;
    font-size:30px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88;
}
#select{
    color:#c9AA88;
    font-size:15px;
}
button {
  width: 200px;
  height: 80px;
  background-color: #c9AA88;
  border-radius: 10px;
  border-width: 1px;
}
input[type=number] {
    background-color: #ececec;
    font-size:20px;
}
#arrow {
    height:30px;
    font-size:20px;
    color:black;
    margin-top:-10px;
}
#back {
    height:30px;
    font-size:20px;
    color:black;
    margin-top:-15px;
}
#details {
    margin-top: -15px;
}
</style>

