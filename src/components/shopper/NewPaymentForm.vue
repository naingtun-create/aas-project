<template>
  <div id="NewPaymentForm">
    <v-dialog v-model="dialog" persistent width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-2 mt-5" color = "#4000ff" outlined rounded x-large v-bind="attrs" v-on="on">Confirm Payment</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Payment Confirmation
        </v-card-title>
        <br><br>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="invoice"
              label="Payment Invoice Number"
              required
              outlined
            ></v-text-field>
            <br>
            <p id="paidAmount"> Paid Amount: <b>${{paidPrice}}</b></p>
            <br><br>
            <v-btn color="success" v-on:click="addPayment()" class="mr-4"
              >Confirm Payment</v-btn
            >
            <v-btn class="mr-4" v-on:click="close">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../../firebase.js'
import firebase from 'firebase'

export default {
  name: "NewProductForm",
  data() {
    return {
      dialog: false,
      valid: false,
      invoice: "",
      purchasedItems:[],
      date: new Date().toISOString().substr(0, 10),
      complete:[]
    };
  },
  props: {
    paidPrice: {type: Number},
    paidItems: {type: Array}
  },
  methods: {
    close: function() {
      this.dialog = false;
    },
    reset: function() {
      this.$refs.form.reset();
    },
    addPayment:function(){
      this.purchasedItems = this.paidItems
      var user = firebase.auth().currentUser;
      var features = []
      for(var i in this.paidItems){
        var item = this.paidItems[i].colors
        for(var j in item){
          var string = item[j][0] + " | " + item[j][1] + " | " + item[j][2]
          features.push(string)
        }    
        this.purchasedItems[i].colors = features
        this.complete.push(false)
        features = []
      }

      console.log(this.paidItems)
      var order = { //create java object with key value pairs
        "Products": this.purchasedItems,
        "PaymentInvoice": this.invoice,
        "PaidAmount":this.paidPrice,
        "UserID": user.uid,       
        "Date": this.date,
        "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
        "completed":this.complete
      }
      db.collection('transactions').add(order).then(()=>{
        console.log("payment added");
        this.reset();
        
      })
      //console.log(this.paidItems)

      db.collection('cart').doc(user.uid).delete().then(() => location.reload())
    }

  },
};
</script>

<style scoped>
#paidAmount {
  font-size: 30px;
  background-color: #ffcccc;
  padding:10px;
  text-align: start;
  border-width: 20px;
}
</style>