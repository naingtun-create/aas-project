<template>
   <div id="SignUpPage">
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#SignUpPage{
    position: relative;
    background-size: cover;
    background-image: url("https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80");
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
}
</style>