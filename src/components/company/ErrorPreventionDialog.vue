<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Delete
        </v-btn>
      </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark
              >{{"Delete " + productName}}</v-toolbar>
            <br />
            <v-card-text>
                <h2>Are you sure?</h2>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="deleteProduct">Yes</v-btn>
              <v-btn text @click="dialog.value = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase.js";

export default {
  props: ["productName", "productID"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
      deleteProduct: async function() {

        var user = firebase.auth().currentUser;
        var k = user.uid;

        var storageRef = firebase.storage().ref("ProductImages/"+ k + "/" + this.productID );   
        
        await db.collection("products").doc(this.productID).delete().then(async function() {

            await storageRef.delete()

        }).catch((e) => {
            console.log(e)
        })
          this.dialog = false
          console.log("Deleted")
          alert("Deleted Successfully!")

          location.reload()
      }
  }
};
</script>
