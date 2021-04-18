<template>
<div id="contactform">
  <company-header></company-header>
    <h3 id="title">Support your local eco-friendly products!</h3>
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
import CompanyHeader from './CompanyHeader.vue';

export default {
  components: { CompanyHeader },
  methods: {
    sendEmail: async function(e) {
  
      await emailjs.sendForm('aas_service3103', 'contact_form', e.target, 'user_2STTOk9RixwRQS3H8AcRw')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
            alert("Email sent! We will get back to you within 3 working days.")
            this.$router.push("/");
        }).catch((error => {
          console.log('FAILED...', error);
        }))

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
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  padding-bottom:50px;
  min-width:1400px;  
}
* {
  box-sizing: border-box;
}
.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  margin-top:100px;
}
#title{
  font-weight: bold;
  font-size:30px;
  font-family: 'Nunito';
  padding-top:30px;
  color:black;
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