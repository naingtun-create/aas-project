<template>
  <div id="errorpreventiondialog">
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          max-width="600"
          persistent
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small color="red lighten-2" dark v-bind="attrs" v-on="on">
            Delete
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="#c9AA88" dark>{{"Delete " + itemName}}</v-toolbar>
            <br/>
            <v-card-text>
              <h2>Are you sure?</h2>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="deleteItem">Yes</v-btn>
              <v-btn text @click="dialog.value = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase.js";

export default {
  props: ["itemName", "itemID", "type"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
      deleteItem: async function() {
        var user = firebase.auth().currentUser;
        var k = user.uid;
        var storageRef = null;
        if (this.type == "activities") {
          storageRef = firebase.storage().ref("ActivityImages/"+ k + "/" + this.itemID); 
        } else {
          storageRef = firebase.storage().ref("ProductImages/"+ k + "/" + this.itemID); 
        }
        await db.collection(this.type).doc(this.itemID).delete().then(async function() {
            await storageRef.delete();
        }).catch((e) => {
            console.log(e);
        })
          this.dialog = false;
          console.log("Deleted");
          alert("Deleted Successfully!");
          location.reload();
      }
  }
};
</script>
