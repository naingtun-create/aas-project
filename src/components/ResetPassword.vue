<template>
  <div id="ResetPassword">
    <h1>All About Sustainability</h1>
    <router-link to="/" exact><v-icon dark right>mdi-home</v-icon></router-link>
    <h2>Reset Password Page</h2>
    <br /><br />
    <div id="vcard">
      <v-card id="test" width="700">
        <div id="content">
          <v-card-title>Reset your password!</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="email"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#EF9A9A" class="mr-4" @click="reset">Reset</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data: function() {
    return {
      email: "",
    };
  },
  methods: {
    reset: async function() {
      var auth = firebase.auth();

      if (this.email != "") {
        //The email takes awhile
        await auth
          .sendPasswordResetEmail(this.email)
          .then(function() {
            // Email sent.
            console.log("Sent Successfully")
            alert("Check your email for further instructions to reset your password!")
          })
          .catch(function(error) {
            alert(error);
          });
        
        this.$router.push({path: "/login"});
      } else {
        alert("Please fill in your email");
        console.log(this.$router)
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");
#ResetPassword {
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
  margin-top: 15px;
  color: rgb(2, 11, 14);
}
h3 {
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top: 75px;
  color: rgb(4, 9, 53);
}
#test {
  padding-left: 20px;
  text-align: center;
}

#content {
  padding: 3%;
}
</style>
