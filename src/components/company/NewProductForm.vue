<template>
  <div id="newproductform">
    <v-dialog v-model="dialog" persistent width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          New Product Listing
        </v-btn>
      </template>
      <v-card>
        <br><br>
        <v-toolbar
          color="#4ca08b"
          dark
          class="headline"
        >Add a New Product!</v-toolbar>
        <div id="content">
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="title" :counter="80" label="Name" required outlined></v-text-field>
            <v-textarea v-model="description" label="Description" required outlined></v-textarea>
            <v-text-field v-model="price" type="number" label="Price" required outlined></v-text-field>
            <v-select v-model="selectedCategory" :items="categories" filled label="Category" dense></v-select>
            <v-textarea v-model="sizeguide" label="Size Guide (e.g. M: Chest 38-40inches)" required outlined></v-textarea>
            <v-combobox v-model="sizings" :items="sizes" label="Indicate your sizes available" multiple></v-combobox>
            <v-combobox v-model="colors" :items="colorsTemplate" :search-input.sync="search" hide-selected label="Colors of Product" multiple persistent-hint small-chips>
              <template v-slot:no-data>
                <v-list-item-title>
                  No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </template>
            </v-combobox>
            <br/>
            <v-file-input accept="image/*" label="Product Image" truncate-length="15" type="file" v-model="image" outlined @change="onFilePicked"></v-file-input>
            <img :src="imageURL" height="150"/>
            <br/>
            <v-btn color="success" v-on:click="addProduct()" class="mr-4">Submit</v-btn>
            <v-btn color="error" class="mr-4" v-on:click="reset">Reset Form</v-btn>
            <v-btn class="mr-4" v-on:click="close">Close</v-btn>
          </v-form>
        </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../../firebase.js";
import firebase from "firebase";

export default {
  name: "NewProductForm",
  data() {
    return {
      dialog: false,
      valid: false,
      title: "",
      description: "",
      sizeguide: "",
      price: 0,
      selectedCategory: "",
      image: [],
      imageURL: "",
      categories: ["ACCESSORY", "CLEANING", "CLOTHING", "FOOD and DRINK"],
      sizes: ["XS", "S", "M", "L", "XL", "N.A"],
      sizings: [],
      colorsTemplate: ["Red", "Blue", "White", "Black"],
      colors: [],
      date: new Date().toISOString().substr(0, 10),
      search: null,
    };
  },
  props:{
    companyData: {
      type: Array,
    },
  },
  methods: {
    addProduct: async function() {
      var user = firebase.auth().currentUser;
      if ( this.title == "" || this.description == "" ||this.price == 0 ||this.selectedCategory == "" ||this.image == "") {
        alert("Inputs required in order to post product.");
      } else {
        var k = db.collection("products").doc().id;
        var product = {
          company: user.uid,
          companyname:this.companyData[0].companyname,
          title: this.title,
          description: this.description,
          price: this.price,
          image: [],
          sizeguide: this.sizeguide,
          sizings: this.sizings,
          category: this.selectedCategory,
          colors: this.colors,
          date: this.date,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        try {
          var storageRef = firebase.storage().ref("ProductImages/" + user.uid + "/" + k);
          await storageRef.put(this.image);
          var _extension = this.image.name.split(".")[1];
          var newMetadata = {
              contentType: 'image/' + _extension
          };
          await storageRef.updateMetadata(newMetadata);
          await storageRef.getDownloadURL().then(function(url) {
              product.image = url.toString();
          });
          await db.collection("products")
            .doc(k)
            .set(product)
            .then(() => {
              console.log("product added");
              alert("Product Added");
              this.close();
              location.reload();
            });
        } catch (e) {
          console.log(e);
        }
      }
    },
    reset: function() {
      console.log("reset");
      this.$refs.form.reset();
      this.imageURL="";
    },
    close: function() {
      console.log("close dialog");
      this.reset();
      this.dialog = false;
    },
    onFilePicked: function() {
      var reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
          this.imageURL = reader.result;
      }
    }
  },
};
</script>

<style scoped>
#newproductform {
  margin-top:-20px; 
}
#content {
  padding: 3%
}
</style>
