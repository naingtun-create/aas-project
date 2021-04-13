<template>
<div id="companyactivities">
    <company-header></company-header>
    <h1>Our Activities</h1>
    <h3>Promote your activites for our community to support!</h3>
    <NewActivityForm v-bind:companyID="this.id" v-bind:companyname="this.companyData[0].companyname"></NewActivityForm>
    <br/>
    <DisplayActivity v-bind:companyID="this.id"></DisplayActivity>
    <br/>
</div>
</template>

<script>
import NewActivityForm from './Profile_Components/NewActivityForm.vue'
import firebase from "firebase";
import db from "../../firebase.js";
import DisplayActivity from './Profile_Components/DisplayActivity.vue'


export default {
    name: "companyPage",
    data: () => {
        return {   
            id:"",
            companyData: [],
        }
    },
    components: {
        NewActivityForm: NewActivityForm,
        DisplayActivity: DisplayActivity,
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog
        },
        close: function() {

            this.toggleDialog();
            //location.reload()
            
        },

        fetchData: async function() {
            var user = firebase.auth().currentUser;
            var k = user.uid;

            await db.collection("company").doc(k).get().then((doc) => {
                var data = {};
                data = doc.data();
                this.companyData.push(data);

                if (typeof this.companyData[0].profilePic !== 'undefined') {
                    this.profileURL = this.companyData[0].profilePic
                }
                console.log(this.profileURL)
            })
            
        }
    },
    created () {
        var user = firebase.auth().currentUser;
        this.id = user.uid;
        this.fetchData();
    }
}
</script>

<style scoped>
h3 {
    text-align: left;
    padding-left: 65px;
}
</style>