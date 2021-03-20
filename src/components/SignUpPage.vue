<template>
    <div id = "SignUpPage">
        <h2> Get started with All About Sustainability </h2>
        <v-card-text>
            <v-form>
                <v-text-field label="Email Address" type="email" filled v-model = "email"></v-text-field>
                 <v-text-field label="Password" type="password" filled v-model = "password"></v-text-field>
            </v-form>
        </v-card-text>

        <v-btn color="blue" v-on:click = "sendAccount"> Sign Up </v-btn><br><br>
        <p>Already have account?</p>
        <v-btn v-on:click = "$router.push('login')" color="blue"> Login </v-btn>
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
    }
  },
  methods:{
    sendAccount:function(){
      var user = {
        "email":this.email,
        "password": this.password,
      }
      db.collection('users').add(user).then(() => location.reload())
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>