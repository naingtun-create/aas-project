<template>
<div id="companypage">
    <shopper-header></shopper-header>
    <div id="intro">
        <p id="title" >{{companyData.companyname}}</p>
        <div id="heading">
            <img v-show="profileURL != ''" style="float:left" :src="profileURL">
            <img v-show="profileURL == ''" style="float:left" src="../../assets/NoCompanyImage.png">
        </div>
    <h3> Our Story </h3>
    <br/>
    <p>{{companyData.description}}</p>
    </div>

    <div id="combined">
        <ul>
            <li>
                <div id="productsection">
                    <h3>Our Products</h3>
                    <ProductDisplay :companyID="this.id"></ProductDisplay>
                </div>
            </li>
            
            <li>
                <div id="promotionsection">
                    <h3>Upcoming Promotional Activities</h3>
                </div>
            </li>
        </ul>
    </div>
    <br><br>

    </div>
</template>

<script>
import ProductDisplay from "./View_Company_Components/ProductDisplay"
import db from "../../firebase.js";


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
        ProductDisplay: ProductDisplay
    },
    methods: {
        close: function() {
            this.reset();
            //this.$forceUpdate();
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
    padding-top:50px;
    padding-left:100px;
    font-size:15px;
    text-align:left;
    display:inline-table
}
#heading {
    display: flex;   
}
#title{
    font-weight: bold;
    font-size:20px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88
}
img {
  border: 1px solid #ddd;
  border-radius: 2x;
  padding: 2px;
  width: 150px;
  margin-top: -10px;
}
h3 {
    margin-top:20px;
    margin-bottom:-15px;
}
#combined{
    display:table-cell;
}
#productsection {
    float:left;
    text-align:left;
    padding-left:75px;
    margin-top:-15px;
}
#promotionsection {
    float:left;
    text-align:left;
    padding-left:75px;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  margin-top:0px;
}


</style>