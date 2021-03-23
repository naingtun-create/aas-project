<template>
<div id="NewProductForm">
    <v-dialog v-model="dialog" persistent width="600px">
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          New Product Listing
        </v-btn>
      </template>
        <v-card> 
            <v-card-title class="headline grey lighten-2">
                Add a new product!
            </v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation>
                    <v-text-field v-model="title" :counter="80" label="Name" required outlined></v-text-field>
                    <v-textarea v-model="description" label="Description" required outlined></v-textarea>
                    <v-text-field v-model="price" type="number" :rules="priceRules" label="Price" required outlined></v-text-field>
                    <v-select v-model="selectedCategory" :items="categories" filled label="Category" dense></v-select>
                    <v-textarea v-model="sizeguide" label="Size Guide (e.g. M: Chest 38-40inches)" required outlined></v-textarea>
                    <v-combobox v-model="select" :items="sizes" 
                    label="Indicate your sizes available" multiple></v-combobox>
                    <v-file-input label="Product Image" v-model="image" truncate-length="15" outlined></v-file-input>
                    <v-btn color="success" v-on:click="addProduct" class="mr-4">Submit</v-btn>
                    <v-btn color="error" class="mr-4" v-on:click="reset">Reset Form</v-btn>
                    <v-btn class="mr-4" v-on:click="close">Close</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
    name: "NewProductForm",
    data: () => {
        return {
            dialog: false,
            valid: false,
            title: "",
            description: "",
            sizeguide:'',
            price: 0,
            priceRules: v => {
                var t = v.value;
                v.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
            },
            selectedCategory:"",
            categories:['ACCESSORY', 'CLEANING', 'CLOTHING','FOOD & DRINK'],
            sizes:['XS','S','M','L','XL']
        }
    },
    methods: {
        addProduct: function() {
            console.log(this.title)
            if(this.title==""|| this.description==""||this.price==0){
                alert("Inputs required in order to sign up.")
            } else{
                var product = {
                    "company": "SLUSHIE",
                    "title":this.title,
                    "description": this.description,
                    "price": this.price,
                    "image": this.image
                }
                db.collection('products').add(product).then( () => {
                    this.$refs.form.reset();
                    console.log("product added");
                    alert("Product Added")
                    this.dialog = false;
                })
            }
        },
        reset: function()  {
            console.log("reset")
            this.$refs.form.reset();
        },
        close: function() {
            console.log("close dialog");
            this.reset();
            this.dialog = false;
        }
    }
}
</script>

