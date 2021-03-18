<template>
    <div id = "SignUpPage">
        <h2> Get started with All About Sustainability </h2>
        <label for = "email"> Email Address </label><br>
        <input type = "email" id = "email" name = "email"><br>
        <label for = "password"> Password </label><br>
        <input type = "password" id = "pwd" name = "pwd" minlength = "8"><br>
        <v-btn> Sign Up </v-btn>
        <p>Already have account?</p>
    </div>
</template>

<script>
export default {
  name: 'SignUpPage',
  components: {

  }
}
</script>

<style scoped>
</style>