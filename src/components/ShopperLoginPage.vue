<template>
    <div id="ShopperLoginPage">
        <h1>All About Sustainability</h1>
        <h2>Shopper's Login Page</h2>
        <br><br>
        <div id="vcard">
        <v-card id="test" max-width="600" color="#BBDEFB">
            <v-card-title>Login & start browsing!</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Email" v-model="email"></v-text-field>
                    <v-text-field label="Password" v-model="password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-form @submit.prevent="login">
                <v-btn
                color="#B3E5FC"
                class="mr-4"
                @click="login">Login</v-btn>
                </v-form>
                <v-btn
                color="#EF9A9A"
                @click="resetValidation"><router-link to="/resetpassword" exact>Reset Password</router-link></v-btn>
                <v-btn
                color="#B2DFDB"
                @click="resetValidation"><router-link to="/shoppersignup" exact>Sign Up</router-link></v-btn>

            </v-card-actions>
        </v-card>
        </div>
    </div> 
</template>

<script>
import firebase from 'firebase';
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully logged in');
                    this.$router.push('/profile');
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
#ShopperLoginPage{
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
  margin-top:15px;
  color: rgb(2, 11, 14);
}
h3 {
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:75px;
  color: rgb(4, 9, 53);
}
#test {
    padding-left:20px;
    text-align: center;   
}
</style>