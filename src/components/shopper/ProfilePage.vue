<template>
    <div id="profilepage">
        <shopper-header></shopper-header>
        <br><br><br>
        <div id="left">
            <v-avatar size="180">
                <span v-if="!this.profileURL" id="initials">{{this.initials}}</span>
                <img id="profilepic" v-else :src="this.profileURL">
            </v-avatar>
            <v-dialog v-model="uploadDialog" transition="dialog-top-transition" max-width="600" persistent>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="#4ca08b" dark>Upload Your Profile Image</v-toolbar>
                        <br>
                        <v-card-text>
                            <v-file-input
                                accept="image/*" label="Product Image"
                                truncate-length="15" type="file"
                                v-model="image" outlined
                                @change="onFilePicked"
                            ></v-file-input>
                            <img
                                v-show="imageURL == ''"
                                src="../../assets/DummyImage.png"
                                height="200" width="550"
                            >
                            <img 
                                v-show="imageURL != ''" 
                                :src="imageURL" 
                                height="200" 
                                width="250"
                            >
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn id='upload' text @click="uploadImage">Upload</v-btn>
                            <v-btn id='upload' text @click="dialog.value = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog> <br><br><br>

            <div id="boxleft">
                <h2> Welcome to All About Sustainability, {{ shopperData.fullname }}.</h2><br><br><br><br>
                <p> "One-stop portal for eco-friendly stores"</p>
                <ul>
                    <li>
                        <v-dialog v-model="editDialog" transition="dialog-top-transition" max-width="600" persistent>
                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="#4ca08b" dark>Update your Personal Details</v-toolbar>
                                    <br>
                                    <v-card-text>
                                        <v-text-field label="Address" v-model="updateAddress"></v-text-field>
                                        <v-text-field label="Postal Code" v-model="updatePostalCode"></v-text-field>
                                        <v-text-field label="Unit Number" v-model="updateUnitNo"></v-text-field>
                                        <v-text-field label="Phone Number" v-model="updatePhone"></v-text-field>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn id='upload' text @click="confirmUpdate">Update</v-btn>
                                        <v-btn id='upload' text @click="dialog.value = false">Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div id="changepw">
                            <change-password-dialog/>
                        </div>
                    </li>
                    <li>
                        <div id="signoutbutton">
                            <button id="buttonsign" v-on:click="logout">Sign Out
                                <v-icon dark right>mdi-account-remove</v-icon>
                            </button>
                        </div>
                        <br><br>
                    </li>
                </ul>
            </div>
        </div>
    
        <div id="right">
            <h1 id="name">{{ shopperData.fullname }}</h1>
            <button id='profilebtn' v-on:click="toggleUploadDialog">Upload Profile Picture</button>
            <div id="boxcontact">
                <h2 id="mycontactdetails">My Contact Details</h2>
                <div id="icon">
                    <ul>
                        <li><v-icon size=20>mdi-email</v-icon></li>
                        <li><v-icon size=20>mdi-map-marker</v-icon></li>
                        <li id="phone"><v-icon size=20>mdi-phone</v-icon></li>
                    </ul>
                </div>
                <div id="details">
                    <ul>
                        <li>{{shopperData.email}}</li>
                        <li>{{shopperData.address + ", Singapore " + shopperData.postalCode }}<br>
                            <span>#{{shopperData.unitNo}}</span>
                        </li>
                        <li v-show="shopperData.phoneNumber">{{ shopperData.phoneNumber }}</li>
                    </ul>
                </div>
                <v-btn id="innerbutton" dark v-on:click="toggleEditDialog">Edit Details
                    <v-icon dark right>mdi-account-cog</v-icon>
                </v-btn>
            </div><br><br><br>

            <div id="boxpayment">
                <h2 id="mycontactdetails">Purchase History</h2>
                <v-list><br>
                    <v-list-item v-for="(purchase,id) in purchaseHistory" :key="id">
                        <v-list width="100%" subheader>
                            <div id="leftdetails">
                                <v-subheader id="invoice">Invoice Number: {{purchase.PaymentInvoice}}</v-subheader>
                                <v-subheader id="date">Date: {{purchase.Date}}</v-subheader>                                
                                <v-list-item v-for="(product,id) in purchase.Products" :key="id"> 
                                    <div id="invoice">
                                        <v-list-item-avatar tile size="100px"> 
                                            <v-img :alt="`${product.title}`" :src="product.image" ></v-img>
                                        </v-list-item-avatar>
                                    </div>
                                    <v-list-item-content>
                                        <v-list-item-title id="purchasedetails" v-text="product.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </div>
                            <div id="rightdetails">
                                <v-list-item-action> 
                                    <transaction-details :purchase="purchase"/>
                                </v-list-item-action>
                            </div>
                            <v-divider></v-divider>
                        </v-list>
                    </v-list-item><br><br>
                </v-list>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase.js";
