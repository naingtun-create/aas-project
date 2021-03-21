<template>
    <div id="ResetPassword">
        <v-card>
            <v-card-title>Reset your password!</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Email"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="#EF9A9A"
                class="mr-4"
                @click="reset"><router-link to="/resetsuccess" exact>Reset</router-link></v-btn>
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