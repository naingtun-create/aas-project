<template>
    <div id="transactiondetails">
        <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            max-width="600"
        >
            <template v-slot:activator="{ on, attrs }">
                <button v-bind="attrs" v-on="on"  dark>
                    View More Details
                    <v-icon dark right>mdi-account-details</v-icon>
                </button>
            </template>
            <template v-slot:default="dialog">
                <v-card width="100%">
                    <v-toolbar color="#c9AA88" dark>{{"Invoice: " + purchase.PaymentInvoice + "'s Details"}}</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <ul>
                                <li v-for="(product,id) in purchase.Products" :key="id">
                                    <div class="d-lg-flex flex-no-wrap">
                                        <v-avatar class="ma-3" size="200" tile>
                                            <v-img height="200" v-bind:src="product.image"></v-img>
                                        </v-avatar>
                                        <div id="productInfo">
                                            <h1>{{ product.title }}</h1><br>
                                            <p v-for="color in product.colors" :key="color.id">{{color}}</p>
                                            <p>Cost: ${{ product.totalPrice }}</p>
                                        </div>
                                    </div>
                                    <br>
                                    <v-divider></v-divider>
                                </li>
                            </ul>
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
export default {
    props: ["purchase"],
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog;
        },
    },
};
</script>

<style scoped>
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 500px;
  text-align: center;
  padding: 10px;
  margin: 10px;
}
button {
  height: 70px;
  width: 200px;
  background-color: #c9AA88;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border-width: 1px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
}
h1 {
  color: #c9AA88;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 25px;
  margin-left:50px;
  text-align:center;
  line-height: 150%;
}
p {
  margin-left:50px;
}
</style>
