<template>
<div id="NewProductForm">
    <v-card> 
        <v-card-title class="headline grey lighten-2">
            Add a new product
        </v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="submitHandler" lazy-validation>
                <v-text-field v-model="name" :counter="80" label="Name" required outlined></v-text-field>
                <v-textarea v-model="description" label="Description" required outlined></v-textarea>
                <v-text-field v-model="price" type="number" :rules="priceRules" label="Price" required outlined></v-text-field>
                <v-file-input label="Photo" truncate-length="15" outlined></v-file-input>
                <v-btn color="success" type="submit" class="mr-4">Submit</v-btn>
                <v-btn color="error" class="mr-4" v-on:click="reset">Reset Form</v-btn>
            </v-form>
        </v-card-text>
 
    </v-card>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
    name: "NewProductForm",
    data: () => {
        return {
            valid: false,
            name: "",
            description: "",
            price: 0,
            priceRules: v => {
                var t = v.value;
                v.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
            },
            photo: ""
            
        }
    },
    methods: {
        addProduct: function() {
            if(this.name == "" || this.description == "" || this.price == 0 ){
                alert("Inputs required in order to sign up.")
            } else{
                var product = {
                    "name":this.name,
                    "description": this.description,
                    "price": this.price,
                }
                db.collection('products').add(product).then( () => {
                if(this.selectedCompany){
                    this.$router.push({ path: 'signUpSuccessful' })
                } else{
                    this.alert=!this.alert
                }
                
                })
            }
        },
        reset: function()  {
            console.log("reset")
            this.$refs.form.reset()
        },
        submitHandler: function() {
           if(this.$refs.form.validate()) {
               alert(this.$refs.form.validate())
               alert("success")
           } else {
               alert("unsuccessful")
           }
        }
    }
}
</script>

