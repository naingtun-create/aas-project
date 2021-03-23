<template>
   <div id="CompanySignUpPage">
       <v-card-title>Get started with All About Sustainability!</v-card-title>
       <v-card-text>
           <v-form @submit.prevent="register">
               <v-text-field
               type="email"
               label="Email address..."
               v-model="email"></v-text-field>
               <v-text-field
                label="Full Name"
                v-model="fullName"
               > 
               </v-text-field>
               <v-text-field
               type="password"
               label="Password..."
               v-model="password"></v-text-field>
               <v-btn
                color="#B3E5FC"
                class="mr-4"
                type="submit">Register</v-btn>
               </v-form>
               </v-card-text>

               <p>Already have account?</p>
        <v-btn x-large v-on:click = "$router.push('companylogin')" color="blue"> Login </v-btn>
</div> 
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../firebase.js';


export default {
    name: 'Register',
    data() {
        return {
            fullName: '',
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {

                    const user = firebase.auth().currentUser;
                    
                    user.updateProfile({
                        displayName: this.fullName
                    }).then(() => {
                        db.collection('users').doc(user.uid).set({
                            fullname: this.fullName,
                            email: this.email,
                            type: "Company"
                        })
                    }).then(()=> {
                        this.$router.push('home');
                    }).catch(error => {
                        alert(error.message)
                    })
                    
                    //const actionCodeSettings = {
                      //  url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
                        //};
                    user.sendEmailVerification();
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>