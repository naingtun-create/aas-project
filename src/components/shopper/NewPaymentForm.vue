<template>
    <div id="NewPaymentForm">
        <v-dialog v-model="dialog" persistent width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn id='button' color = "#4ca08b" outlined rounded x-large v-bind="attrs" v-on="on">Confirm Payment</v-btn>
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
                            :rules="[rules.required, rules.min]"
                            label="Payment Invoice Number"
                            required
                            outlined
                            minlength = 20
                            maxlength = 20
                            hint="Invoice contains 20 digits"
                        ></v-text-field>
                        <br>
                        <p id="paidAmount"> Paid Amount: <b>${{paidPrice}}</b></p>
                        <br><br>
                        <v-btn color="success" v-on:click="addPayment()" class="mr-4">Confirm Payment</v-btn>
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
            complete:[],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 20 || '20 digits Required',
            },
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

            var order = { 
                "Products": this.purchasedItems,
                "PaymentInvoice": this.invoice,
                "PaidAmount":this.paidPrice,
                "UserID": user.uid,       
                "Date": this.date,
                "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                "completed":this.complete
            }
            db.collection('transactions').add(order).then(()=>{this.reset();})

            db.collection('cart').doc(user.uid).delete().then(() => location.reload())
        }

    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#paidAmount {
  font-size: 30px;
  background-color: #ffcccc;
  padding:10px;
  text-align: start;
  border-width: 20px;
}
button {
  height: 40px;
  width:80%;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border: 10px solid #4ca08b;
  border-width: 1px;
  text-align:center;
  margin-left:2.8vw;
  margin-top:1.8vw;
  font-family: 'Nunito';
  font-size: 0.8vw;
}
</style>