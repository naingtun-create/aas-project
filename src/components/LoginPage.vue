<template>
    <div id="LogInPage">
        <v-card>
            <v-card-title>Log In Form</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Email"></v-text-field>
                    <v-text-field label="Password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn x-large block color="blue"> Login </v-btn>
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