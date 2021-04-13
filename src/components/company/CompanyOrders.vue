<template>
<div id="companyproducts">
    <company-header></company-header>
    <h1>View Customer Orders </h1>
    <div id="boxorder">
        <v-list><br>
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

                  
            </v-list-item><br><br>
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
        fetchItems:function(){
            var user = firebase.auth().currentUser;
            db.collection('transactions').orderBy("timestamp","desc").get().then(snapshot => {
                let item = []
                snapshot.docs.forEach(doc => {
                    item = doc.data()
                    //console.log(item)
                    for(var i in item.Products){
                        console.log(item.Products)
                        if(item.Products[i].companyID == user.uid && item.completed[i] == false){
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
                            }
                            //console.log(intake.orderID)
                            this.items.push(intake)    
                        }
                    }
                });
                //console.log(this.items)
            });
        },
        updateItems:function(orderID, productID, completedList){
            completedList[productID] = true
            console.log(completedList)
            db.collection('transactions').doc(orderID).update({
                completed: completedList
            }).then(() => location.reload())
        }


    },
    created(){this.fetchItems()},
    
}
</script>

<style scoped>
h1{
    padding:20px;
    font-family:Verdana, Tahoma, sans-serif;

}
#boxorder {
    width: 80%;
    border-radius: 25px;
    border: 3px solid #c9AA88;
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
    font-family: 'Montserrat', sans-serif;
    padding-bottom: 10px;
}
#itemTitle{
    font-family: 'Montserrat', sans-serif;
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