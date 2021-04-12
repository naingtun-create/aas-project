<template>
<div id="companyproducts">
    <company-header></company-header>
    <h1>Our Products</h1>
    <br/>
    <ProductDisplay></ProductDisplay>
    <br/>
    <NewProductForm v-bind:companyData="companyData"></NewProductForm>

</div>
</template>

<script>
import NewProductForm from './Profile_Components/NewProductForm.vue'
//import NewActivityForm from './Profile_Components/NewActivityForm.vue'
import ProductDisplay from "./Profile_Components/ProductDisplay.vue"
import firebase from "firebase";
import db from "../../firebase.js";
//import ActivityDisplay from './Profile_Components/ActivityDisplay.vue';

export default {
    name: "companyPage",
    data: () => {
        return {   
            id:"",
            dialog: false,
            image: [], 
            imageURL: "",
            profileURL: '',
            companyData: [],
            products: []
        }
    },
    components: {
        NewProductForm: NewProductForm,
        //NewActivityForm: NewActivityForm,
        //ActivityDisplay: ActivityDisplay,
        ProductDisplay: ProductDisplay
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog
        },
        close: function() {
            this.reset();
            this.toggleDialog();
            //this.$forceUpdate();
            //location.reload()
            
        },
        uploadImage: async function() {

        var k = this.id;
          

        //Putting it in the storage
        try {
            //Its is place ProductImages => CompanyId
            //Reference to the storage
            var storageRef = firebase.storage().ref("ProfilePics/" + k );

            //remember to add the delete or update storage to check first
            
            //Waiting till it uploaded to firebase storage
            await storageRef.put(this.image)
            var _extension = this.image.name.split(".")[1]

            //Update the metadata to be uploaded as image
            var newMetadata = {
                contentType: 'image/' + _extension
            };

            await storageRef.updateMetadata(newMetadata)

            //Retrieving the download URL for the product Image
            await storageRef.getDownloadURL().then( async function(url) {
                    //Add it into the database
                    await db.collection("company")
                    .doc(k)
                    .update({
                        "profilePic" : url.toString()
                    })

                    console.log(url)
                
            }).then(
                this.close(),
                alert("Uploaded Successfully!")
            ).catch (e => {
                console.log(e)
            });

        } catch (e) {
          console.log(e);
        }
            
        },
        onFilePicked: function() {
            var reader = new FileReader() 
            reader.readAsDataURL(this.image)
            reader.onload = () => {
                this.imageURL = reader.result;
            }
        },
        reset: function() {
            this.imageURL = ''
            this.image = []
        },
        fetchData: async function() {
            var user = firebase.auth().currentUser;
            var k = user.uid;

            await db.collection("company").doc(k).get().then((doc) => {
                var data = {};
                data = doc.data();
                this.companyData.push(data);
                //this.companyData = doc.data();

                if (typeof this.companyData[0].profilePic !== 'undefined') {
                    this.profileURL = this.companyData[0].profilePic
                }
                console.log(this.profileURL)
            })

            var products = await db.collection("products").where("company","==",k).get()
            console.log(products)
            console.log(this.companyData)

        }
    },
    created () {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
        this.fetchData()
        
    }
}
</script>

<style scoped>

</style>