<template>
   <div id="SignUpPage">
       <h1>All About Sustainability</h1>
       <router-link to="/" exact><v-icon dark right>mdi-home</v-icon></router-link>
       <h2>Company's Sign Up Page</h2>
       <br><br>
       <div id="vcard">
           <v-card id="test" width="700">
               <v-card-title>Get started with All About Sustainability!</v-card-title>
               <v-card-text>
                   <v-form @submit.prevent="register">
                       <v-text-field
                       type="email"
                       label="Email address"
                       required
                       v-model="email" append-icon="mdi-email"></v-text-field>
                       <v-text-field label="Password (Press icon to show/hide password)" v-model="password"
                       :value="myPass"                     
                       :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                       @click:append="() => (value = !value)"
                       :type="value ? 'password' : 'text'">
                       </v-text-field>      
                       <v-text-field
                       label="Company Name"
                       v-model="companyName" append-icon="mdi-domain"></v-text-field>
                       <v-textarea
                       label="Company Description"
                       v-model="description" append-icon="mdi-image-text"></v-textarea>
                       <v-btn color="#B3E5FC" class="mr-4"
                       type="submit">Register</v-btn>
                    </v-form>
                </v-card-text>
                <p>Already have account?</p>
                <v-btn v-on:click = "$router.push({path: '/companylogin'})" color="blue">Login</v-btn>
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
            companyName: '',
            email: '',
            password: '',
            image:[],
            imageURL:'',
            description:'',
            value:String,
        };
    },
    methods: {
        register: async function()  {
            
            await firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then( async () => {

                    const user = firebase.auth().currentUser;
                    
                    user.updateProfile({
                        displayName: this.fullName
                    }).then( async () => {
                        await db.collection('company').doc(user.uid).set({
                            companyname: this.companyName,
                            email: this.email,
                            type: "Company",
                            description: this.description,
                        })
                        
                        await firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                            console.log("Signed Up and Signed Out!")

                        }, function(error) {
                            // An error happened.
                            console.log(error)
                        });

                        this.$router.push('signUpSuccessful');
                 
                    }).catch(error => {
                        alert(error.message)
                    })
                    
                    //const actionCodeSettings = {
                      //  url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
                        //};
                    user.sendEmailVerification();

                    
                    
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