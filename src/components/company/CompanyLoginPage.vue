<template>
    <div id="companyloginpage">
        <h1>All About Sustainability</h1>
        <router-link to="/" exact><v-icon dark right>mdi-home</v-icon></router-link>
        <h2>Company's Login Page</h2>
        <br/><br/>
        <div id="vcard">
            <v-card id="test" width="700">
                <div id="content">
                    <v-card-title>Login & start selling!</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" v-model="email" append-icon="mdi-email"></v-text-field>
                            <v-text-field label="Password (Press icon to show/hide password)" v-model="password"
                                :value="myPass"                     
                                :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="() => (value = !value)"
                                :type="value ? 'password' : 'text'">>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-form @submit.prevent="login()">
                        <v-btn color="#B3E5FC" class="mr-4" v-on:click="login()">Login</v-btn>
                        </v-form>
                        <v-btn color="#EF9A9A" class="mr-4" v-on:click="resetValidation()">Reset Password</v-btn>
                        <v-btn color="#B2DFDB" class="mr-4" v-on:click="signuppage()">Sign Up</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </div>
    </div> 
</template>

<script>
import firebase from 'firebase';
import db from "../../firebase.js";

export default {
    data() {
        return {
            email: null,
            password: null,
            value:String,
            myPass: String
        };
    },
    methods: {
        resetValidation: function() {
            this.$router.push({path: '/resetpassword'});
        },
        signuppage: function() {
            this.$router.push({path: '/companysignup'});
        },
        login: async function() {
            if (this.email == null|| this.password==null  ){
                alert("Please fill in your email and password!")
            } else {
                var data = await db.collection("company").where("email","==",this.email).get()
                if(data.empty) {
                    alert("No such company email exist in the database. If you are a shopper, please proceed to the shopper login page!")
                } else {
                    await firebase
                        .auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                            alert('Successfully logged in');
                            this.$router.push({ path: '/company/companypage'});
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                }
            }
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#companyloginpage {
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
  color: rgb(255, 255, 255);
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
.router-link-active {
  color:white
}
#content {
    padding: 3%
}
</style>