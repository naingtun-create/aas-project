<template>
<div id="contactform">
    <h1>All About Sustainability</h1>
    <router-link to="/" exact><v-icon dark right>mdi-home</v-icon></router-link>
    <h2>Contact Us</h2>    
    <div class="container">
        <form @submit.prevent="sendEmail">
            <label>Name</label>
            <input
            type="text"
            v-model="name"
            name="name"
            placeholder="Your Name"
            >
            <label>Email</label>
            <input
            type="email"
            v-model="email"
            name="email"
            placeholder="Your Email"
            >
            <label>Message</label>
            <textarea
            name="message"
            v-model="message"
            cols="30" rows="4"
            placeholder="Submit your issues/queries here & we will get back to you asap!">
            </textarea>
            <input value="Send" type="submit">
        </form>
    </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('aas_service3103', 'contact_form', e.target, 'user_2STTOk9RixwRQS3H8AcRw')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    }
  },
  data() {
      return {
          name:'',
          email:'',
          message:'',
      }
  },
  name:'ContactUs'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");
#contactform {
  position: relative;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80");
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
}
* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  margin-top:20px;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
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
  color: rgb(255, 255, 255);
}
</style>