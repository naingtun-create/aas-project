<template>
<div id="companyproducts">
    <company-header></company-header>
    <h1>View Customer Orders </h1>
    <div id="boxpayment">
        <v-list><br>
            <v-list-item v-for="(item,id) in items" :key="id">
                    <div id="invoice">
                      <v-list-item-avatar tile size="100px"> 
                        <v-img :alt="`${item.title}`" :src="item.image" ></v-img>
                      </v-list-item-avatar>
                      </div>
                      <v-list-item-content>
                        <v-list-item-title id="purchasedetails" v-text="item.title"></v-list-item-title>
                        <p>{{item.product}}</p>
                        <p>{{item.paidAmount}}</p>
                      </v-list-item-content>
                  <v-divider></v-divider>
            </v-list-item><br><br>
          </v-list>
        </div>
</div>
</template>

<script>
import db from '../../firebase.js'
import firebase from 'firebase'

export default {
    name: "companyproducts",
    data() {
        return {
            items:[],
        };
    },
    methods:{
        fetchItems:function(){
            var user = firebase.auth().currentUser;
            db.collection('transactions').get().then(snapshot => {
                let item = []
                snapshot.docs.forEach(doc => {
                    item = doc.data()
                    console.log(item)
                    for(var i in item.Products){
                        console.log(item.Products)
                        if(item.Products[i].companyID == user.uid){
                            var intake = { 
                                "title": item.Products[i].title,
                                "paidAmount":item.Products[i].totalPrice,
                                "userID": item.UserID,       
                                "product":item.Products[i].colors,
                                "image": item.Products[i].image,
                            }
                            this.items.push(intake)    
                        }
                    }
                });
                console.log(this.items)
            });
        },
    },
    created(){this.fetchItems()},
    
}
</script>

<style scoped>
#boxpayment {
  width: 90%;
  border-radius: 25px;
  border: 3px solid #c9AA88;
  border-radius: 10px;
  min-height: 100px;

  height: auto;
}
#invoice{
  font-size:15px;
  padding-left:100px;
  font-weight:bold;
  font-family: 'Montserrat', sans-serif;
}
</style>