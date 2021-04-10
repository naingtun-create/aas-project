<template>
<div id="companypage">
    <company-header></company-header>
    <div id="intro">
        <div id="heading">
            <p id="title" style="float:left">{{companyData[0].companyname}}</p>
            
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
            <img v-show="profileURL != ''" style="float:right" :src="profileURL">
            <img v-show="profileURL == ''" style="float:right" src="../../assets/UploadCompanyImage.png">
            <br/>
           
        </div>
        <br/>
        <v-btn color="red lighten-2" dark  v-on:click="toggleDialog">Upload Company Picture</v-btn>
        <br/><br/>
        <h3>Our Story</h3>
        <br/>
        <p>
            {{companyData[0].description}}
        </p>
        <p> Visit us at: <a :href="companyData[0].website">{{companyData[0].website}}</a></p>
    </div>

    <div id="combined">
        <ul>
            <li>
                <div id="productsection">
                    <h3>Our Products</h3>
                    <br/>
                    <ProductDisplay></ProductDisplay>
                    <br/>
                    <NewProductForm v-bind:companyData="companyData"></NewProductForm>
                </div>
            </li>
            
            <li>
                <div id="activitysection">
                    <h3>Upcoming Activities</h3>
                    <br/>
                    <ActivityDisplay v-bind:companyID="this.id"></ActivityDisplay>
                    <br/>
                    <NewActivityForm v-bind:companyID="this.id"></NewActivityForm>
                    
                </div>
            </li>
        </ul>
    </div>
    <br><br>

    </div>
</template>

<script>
import NewProductForm from './Profile_Components/NewProductForm.vue'
import NewActivityForm from './Profile_Components/NewActivityForm.vue'
import ProductDisplay from "./Profile_Components/ProductDisplay.vue"
import firebase from "firebase";
import db from "../../firebase.js";
import ActivityDisplay from './Profile_Components/ActivityDisplay.vue';


export default {
    name: "companyPage",
    data: () => {
        return {   
            id:"",
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
        NewActivityForm: NewActivityForm,
        ActivityDisplay: ActivityDisplay,
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
            //location.reload()
            
        },
        uploadImage: async function() {

        var k = this.id;
          

        //Putting it in the storage
        try {
            //Its is place ProductImages => CompanyId
            //Reference to the storage
            var storageRef = firebase.storage().ref("ProfilePics/" + k );

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

                    console.log(url)
                
            }).then(
                this.close(),
                alert("Uploaded Successfully!")
            ).catch (e => {
                console.log(e)
            });

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
                var data = {};
                data = doc.data();
                this.companyData.push(data);
                //this.companyData = doc.data();

                if (typeof this.companyData[0].profilePic !== 'undefined') {
                    this.profileURL = this.companyData[0].profilePic
                }
                console.log(this.profileURL)
            })

            var products = await db.collection("products").where("company","==",k).get()
            console.log(products)
            console.log(this.companyData)

        }
    },
    created () {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
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
#activitysection {
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
  
  padding-top: 3%;
  padding-right: 25%;

}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  margin-top:25px;
}

</style>