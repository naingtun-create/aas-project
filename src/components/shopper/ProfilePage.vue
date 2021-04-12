<template>
  <div id="profilepage">
    <shopper-header></shopper-header>
    <br><br><br>
    <div id="left">
      <v-avatar size="200" v-on:click="toggleUploadDialog">
        <span v-if="!this.profileURL" id="initials">{{this.initials}}</span>
        <img  v-else :src="this.profileURL">
      </v-avatar>
      <v-dialog v-model="uploadDialog" transition="dialog-top-transition" max-width="600" persistent >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Upload Your Profile Image</v-toolbar>
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
              height="200"
            >
            <img class="imageUpload" v-show="imageURL != ''" :src="imageURL" />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="uploadImage">
              Upload
            </v-btn>
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
      </v-dialog> <br><br><br>
          <div id="boxleft">
            <h2> Welcome to All About Sustainability.</h2><br><br><br><br>
            <p> "One-stop portal for eco-friendly stores"</p>
            <ul>
              <li>
  
                <v-dialog v-model="editDialog" transition="dialog-top-transition" max-width="600" persistent>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark>Update your Personal Details</v-toolbar>
                      <br>
                      <v-card-text>
                        <v-text-field label="Address" v-model="updateAddress">
                        </v-text-field>
                        <v-text-field label="Postal Code" v-model="updatePostalCode">
                        </v-text-field>
                        <v-text-field label="Phone Number" v-model="updatePhone">
                        </v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="confirmUpdate">Update</v-btn>
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </li>
            </ul>
            <ul>
              <li>
                <button v-on:click="logout">Sign Out
                  <v-icon dark right>mdi-account-remove</v-icon>
                </button><br><br>

              </li>
            </ul>

      </div>
      </div>
    
    <div id="right">
        <h1 id="name">{{ shopperData.fullname }}</h1>
        <div id="boxcontact">
          <h2 id="mycontactdetails">My Contact Details</h2>
          <div id="icon">
            <ul>
              <li><v-icon size=20>mdi-email</v-icon></li>
              <li><v-icon size=20>mdi-map-marker</v-icon></li>
              <li><v-icon size=20>mdi-phone</v-icon></li>
            </ul>
          </div>
          <div id="details">
            <ul>
              <li>{{shopperData.email}}</li>
              <li>{{ shopperData.address + " " + shopperData.postalCode }}</li>
              <li v-show="shopperData.phoneNumber">{{ shopperData.phoneNumber }}</li>
            </ul>
          </div>
          <v-btn id="innerbutton" dark v-on:click="toggleEditDialog">Edit Account
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
      uploadDialog: false,
      editDialog: false,
    };
  },
  components: {
    transactionDetails
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
      this.toggleDialog();
      this.reset();
      //this.$forceUpdate();
      //location.reload();
    },
    uploadImage: async function() {
      //Putting it in the storage
      try {
        
        //Reference to the storage
        var storageRef = firebase.storage().ref("ProfilePics/" + this.id);

        //Waiting till it uploaded to firebase storage
        await storageRef.put(this.image);
        var _extension = this.image.name.split(".")[1];

        //Update the metadata to be uploaded as image
        var newMetadata = {
          contentType: "image/" + _extension,
        };

        await storageRef.updateMetadata(newMetadata);

        //Retrieving the download URL for the product Image
        await storageRef
          .getDownloadURL()
          .then(async function(url) {
            //Add it into the database
            await db
              .collection("shoppers")
              .doc(this.id)
              .update({
                profilePic: url.toString(),
              });
            console.log("success");
          })
          .then(this.close(), alert("Uploaded Successfully!"));
      } catch (e) {
        console.log(e);
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

      console.log(this.shopperData);
    },
    generateInitials() {
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
        })
        .catch((e) => {
          console.log(e);
        });

      alert("Update Successful");

      location.reload();
    },
  },
  watch: {
    shopperData: function() {
      this.updateAddress = this.shopperData.address;
      this.updatePhone = this.shopperData.phoneNumber;
      this.updatePostalCode = this.shopperData.postalCode;
    },
  },
  created() {
    var user = firebase.auth().currentUser;
    this.id = user.uid;
    this.fetchData();
    console.log(this.purchaseHistory);
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
}
h1 {
  text-align: left;
  padding-left: 150px;
  color: #c9AA88;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 30px;
}
h2 {
  margin: -20px;
  font-size: 25px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-top: 35px;
  color:white;
}
p{
  color:black;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
}
#boxleft {
  padding:50px;
  margin-top:-70px;
  border-radius: 25px;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #c9AA88;
}

#boxcontact {
  width: 90%;
  height:270px;
  border: 3px solid #c9AA88;
  border-radius: 10px;
}
#boxpayment {
  width: 90%;
  border-radius: 25px;
  border: 3px solid #c9AA88;
  border-radius: 10px;
  min-height: 100px;

  height: auto;
}

/* Clear floats after the columns */
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
  font-family: 'Montserrat', sans-serif;
  font-size: 50px;
}
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
#initials{
  border: 5px solid #c9AA88;
  border-radius: 50%;
  text-align:center;
  font-size:100px;
  color:#c9AA88;
  margin-top:-70px;
  width:130px;
  height:130px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
#innerbutton{
  margin-top:60px;
  margin-right:40px;
  height: 60px;
  width: 15%;
  font-weight: bold;
  background-color: white;
  color:black;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  border-radius: 10px;
  border: 2px solid #c9AA88;
}
button {
  height: 70px;
  width: 150px;
  background-color: #c9AA88;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border: 10px solid white;
  border-width: 1px;
  text-align:center;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
}
#left {
  float:left;
  width:20%;
  margin-left:60px;
}
#right {
  float:right;
  width:70%;
}
#name{
  text-align:left;
  color: #c9AA88;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 40px;
  margin-left:-100px;
  margin-top:10px;
  height:170px;
}
#mycontactdetails{
  color:#c9AA88;
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
  font-family: 'Montserrat', sans-serif;
  padding-right:200px;
}
#invoice{
  font-size:15px;
  padding-left:100px;
  font-weight:bold;
  font-family: 'Montserrat', sans-serif;
}
#purchasedetails{
  font-size:15px;
  padding-left:50px;
  text-align:left;
  font-family: 'Montserrat', sans-serif;
}
#leftdetails{
  width:60%;
  float:left;

}
#rightdetails{
  width:40%;
  float:right;
  padding-top:50px;
}

</style>