import transactionDetails from "./TransactionDetails.vue"
import ChangePasswordDialog from '../ChangePassword.vue';

export default {
    data() {
        return {
            id: "",
            shopperData: [],
            purchaseHistory: [],
            image: [],
            imageURL: "",
            profileURL: "",
            initials: "",
            updateAddress: "",
            updatePhone: "",
            updatePostalCode: "",
            updateUnitNo: "",
            uploadDialog: false,
            editDialog: false,
        };
    },
    components: {
        transactionDetails,
        ChangePasswordDialog
    },
    methods: {
        logout() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace({ path: "/" });
            });
        },
        close: function() {
            this.uploadDialog = false;
            this.reset();
            this.window.location.reload();
        },
        uploadImage: async function() {
            var k = this.id;
            if (this.image != []) {
                try {
                    var storageRef = firebase.storage().ref("ProfilePics/" + k );
                    if (this.profileURL) {
                        await storageRef.delete()
                    }

                    await storageRef.put(this.image)
                    var _extension = this.image.name.split(".")[1]

                    var newMetadata = {
                        contentType: 'image/' + _extension
                    };

                    await storageRef.updateMetadata(newMetadata)

                    await storageRef.getDownloadURL().then(async function(url) {

                        await db.collection("shoppers").doc(k).update({
                            "profilePic" : url.toString()
                        }).catch( e => {
                            console.log(e)
                        })
                        console.log(url)      
                    }).then(
                        alert("Uploaded Successfully! Please refresh the page to see your new profile pic!"),
                        this.close(),
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
            var reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onload = () => {
                this.imageURL = reader.result;
            };
        },
        reset: function() {
            this.imageURL = "";
            this.image = [];
        },
        fetchData: async function() {
            await db
            .collection("shoppers")
            .doc(this.id)
            .get()
            .then((doc) => {
                this.shopperData = doc.data();
                if (!this.shopperData.profilePic != null) {
                    this.profileURL = this.shopperData.profilePic;
                }
                console.log(this.profileURL);
                this.generateInitials();
            });

            await db
            .collection("transactions")
            .where("UserID", "==", this.id)
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    this.purchaseHistory.push(doc.data());
                });
            });
            this.purchaseHistory = this.purchaseHistory.sort(this.compareDates);
            console.log(this.shopperData);
        },
        compareDates: function(a, b) {
            if (a.timestamp > b.timestamp) {
                return -1;
            } else if (a.timestamp < b.timestamp) {
                return 1;
            } else {
                return 0;
            }
        },
        generateInitials: function () {
            var fullname = this.shopperData.fullname.split("\\s+");
            if (fullname.length > 1) {
                this.initials = fullname[0][0] + fullname[1][0];
            } else {
                this.initials = fullname[0][0];
            }
        },
        toggleUploadDialog: function() {
            this.uploadDialog = !this.uploadDialog;
        },
        toggleEditDialog: function() {
            this.editDialog = !this.editDialog;
        },
        confirmUpdate: async function() {
            await db
            .collection("shoppers")
            .doc(this.id)
            .update({
                address: this.updateAddress,
                postalCode: this.updatePostalCode,
                phoneNumber: this.updatePhone,
                unitNo: this.updateUnitNo
            })
            .catch((e) => {
                console.log(e);
            });

            alert("Update Successful");
            this.editDialog = false;
            location.reload();
        },
    },
    watch: {
        shopperData: function() {
            this.updateAddress = this.shopperData.address;
            this.updatePhone = this.shopperData.phoneNumber;
            this.updatePostalCode = this.shopperData.postalCode;
            this.updateUnitNo = this.shopperData.unitNo;
        },
    },
    created() {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
        this.fetchData();
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");

#profilepage {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  padding-bottom:50px;
  min-width:1400px;  
}
h1 {
  text-align: left;
  padding-left: 150px;
  color: #235347;
  font-family: 'Nunito';
  font-weight: bolder;
}
h2 {
  margin: -20px;
  font-family: 'Nunito';
  font-weight: bold;
  margin-top: 35px;
  color:white;
}
#phone {
    padding-top:11px;
}
p{
  color:black;
  font-size: 15px;
  font-family: 'Nunito';
  font-style: italic;
}
#upload{
  width:150px;
  background-color:#4ca08b;
  color:white;
}
#boxleft {
  padding:50px;
  margin-top:-50px;
  border-radius: 25px;
  border: 3px solid #4ca08b;
  border-radius: 10px;
  background-color: #4ca08b;
}
#boxcontact {
  width: 90%;
  height:auto;
  min-height:280px;
  border: 3px solid #4ca08b;
  border-radius: 10px;
}
#boxpayment {
  width: 90%;
  border-radius: 25px;
  border: 3px solid #4ca08b;
  border-radius: 10px;
  min-height: 100px;
  height: auto;
}
#changepw {
  margin-left:-20px;
  margin-top:-10px;
  margin-bottom:55px;
}
#signoutbutton {
  margin-left:-23px;
}
#buttonsign {
  background-color:#4ca08b;
  color:white;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
