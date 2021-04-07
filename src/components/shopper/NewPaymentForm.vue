<template>
  <div id="NewPaymentForm">
    <v-dialog v-model="dialog" persistent width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-2 mt-5" color = "#4000ff" outlined rounded x-large v-bind="attrs" v-on="on">Make Payment</v-btn>
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
            <v-btn color="success" v-on:click="addProduct()" class="mr-4"
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

export default {
  name: "NewProductForm",
  data() {
    return {
      dialog: false,
      valid: false,
      invoice: "",
    };
  },
  props: {
    paidPrice: {type: Number}
  },
  methods: {
    close: function() {
      this.dialog = false;
    },

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