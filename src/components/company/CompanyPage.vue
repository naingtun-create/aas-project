<template>
<div id="companypage">
    <company-header></company-header>
    <div id="intro">
        <p id="title">{{companyData[0].companyname}}</p>
        <div id="heading">            
            <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600" persistent>
                <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                    color="#c9AA88"
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
                        <img v-show="imageURL == ''" src="../../assets/DummyImage.png" height="150"/>
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
        <v-btn x-small v-on:click="dialog = true">Upload Company Picture
        <v-icon dark right>mdi-image</v-icon>
        </v-btn>
        <br/>
        <h3>Our Story</h3>
        <br/>
        <p>
            {{companyData[0].description}}
        </p>
        <p> Visit us at: <a :href="companyData[0].website">{{companyData[0].website}}</a></p>
        
        <v-dialog v-model="editDialog" transition="dialog-top-transition" max-width="600" persistent>
            <template>
                <v-card>
                    <v-toolbar color="#c9AA88" dark>Update Company's Story</v-toolbar>
                    <br>
                    <v-card-text>
                        <v-textarea solo v-model="updateStory">
                        </v-textarea>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="storyUpdate">Update</v-btn>
                        <v-btn text @click="closeUpdateDialog">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-btn x-small v-on:click="editDialog = true">Edit Story
        <v-icon dark right>mdi-information</v-icon>
        </v-btn>
        <br/><br/>
        <change-password-dialog/>


    </div>

    </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase.js";
import ChangePasswordDialog from '../ChangePassword.vue';


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
            products: [],
            updateStory: "",
            editDialog: false
        }
    },
    components: {
        ChangePasswordDialog: ChangePasswordDialog
    },
    methods: {
        close: function() {
            this.imageURL = '';
            this.image = [];
            this.dialog = false;
        },
        closeUpdateDialog: function() {
            this.editDialog = false;
            this.updateStory = this.companyData[0].description;
            
        },
        uploadImage: async function() {

            var k = this.id;
          
            if (this.image != []) {
                //Putting it in the storage
                try {
                    //Its is place ProductImages => CompanyId
                    //Reference to the storage
                    var storageRef = firebase.storage().ref("ProfilePics/" + k );

                    //remember to add the delete or update storage to check first
                    if (this.profileURL != "") {
                    await storageRef.delete()
                    }

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
            } else {
                alert("Please choose an image to be uploaded!")
            }
        
        },
        onFilePicked: function() {
            var reader = new FileReader() 
            reader.readAsDataURL(this.image)
            reader.onload = () => {
                this.imageURL = reader.result;
            }
        },
        storyUpdate: async function() {
            await db
                .collection("company")
                .doc(this.id)
                .update({
                    description: this.updateStory
                })
                .catch((e) => {
                console.log(e);
                });

            alert("Update Successful");

            location.reload()

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
    watch: {
        companyData: function() {
            this.updateStory = this.companyData[0].description;
        }
    },
    created () {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
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
</style>