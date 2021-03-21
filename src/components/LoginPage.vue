<template>
    <div id="LogInPage">
        <v-card>
            <v-card-title>Login to your Account</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Email"></v-text-field>
                    <v-text-field label="Password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="#B3E5FC"
                class="mr-4"
                @click="reset"><router-link to="/profile" exact>Login</router-link></v-btn>
                <v-btn
                color="#EF9A9A"
                @click="resetValidation"><router-link to="/resetpassword" exact>Reset Password</router-link></v-btn>
                <v-btn
                color="#B2DFDB"
                @click="resetValidation"><router-link to="/signup" exact>Sign Up</router-link></v-btn>

            </v-card-actions>
        </v-card>
    </div> 
</template>

<script>

export default {
    data: function() {
        return {
          
        }
    },

}
</script>

<style scoped>

</style>