<template>
    <div id = "SignUpPage">
        <h2> Get started with All About Sustainability </h2>
        <label for = "email"> Email Address </label><br><br>
        <input type = "email" id = "email" name = "email" v-model="email"><br><br>
        <label for = "password"> Password </label><br><br>
        <v-text-field type="password" rounded = "true" color = "purple" v-model="email"></v-text-field><br><br>
        <v-btn> Sign Up </v-btn><br><br>
        <p>Already have account?</p>
        <v-btn v-on:click = "$router.push('login')"> Login </v-btn>
    </div>
</template>

<script>


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

    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>