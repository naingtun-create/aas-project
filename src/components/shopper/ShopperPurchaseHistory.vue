<template>
  <div id="purchasehistory">
    <shopper-header></shopper-header>

    <h2 id="title">Purchase History</h2>
    <v-list>
      <br />
      <v-list-item v-for="(purchase, id) in purchaseHistory" :key="id">
        <v-list width="100%" subheader>
          <v-subheader>{{ purchase.PaymentInvoice }}</v-subheader>
          <v-list-item v-for="(product, id) in purchase.Products" :key="id">
            <v-list-item-avatar tile size="100px">
              <v-img :alt="`${product.title}`" :src="product.image"></v-img>
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
</template>

<script>
import transactionDetails from "./TransactionDetails.vue"
import firebase from "firebase";
import db from "../../firebase.js";

export default {
  data() {
    return {
      id: "",
      dialog: false,
      purchaseHistory: [],
    };
  },
  methods: {
    fetchData: async function() {
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
  },
  components: {
      transactionDetails
  },
  created() {
    var user = firebase.auth().currentUser;
    this.id = user.uid;
    this.fetchData();
  },
};
</script>

<style scoped>
#title{
  text-align:left;
  color: #c9AA88;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 100px;
  margin-top:150px;
  height:300px;
}
</style>
