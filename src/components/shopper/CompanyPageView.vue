<template>
<div id="companypage">
    <shopper-header></shopper-header>
    <div id="intro">
        <p id="title" >{{companyData.companyname}}</p>
        <div id="heading">
            <img id='profilepic' v-show="profileURL != ''" style="float:left" :src="profileURL">
            <img height="150" v-show="profileURL == ''" style="float:left" src="../../assets/NoCompanyImage.png">
        </div>
    <h3> Our Story </h3>
    <br/>
    <p>{{companyData.description}}</p>
    <p> Visit us at: <a :href="companyData.website">{{companyData.website}}</a></p>
    </div>

    <div id="combined">
        <div id="productsection">
            <h3>Our Products</h3>
            <br/>
            <v-divider></v-divider>
            <ProductDisplay :companyID="this.id"></ProductDisplay>
        </div>
      
        <div id="activitysection">
            <h3>Our Activities</h3>
            <br/>
            <v-divider></v-divider>
            <DisplayActivity :companyID="this.id"></DisplayActivity>
        </div>

    </div>
    <br><br>

    </div>
</template>

<script>
import ProductDisplay from "./View_Company_Components/ProductDisplay"
import db from "../../firebase.js";
import DisplayActivity from "./DisplayActivity.vue"


export default {
    name: "companyPage",
    props:["id"],
    data: () => {
        return {   
            image: [], 
            imageURL: "",
            profileURL: '',
            companyData: [],
            products: []
        }
    },
    components: {
        ProductDisplay,
        DisplayActivity
    },
    methods: {
        close: function() {
            this.reset();
            location.reload();
        },
        fetchData: async function() {

            var k = this.id;
                  
            await db.collection("company").doc(k).get().then((doc) => {
                this.companyData = doc.data();
                if (typeof this.companyData.profilePic != 'undefined') {
                    this.profileURL = this.companyData.profilePic;
                }
                console.log(this.profileURL);
            })

            var products = await db.collection("products").get();
            console.log(products)
            console.log(this.companyData)

        }
    },
    created () {
        this.fetchData();
    }
}
</script>

<style scoped>
#companypage {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
}
#intro {
    float:left;
    padding:3%;
    font-size:15px;
    text-align:left;
    display:inline-table
}
#heading {
    display: flex;   
}
#title{
    font-weight: bold;
    font-size:30px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88
}
#profilepic {
  border: 1px solid #ddd;
  border-radius: 2x;
  padding: 2px;
  width: 200px;
  margin-top: -10px;
}
h3 {
    margin-top:20px;
    margin-bottom:-15px;
    font-size:25px;    
}
#editstory{
    float:right;
    padding-right:100px;
}
#uploadpic{
    float:right;
    padding-right:100px;
}
p {
    font-size:20px;
}
#combined {
    text-align: left;
    padding-left: 3%;
    padding-right: 3%;
}
</style>