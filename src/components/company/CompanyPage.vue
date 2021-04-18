<template>
    <div id="companypage">
        <company-header></company-header>
        <div id="intro">
            <p id="title">{{companyData[0].companyname}}</p>
            <div id="heading">            
                <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600" persistent>
                    <template>
                        <v-card>
                            <v-toolbar color="#4ca08b" dark>Upload Company's Profile Image</v-toolbar>
                            <br/>
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
                                <img id='profilepic' v-show="imageURL != ''" :src="imageURL" height="150"/>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn text v-on:click.once="uploadImage">Upload</v-btn>
                            <v-btn text v-on:click="close">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
                <img  height="120" v-show="profileURL != ''" style="float:right" :src="profileURL">
                <img v-show="profileURL == ''" style="float:right" src="../../assets/UploadCompanyImage.png">
                <br/>
            </div>
            <br/>
            <div id="uploadpic">
            <v-btn x-small v-on:click="dialog = true">
                Upload Company Picture
                <v-icon dark right>mdi-image</v-icon>
            </v-btn>
            </div>
            <br/>
            <h3>Our Story</h3>
            <br/>
            <p>{{companyData[0].description}}</p>
            <p> Visit us at: <a :href="companyData[0].website">{{companyData[0].website}}</a></p>
            <v-dialog v-model="editDialog" transition="dialog-top-transition" max-width="600" persistent>
                <template>
                    <v-card>
                        <v-toolbar color="#4ca08b" dark>Update Company's Story</v-toolbar>
                        <br/>
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
            <div id="editstory">
                <v-btn x-small v-on:click="editDialog = true">Edit Story
                <v-icon dark right>mdi-information</v-icon>
                </v-btn>
            </div>
            <br/><br/>
            <change-password-dialog/>
            <br/>
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
            this.dialog = false;
            this.imageURL = '';
            this.image = [];
        },
        closeUpdateDialog: function() {
            this.editDialog = false;
            this.updateStory = this.companyData[0].description;
        },
        uploadImage: async function() {
            var k = this.id;
            if (this.image != []) {
                try {
                    var storageRef = firebase.storage().ref("ProfilePics/" + k );
                    if (this.profileURL != "") {
                        await storageRef.delete()
                    }
                    await storageRef.put(this.image)
                    var _extension = this.image.name.split(".")[1]
                    
                    var newMetadata = {
                        contentType: 'image/' + _extension
                    };
                    await storageRef.updateMetadata(newMetadata)
                    await storageRef.getDownloadURL().then( async function(url) {
                        await db.collection("company").doc(k).update({
                            "profilePic" : url.toString()
                        }).then(
                            alert("Uploaded Successfully! Please wait, while we refresh your page!"),
                            await new Promise((resolve) => setTimeout(resolve, 1000)),
                            location.reload(),
                        ).catch( e => {
                            console.log(e)
                        })
    
                    })
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
            location.reload()
        },
        fetchData: async function() {
            var user = firebase.auth().currentUser;
            var k = user.uid;
            await db.collection("company").doc(k).get().then((doc) => {
                var data = {};
                data = doc.data();
                this.companyData.push(data);
                if (typeof this.companyData[0].profilePic !== 'undefined') {
                    this.profileURL = this.companyData[0].profilePic
                }
                console.log(this.profileURL)
            })
        }
    },
    watch: {
        companyData: function() {
            this.updateStory = this.companyData[0].description;
        }
    },
    created() {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
        this.fetchData();
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");
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
    font-size:30px;
    font-family: 'Nunito';
    color:#4ca08b;
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
    font-family:'Nunito';
    color:#4ca08b;
}
#editstory{
    float:right;
    padding-right:100px;
}
#uploadpic{
    float:right;
    padding-right:100px;
}
p{
    font-size:20px;
    font-family:Nunito;
}
</style>