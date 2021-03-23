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
               type="password"
               label="Password..."
               v-model="password"></v-text-field>
               <v-btn
                color="#B3E5FC"
                class="mr-4"
                @click="submit" type="submit">Register</v-btn>
               </v-form>
               </v-card-text>

               <p>Already have account?</p>
        <v-btn x-large v-on:click = "$router.push('login')" color="blue"> Login </v-btn>
</div> 
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Register',
    data() {
        return {
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