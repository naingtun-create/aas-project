<template>
    <div id="CompanyLoginPage">
        <v-card>
            <v-card-title>Login to your Company Account</v-card-title>
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
                @click="resetValidation"><router-link to="/companysignup" exact>Sign Up</router-link></v-btn>

            </v-card-actions>
        </v-card>
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

</style>