ul {
  margin-top: 100px;
  padding: 0;
  list-style-type: none;
}
li {
  margin-top: 25px;
}
.ul2 {
  list-style-type: none;
}
#contact {
  display: flex;
  font-family: 'Nunito';
  font-size: 50px;
}
#profilepic{
  border-radius: 50%;
  margin-top:-20px;
}
#initials{
  border: 5px solid black;
  border-radius: 50%;
  text-align:center;
  font-size:100px;
  color:black;
  margin-top:-30px;
  width:130px;
  height:130px;
  font-family: 'Nunito';
  font-weight: bold;
}
#profilebtn{
  margin-top:-100px;
  float:left;
  font-size:10px;
  width:120px;
  height:30px;
  color:black;
  background-color:white;
  border: 2px solid #4ca08b;
}
#innerbutton{
  margin-top:60px;
  margin-right:3vw;
  height: 60px;
  width: 15%;
  font-weight: bold;
  background-color: white;
  color:black;
  font-family: 'Nunito';
  font-size: 0.8vw;
  border-radius: 10px;
  border: 2px solid #4ca08b;
}
button {
  height: 70px;
  width: 70%;
  background-color:#4ca08b;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border: 10px solid white;
  border-width: 1px;
  text-align:center;
  font-family: 'Nunito';
  font-size: 1vw;
}
#left {
  float:left;
  width:20%;
  margin-left:60px;
  padding-top:50px;
}
#right {
  float:right;
  width:70%;
  padding-top:50px;
}
#name{
  text-align:left;
  color: black;
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 40px;
  margin-left:-150px;
  margin-top:10px;
  height:170px;
}
#mycontactdetails{
  color:black;
  text-align:left;
  padding-left:100px;
}
#icon{
  float:left;
  margin-top:-50px;
  width:20%;
}
#details{
  float:left;
  text-align:left;
  width:60%;
  color:black;
  font-size:15px;
  margin-top:-50px;
  font-family: 'Nunito';
  padding-right:200px;
}
#invoice{
  font-size:15px;
  padding-left:100px;
  font-weight:bold;
  font-family: 'Nunito';
}
#date{
  font-size:15px;
  padding-left:100px;
  font-weight:bold;
  font-family: 'Nunito';
  margin-top:-20px;
}
#purchasedetails{
  font-size:15px;
  padding-left:50px;
  text-align:left;
  font-family: 'Nunito';
}
#leftdetails{
  width:60%;
  float:left;
}
#rightdetails{
  width:40%;
  float:right;
  padding-top:50px;
  color:'#4ca08b';
}
</style>
