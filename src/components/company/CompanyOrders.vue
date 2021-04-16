<template>
    <div id="companyproducts">
        <company-header></company-header>
        <h1>View Customer Orders</h1>
        <div id="boxorder">
            <v-list>
                <br/>
                <v-list-item v-for="(item,id) in items" :key="id">
                    <div id="invoice">
                        <v-list-item-avatar tile size="200px"> 
                            <v-img :alt="`${item.title}`" :src="item.image" ></v-img>
                        </v-list-item-avatar>
                        </div>
                        <v-list-item-content>
                            <h2 id="itemTitle" >{{item.title}}</h2><br>
                            <p v-for = "color in item.product" :key="color.id" id="details">ORDER DETAILS: <b>{{color}}</b></p>
                            <p id="cost">TOTAL COST: ${{item.paidAmount}}</p>
                            <p id="date"> DATE: {{item.date}}</p>
                            <v-divider></v-divider>
                        </v-list-item-content>
                        <v-list-item-content>
                            <ClientDetailForm v-bind:clientID = item.userID></ClientDetailForm>
                            <v-btn id = "complete" small color="red lighten-2" dark @click="updateItems(item.orderID, item.productID, item.completed)"> 
                                Complete Order 
                                <v-icon dark right>mdi-thumb-up</v-icon>
                            </v-btn>
                        </v-list-item-content>       
                        <v-list-item-content>
                            <v-icon x-large color= "green" v-show="item.completed[item.productID]">mdi-sticker-check</v-icon>
                            <v-icon x-large color= "red" v-show="!item.completed[item.productID]">mdi-account-clock</v-icon>
                        </v-list-item-content>
                </v-list-item>
                <br/><br/>
            </v-list>
        </div>
    </div>
</template>

<script>
import db from '../../firebase.js'
import firebase from 'firebase'
import ClientDetailForm from './ClientDetail.vue'

export default {
    name: "companyproducts",
    data() {
        return {
            items:[],
        };
    },
    components: {
        ClientDetailForm: ClientDetailForm,
    },
    methods:{
        fetchItems: async function(){
            var user = firebase.auth().currentUser;
            await db.collection('transactions').orderBy("timestamp","desc").get().then(snapshot => {
                let item = [];
                snapshot.docs.forEach(doc => {
                    item = doc.data();
                    for(var i in item.Products){
                        console.log(item.Products)
                        if(item.Products[i].companyID == user.uid){
                            var intake = { 
                                "title": item.Products[i].title,
                                "paidAmount":item.Products[i].totalPrice,
                                "userID": item.UserID,       
                                "product":item.Products[i].colors,
                                "image": item.Products[i].image,
                                "date":item.Date,
                                "orderID":doc.id,
                                "completed":item.completed,
                                "productID":i,
                            };
                            this.items.push(intake); 
                        }
                    }
                });
            });
        },
        updateItems: function(orderID, productID, completedList) {
            completedList[productID] = true;
            console.log(completedList);
            db.collection('transactions').doc(orderID).update({
                completed: completedList
            }).then(() => location.reload());
        }
    },
    created() {
        this.fetchItems();
    },
    
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");

h1{
    padding:20px;
    font-family:Nunito;
}
#boxorder {
    width: 80%;
    border-radius: 25px;
    border: 3px solid #4ca08b;
    border-radius: 10px;
    min-height: 100px;
    height: auto;
    position:center;
    margin-left:150px;
}
#invoice{
    font-size:15px;
    padding-left:100px;
    font-weight:bold;
    font-family: Nunito;
    padding-bottom: 10px;
}
#itemTitle{
    font-family: 'Nunito';
    font-weight:bold;
    font-size:20px;
    padding-bottom: 15px;
}
#details{
    color:lightcoral;
    padding-bottom: 5px;
}
#cost{
    color:lightcoral;
    padding-bottom: 5px;
}
#complete{
    width:50%;
    margin-top:10px;
}
</style>