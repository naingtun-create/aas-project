<template>
<div id="companypage">
    <company-header></company-header>
    <div id="intro">
        <div id="heading">
            <p id="title" style="float:left">{{companyData.companyname}}</p>
            <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600" persistent>
                <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                    color="primary"
                    dark
                    >Upload Company's Profile Image</v-toolbar>
                    <br>
                    <v-card-text>
                        <v-file-input
                        accept="image/*"
                        label="Product Image"
                        truncate-length="15"
                        type="file"
                        v-model="image"
                        outlined
                        @change="onFilePicked"
                        ></v-file-input>
                        <img v-show="imageURL == ''" src="../../assets/DummyImage.png" height="200"/>
                        <img v-show="imageURL != ''" :src="imageURL" height="200"/>
                        
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn text @click="uploadImage">
                        Upload    
                    </v-btn>
                    <v-btn
                        text
                        @click="dialog.value = false"
                    >Close</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
            <img v-show="profileURL != ''" style="float:right" :src="profileURL" v-on:click="toggleDialog">
            <img v-show="profileURL == ''" style="float:right" src="../../assets/UploadCompanyImage.png" v-on:click="toggleDialog">
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
                    <ProductDisplay></ProductDisplay>
                    <NewProductForm></NewProductForm>
                </div>
            </li>
            
            <li>
                <div id="promotionsection">
                    <h3>Upcoming Promotional Activities</h3>
                    <NewPromoForm></NewPromoForm>
                </div>
            </li>
        </ul>
    </div>
    <br><br>

    </div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'
import NewPromoForm from './NewPromoForm.vue'
import ProductDisplay from "./ProductDisplay"
import firebase from "firebase";
import db from "../../firebase.js";


export default {
    name: "companyPage",
    data: () => {
        return {   
            dialog: false,
            image: [], 
            imageURL: "",
            profileURL: '',
            companyData: [],
            products: []
        }
    },
    components: {
        NewProductForm: NewProductForm,
        NewPromoForm: NewPromoForm,
        ProductDisplay: ProductDisplay
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog
        },
        close: function() {
            this.reset();
            this.toggleDialog();
            //this.$forceUpdate();
            location.reload()
            
        },
        uploadImage: async function() {

            var user = firebase.auth().currentUser;
            var k = user.uid;

        //Putting it in the storage
        try {
            //Its is place ProductImages => CompanyId => productiD
            //Reference to the storage
            var storageRef = firebase.storage().ref("ProfilePics/" + k);

            //remember to add the delete or update storage to check first
            
            //Waiting till it uploaded to firebase storage
            await storageRef.put(this.image)
            var _extension = this.image.name.split(".")[1]

            //Update the metadata to be uploaded as image
            var newMetadata = {
                contentType: 'image/' + _extension
            };

            await storageRef.updateMetadata(newMetadata)

            //Retrieving the download URL for the product Image
            await storageRef.getDownloadURL().then( async function(url) {
                    //Add it into the database
                    await db.collection("company")
                    .doc(k)
                    .update({
                        "profilePic" : url.toString()
                    })
                    console.log("success")
                
            }).then(
                this.close(),
                alert("Uploaded Successfully!")
            );

        } catch (e) {
          console.log(e);
        }
            
        },
        onFilePicked: function() {
            var reader = new FileReader() 
            reader.readAsDataURL(this.image)
            reader.onload = () => {
                this.imageURL = reader.result;
            }
        },
        reset: function() {
            this.imageURL = ''
            this.image = []
        },
        fetchData: async function() {
            var user = firebase.auth().currentUser;
            var k = user.uid;

            await db.collection("company").doc(k).get().then((doc) => {
                this.companyData = doc.data();
                if (typeof this.companyData.profilePic !== 'undefined') {
                    this.profileURL = this.companyData.profilePic
                }
                console.log(this.profileURL)
            })

            var products = await db.collection("products").where("company","==",k).get()
            console.log(products)
            console.log(this.companyData)

        }
    },
    created () {
        this.fetchData()
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