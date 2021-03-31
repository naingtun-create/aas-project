<template>
<div id="companyPage">
    <company-header></company-header>
    <div id="intro">
        <div id="heading">
            <!-- <p id="title" style="float:left">Shlurple</p> -->
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
                <p>
                    <br/>
                    {{companyData.description}}
                </p>
                <!-- <p> In 2018, Shlurple was born from an ingrained love of the sea… watching a turtle cry in pain 
                    as a single-use plastic straw was removed from its nostril was the catalyst for us to want 
                    to make a change.
                    <br>
                    <br>Shlurple’s mission has always been to provide alternatives to single-use plastic. 
                    So, guided by our love for turtles and life as a whole, we have created a range of products 
                    that not only reduce unnecessary waste but provide a platform to discuss the cleaning up of our act 
                    and our oceans. We will continue to grow our following and provide alternatives until we solve 
                    our current plastic pollution problem. 
                    <br>
                    <br>We hope you join us on our journey and remember… BUY A SHLURPLE, SAVE A TURTLE.
                </p> -->
    </div>

    <div id="products">
        <h3 id="introproduct">Our Products </h3>
    <div id="contentsproduct">
        <NewProductForm></NewProductForm>
    </div>
    </div>

    <div id="promotionals">
        <h3 id="intropromo">Upcoming Promotional Activities </h3>
    <div id="contents">
        <NewPromoForm></NewPromoForm>
    </div>
    </div>
</div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'
import NewPromoForm from './NewPromoForm.vue'
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
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog
        },
        close: function() {
            this.close();
            this.toggleDialog();
            
        },
        uploadImage: async function() {

            var user = firebase.auth().currentUser;
            var k = user.uid;

        //Putting it in the storage
        try {
            //Its is place ProductImages => CompanyId => productiD
            //Reference to the storage
            var storageRef = firebase.storage().ref("ProfilePics/" + user.uid + "/" + k);

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
                if (!this.companyData.profilePic.empty) {
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

#intro {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#introproduct {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#intropromo {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#contentsproduct {
    width:40%;
    padding-top:150px;
    float:right;
    font-size:40px;
    margin: 100px;  
    padding-left:100px;
}
#contents {
    width:40%;
    padding-top:50px;
    float:right;
    font-size:40px;
    margin: 50px;  
}
#bold{
    font-weight: bold;
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
#products {
    padding-top:0px;
    width:60%;
}
#promotionals {
    padding-top:0px;
    width: 60%;
}
img {
  width: 100%;
  height: auto;
}
</style>