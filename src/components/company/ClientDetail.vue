<template>
  <div id="clientdetail">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small depressed outlined color="indigo" v-bind="attrs" v-on="on" v-on:click="route(item.id)">
            View Customer Details
            <v-icon dark right>mdi-account-details</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card width="100%">
          <v-toolbar color="#4ca08b" dark><p id="details"><b>Client Name:</b> {{client.name}}</p></v-toolbar>
          <v-card-text>
            <v-container>
              <div id="productInfo">
                <br/>
                <p><b>ADDRESS:</b> {{client.address}}</p>
                <p><b>POSTAL CODE:</b> S{{client.postal}}</p>
                <p><b>CONTACT:</b> {{client.contact}}</p>
                <p><b>EMAIL:</b> {{client.email}}</p>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import db from '../../firebase.js'

export default {
  name: "ClientDetail",
  data() {
    return {
      dialog: false,
      client:{},
    };
  },
  props: {
    clientID: {type: String},
  },
  methods: {
    toggleDialog: function() {
      this.dialog = !this.dialog;
    },
    fetchItems: async function() {
      await db.collection('shoppers').doc(this.clientID).get().then(doc => {
        var details = doc.data();
        var customer = {
            "name": details.fullname,
            "address":details.address + " " + details.unitNo,
            "postal":details.postalCode,
            "contact": details.phoneNumber,
            "email":details.email,
            "orderID":doc.id,
        };
        this.client = customer;
      });
    },
  },
  created() {
    this.fetchItems();
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");

#details {
  font-family: Nunito;
}
</style>