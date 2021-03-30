<template>
    <div id = "SignUpSuccessfulPage">
        <br><br>
        <h1> Get started with All About Sustainability </h1><br><br><br><br>
        <v-card height="300px" color="#F3E5F5">
            <h2><br>Requirement for Successful Account Application as Company</h2><br>
            <v-card-text color="black">
               <p>We have sent an email to your registered email regarding the docuements required for verfication as a seller.</p>
               <p>Please send the stated documents to <b>allAboutSustainability@gmail.com </b> for apprvoal of account. </p><br>
               <p>Thank you.</p>
            </v-card-text>
        </v-card><br><br><br><br>

        <p>Get started with our website?</p>
        <v-btn x-large v-on:click = "$router.push('/')" color="blue"> Login </v-btn>
    </div>
</template>

<script>


export default {
  name: 'SignUpSuccessfulPage',
  data(){
    return{
    }
  },
  methods:{

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
</style>