<template>
    <div id = "SignUpPage">
        <h1> Get started with All About Sustainability </h1>
        <v-card-text>
            <v-form>
                <v-text-field label="Email Address" type="email" filled v-model = "email"></v-text-field>
                 <v-text-field label="Password" type="password" filled v-model = "password"></v-text-field>
            </v-form>
        </v-card-text>

        <v-chip-group v-model="type" active-class="deep-purple accent-4 white--text" column align="center">
          <v-chip large class="ma-2" color="#FFECB3" value = "Shopper" label v-on:click="typeSelected('Shopper')">
            <v-icon left> mdi-account-circle-outline </v-icon>
            Shopper
          </v-chip>

          <v-chip large class="ma-2" color="#FFECB3" value = "Company" label v-on:click="typeSelected('Company')">
            <v-icon left> mdi-domain </v-icon>
            Company
          </v-chip>

          <v-chip large class="ma-2" color="#FFECB3" value = "Admin" label v-on:click="typeSelected('Admin')">
            <v-icon left> mdi-wrench </v-icon>
            Admin
          </v-chip>
        </v-chip-group>
        <p id = "identity" v-show = "selected"> Identity Selected: <b>{{type}}</b> </p><br><br>
        <v-btn x-large color="blue" v-on:click = "sendAccount"> Sign Up </v-btn><br><br><br><br>



        <v-alert :value="alert" prominent type="success" dismissible icon="mdi-checkbox-marked-circle" height="250px">
            <v-row >
                <v-col class="grow" align-self="center">
                    <br><br><br>
                    <p id = "success"> Sign Up Successfully! Login Now to Explore!!</p>
                </v-col>
                <v-col class="shrink" align-self="center">
                  <v-btn x-large v-on:click = "$router.push('login')">Login</v-btn>
                </v-col>
            </v-row>
        </v-alert><br><br><br>
    

        <p>Already have account?</p>
        <v-btn x-large v-on:click = "$router.push('login')" color="blue"> Login </v-btn>
    </div>
</template>

<script>
import db from '../firebase.js'

export default {
  name: 'SignUpPage',
  data(){
    return{
      email:"",
      password:"",
      type:"",
      selected:false,
      selectedCompany:false,
      alert:false,
    }
  },
  methods:{
    sendAccount:function(){
      if(this.email == "" || this.password == "" || this.type == ""){
        alert("Inputs required in order to sign up.")
      } else{
        var user = {
          "email":this.email,
          "password": this.password,
          "type": this.type,
        }
        db.collection('users').add(user).then( () => {
          if(this.selectedCompany){
            this.$router.push({ path: 'signUpSuccessful' })
          } else{
            this.alert=!this.alert
          }
         
        })
      }
    },
    typeSelected:function(identity){
      this.selected = true;
      if(identity == "Company"){
        this.selectedCompany = true;
      } else{
        this.selectedCompany = false;
      }
    }
  },
  components: {
    
  }
}
</script>

<style scoped>
h1 {
  font-family: "monospace", Times, serif;
  font-size: 60px;
}

#identity{
 font-size: 30px; 
 align-items:flex-start;
}

#success{
  font-size: 30px; 
  text-align:center;
}

v-card{
  align-self: center;

}
</style>