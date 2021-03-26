<template>
  <div>
    <div id="intro">
        <p> {{this.datapacket[0].category}} <p>
        <p id="title"> {{this.datapacket[0].title}}</p>
        <p>{{this.datapacket[0].description}}</p>
        <br>
        <v-img v-bind:src="this.datapacket[0].image"></v-img>
    </div>
    <div id="contents">
        <p id="bold"> View Seller: {{this.datapacket[0].company}}</p>
        <p id="bold"> Price:</p> SGD {{this.datapacket[0].price}} <br>
        <p id="bold">Additional Information:</p> {{this.datapacket[0].sizeguide}}
        <p v-if="this.datapacket[0].size" id="bold"> Select Size: 
            <v-select v-model="selectedSize" :items="this.datapacket[0].size" filled label="Size" dense ></v-select>
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
        <button>Add to Cart</button>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue'
import database from '../firebase.js'
Vue.component('database',database)
export default {
    props: ["id"],
    data(){  
        return{
        qty:1,
        currentSize: '',
        selectedSize: '',
        selectedColour: '',
        datapacket:[],
        order:[],
        }
    },
    methods:{
        fetchItems: function(){
        database.collection('products').doc(this.id).get().then((doc)=>{
            let item ={}
            item=doc.data()
            this.datapacket.push(item)
            })  
        },
        sendOrder: function() {
            this.order.push([this.id,this.quantity]);
            //database.collection('cart').add(Object.assign({}, this.fullbkt)).then(() => location.reload());

        },  
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
    padding-top:100px;
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
</style>

