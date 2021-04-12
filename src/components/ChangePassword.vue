<template>
    <div id="changePassword">
        <v-btn color="red lighten-2" dark v-on:click="dialog=true">
            Change Account Password
        </v-btn>
        <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600" persistent>
                <template v-slot:default="dialog" >
                <v-card>
                    <v-toolbar
                    color="#c9AA88" 
                    dark
                    >Change Account Password</v-toolbar>
                    <br>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field
                                v-model="password"
                                :counter="20"
                                label="New Password"
                                required
                            ></v-text-field>
                             <v-text-field
                                v-model="password2"
                                :counter="20" 
                                label="Retype New Password"
                                required
                            ></v-text-field>
                            <v-card-actions class="justify-end">
                                <v-btn text @click="updatePassword">
                                    Update Password
                                </v-btn>
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                >Close</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
                </template>
         </v-dialog>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "ChangePassword",
    data: () => {
        return {
            password: null,
            password2: null,
            dialog: false
        }
    },
    methods: {
       updatePassword: async function() {
            var user = firebase.auth().currentUser;

            if (this.password == null || this.password2 == null) {
                alert("Please fill in both fields!")
            } else if ( this.password == this.password2) {
                await user.updatePassword(this.password).then(function() {
                // Update successful.
                    this.close();
                    alert("It has been successfully updated!")

                }).catch(function(error) {
                // An error happened.
                    console.log(error)
                });

            } else {
                alert("Password typed in are mismatched")
            }

       },
       close: function() {
           this.dialog = false;
           this.$refs.form.reset();
           
       }
    },
}
</script>