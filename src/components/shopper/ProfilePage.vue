<template>
  <div id="profilepage">
    <shopper-header></shopper-header>
    <br />
    <h1>Welcome to your AAS Account!</h1>
    <v-avatar size="170" v-on:click="toggleUploadDialog">
      <span v-if="!this.profileURL" class="white--text headline">{{
        this.initials
      }}</span>
      <img v-else :src="this.profileURL" />
    </v-avatar>
    <v-dialog
      v-model="uploadDialog"
      transition="dialog-top-transition"
      max-width="600"
      persistent
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Upload Your Profile Image</v-toolbar>
          <br />
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
            <img
              v-show="imageURL == ''"
              src="../../assets/DummyImage.png"
              height="200"
            />
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
    </v-dialog>
    <div class="row">
      <div id="column1">
        <div id="content1">
          <div id="box1">
            <h2>View</h2>
            <ul>
              <li>
                <v-btn
                  class="ma-2"
                  color="#20d3bb"
                  v-on:click="
                    $router.push({ path: '/shopper/purchasehistory' })
                  "
                  dark
                >
                  Purchase History
                  <v-icon dark right>mdi-history</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn
                  class="ma-2"
                  color="#20d3bb"
                  v-on:click="$router.push({ path: '/shopper/payment' })"
                  dark
                >
                  Cart
                  <v-icon dark right>mdi-cart</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark
                  >My Likes
                  <v-icon dark right>mdi-thumb-up</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark
                  >My Vouchers
                  <v-icon dark right>mdi-ticket-percent</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark
                  >Funded Kickstarters
                  <v-icon dark right>mdi-cash-refund</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn class="ma-2" color="#20d3bb" dark
                  >Payment Details
                  <v-icon dark right>mdi-credit-card</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn
                  class="ma-2"
                  color="#20d3bb"
                  dark
                  v-on:click="toggleEditDialog"
                  >Account Settings
                  <v-icon dark right>mdi-account-cog</v-icon>
                </v-btn>
                <v-dialog
                  v-model="editDialog"
                  transition="dialog-top-transition"
                  max-width="600"
                  persistent
                >
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark
                        >Update your Personal Details</v-toolbar
                      >
                      <br />
                      <v-card-text>
                        <v-text-field label="Address" v-model="updateAddress">
                        </v-text-field>
                        <v-text-field
                          label="Postal Code"
                          v-model="updatePostalCode"
                        >
                        </v-text-field>
                        <v-text-field
                          label="Phone Number"
                          v-model="updatePhone"
                        >
                        </v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="confirmUpdate">
                          Update
                        </v-btn>
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </li>
            </ul>
            <ul>
              <li>
                <v-btn class="ma-2" color="red" v-on:click="logout" dark
                  >Sign Out
                  <v-icon dark right>mdi-account-remove</v-icon>
                </v-btn>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="column2">
        <h1 id="h1col2">{{ shopperData.fullname }}</h1>
        <div id="box2">
          <h2>My Contact Details</h2>

          <ul>
            <li>
              <div id="li2">
                <v-icon>mdi-email</v-icon>
                <h4>{{ shopperData.email }}</h4>
              </div>
            </li>
            <li>
              <div id="li2">
                <v-icon>mdi-map-marker</v-icon>
                <h4>
                  {{ shopperData.address + " " + shopperData.postalCode }}
                </h4>
              </div>
            </li>
            <li v-show="shopperData.phoneNumber">
              <div id="li2">
                <v-icon>mdi-phone</v-icon>
                <h4>
                  {{ shopperData.phoneNumber }}
                </h4>
              </div>
            </li>
          </ul>
        </div>

        <div id="box3">
          <h2>Purchase History</h2>
          <v-list >
            <br>
            <v-list-item v-for="(purchase,id) in purchaseHistory" :key="id">

        
              <v-list width="100%" subheader>
                <v-subheader>{{purchase.PaymentInvoice}}</v-subheader>
                <v-list-item v-for="(product,id) in purchase.Products" :key="id">
                  
                  <v-list-item-avatar tile size="100px"> 
                    <v-img :alt="`${product.title}`" :src="product.image" ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="product.title"></v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
                
                <v-list-item-action right> 
                  <transaction-details :purchase="purchase"/>
                </v-list-item-action>
                <v-divider></v-divider>
              </v-list>
     
            </v-list-item>
          </v-list>
        </div>
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
}
h1 {
  text-align: left;
  padding-left: 150px;
  color: rgb(8, 8, 8);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
}
#h1col2 {
  text-align: left;
  padding-left: 500px;
  color: rgb(8, 8, 8);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
  padding-top: 50px;
}
h2 {
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top: 75px;
  color: rgb(8, 31, 37);
}
h3 {
  text-align: left;
  padding-left: 100px;
  font-size: 20px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top: 25px;
  color: rgb(6, 7, 7);
}
h4 {
  font-size: 20px;
  font-family: Nunito;
  font-weight: normal;
  
}
#column1 {
  width: 30%;
}
#box1 {
  outline-style: solid;
}
#content1 {
  width: 500px;
  padding-left: 100px;
}
#column2 {
  float: left;
  width: 70%;
}
#box2 {
  outline-style: solid;
  width: 1600px;
}
#box3 {
  outline-style: solid;
  width: 1600px;
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
#li2 {
  display: flex;
}
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

</style>
