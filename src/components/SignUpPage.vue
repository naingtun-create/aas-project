<template>
    <div id = "SignUpPage">
        <h1> Get started with All About Sustainability </h1>
        <v-card-text>
            <v-form>
                <v-text-field label="Email Address" type="email" filled v-model = "email"></v-text-field>
                 <v-text-field label="Password" type="password" filled v-model = "password"></v-text-field>
            </v-form>
        </v-card-text>

        <v-chip large class="ma-2" color="#FFECB3" label v-on:click="typeSelected('Shopper')">
            <v-icon left> mdi-account-circle-outline </v-icon>
            Shopper
        </v-chip>

        <v-chip large class="ma-2" color="#FFECB3" label v-on:click="typeSelected('Company')">
            <v-icon left> mdi-domain </v-icon>
            Company
        </v-chip>

        <v-chip large class="ma-2" color="#FFECB3" label v-on:click="typeSelected('Admin')">
            <v-icon left> mdi-wrench </v-icon>
            Admin
        </v-chip>
        <p id = "identity" v-show = "selected"> Identity Selected: <b>{{type}}</b> </p><br><br>

        <v-btn x-large color="blue" v-on:click = "sendAccount"> Sign Up </v-btn><br><br><br><br>
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
    }
  },
  methods:{
    sendAccount:function(){
      var user = {
        "email":this.email,
        "password": this.password,
        "type": this.type,
      }
      db.collection('users').add(user).then(() => location.reload())
    },
    typeSelected:function(identity){
      this.selected = true;
      this.type = identity;
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
}
</style>