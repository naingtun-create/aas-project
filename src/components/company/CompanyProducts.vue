<template>
<div id="companyproducts">
    <company-header></company-header>
    <div id='content'>
        <h1>Our Products</h1>
        <h3>Share your products with our community!</h3>
        <NewProductForm v-bind:companyData="companyData"></NewProductForm>
        <ProductDisplay></ProductDisplay>
        <br>
    </div>
</div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'
import ProductDisplay from "./ProductDisplay.vue"
import firebase from "firebase";
import db from "../../firebase.js";

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
        ProductDisplay: ProductDisplay
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog;
        },
        close: function() {
            this.reset();
            this.toggleDialog();
            location.reload();
        },
        uploadImage: async function() {
            var k = this.id;
            try {
                var storageRef = firebase.storage().ref("ProfilePics/" + k );
                await storageRef.put(this.image);
                var _extension = this.image.name.split(".")[1];
                var newMetadata = {
                    contentType: 'image/' + _extension
                };
                await storageRef.updateMetadata(newMetadata);
                await storageRef.getDownloadURL().then( async function(url) {
                        await db.collection("company")
                        .doc(k)
                        .update({
                            "profilePic" : url.toString()
                        });
                }).then(
                    alert("Uploaded Successfully!"),
                    this.close(),
                ).catch (e => {
                    console.log(e);
                });
            } catch (e) {
                console.log(e);
            }
        },
        onFilePicked: function() {
            var reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onload = () => {
                this.imageURL = reader.result;
            }
        },
        reset: function() {
            this.imageURL = '';
            this.image = [];
        },
        fetchData: async function() {
            var user = firebase.auth().currentUser;
            var k = user.uid;
            await db.collection("company").doc(k).get().then((doc) => {
                var data = {};
                data = doc.data();
                this.companyData.push(data);
                if (typeof this.companyData[0].profilePic !== 'undefined') {
                    this.profileURL = this.companyData[0].profilePic;
                }
            })
        }
    },
    created() {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
        this.fetchData();
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");
h1 {
    font-family:Nunito;
}
h3 {
    text-align: left;
    padding-left: 65px;
    font-family:Nunito;
}
#content{
    padding-top:100px;
}
</style>