<template>
<div id="companypage">
    <shopper-header></shopper-header>
    <div id="intro">
        <div id="heading">
            <p id="title" style="float:left">{{companyData.companyname}}</p>
            
            <img v-show="profileURL != ''" style="float:right" :src="profileURL">
            <img v-show="profileURL == ''" style="float:right" src="../../assets/NoCompanyImage.png">
    </div>
        <br/>
        <h3> Our Story </h3>
        <br/>
        <p>
            {{companyData.description}}
        </p>
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
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#productsection {
    float:left;
    text-align:left;
    font-size:30px;
    padding-left:170px;
    
}
#promotionsection {
    float:left;
    text-align:left;
    font-size:30px;
    padding-left:170px;
    margin-top:50px;
    
}
#combined{
    display:table-cell;
}
#title{
    font-weight: bold;
    font-size:80px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88
}
#heading {
    display: inline-block;
}
img {
  width: 100%;
  height: auto;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  margin-top:25px;
}


</style>