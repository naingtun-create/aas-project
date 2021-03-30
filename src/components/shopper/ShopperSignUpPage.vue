<template>
   <div id="ShopperSignUpPage">
       <h1>All About Sustainability</h1>
       <router-link to="/" exact><v-icon dark right>mdi-home</v-icon></router-link>
       <h2>Shopper's Sign Up Page</h2>
       <br><br>
       <div id="vcard">
           <v-card id="test" width="700">
               <v-card-title>Get started with All About Sustainability!</v-card-title>
               <v-card-text>
                   <v-form @submit.prevent="register">
                       <v-text-field
                       type="email"
                       label="Email address..."
                       v-model="email"></v-text-field>
                       <v-text-field
                       label="Full Name"
                       v-model="fullName"></v-text-field>
                       <v-text-field
                       type="password"
                       label="Password..."
                       v-model="password"></v-text-field>
                       <v-text-field
                       label="Address"
                       v-model="address"></v-text-field>
                       <v-text-field
                       type="number"
                       label="Postal Code"
                       v-model="postalCode"></v-text-field>
                       <v-text-field
                       label="Unit Number"
                       v-model="unitNo"></v-text-field>
                       <v-btn
                       color="#B3E5FC"
                       class="mr-4"
                       type="submit">Register</v-btn>
                       </v-form>
                       </v-card-text>
                       <p>Already have account?</p>
                       <v-btn v-on:click = "$router.push('shopperlogin')" color="blue"> Login</v-btn>
           </v-card>
       </div>
</div> 
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../../firebase.js';


export default {
    name: 'Register',
    data() {
        return {
            fullName: '',
            email: '',
            password: '',
            address: '',
            postalCode: '',
            unitNo: ''
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
                            address: this.address,
                            postalCode: this.postalCode,
                            unitNo: this.unitNo,
                            type: "Shopper"
                        })
                    }).then(()=> {
                        alert("Account Created Successfully!")
                        this.$router.push('shopperlogin');
                    }).catch(error => {
                        alert(error.message)
                    })
                    
                    // //const actionCodeSettings = {
                    //   //  url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
                    //     //};
                    // user.sendEmailVerification();
                    // alert('Successfully registered! Please login.');
                    // this.$router.push('/');
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
#ShopperSignUpPage{
    position: relative;
    background-size: cover;
    background-image: url("https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80");
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
}
#vcard {
    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
  text-align: left;
  padding-left: 20px;
  color: rgb(255, 255, 255);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
}
h2 {
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:75px;
  color: rgb(2, 11, 14);
}
h3 {
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:50px;
  color: rgb(4, 9, 53);
}
#test {
    padding-left:20px;
    text-align: center;   
}
</style>