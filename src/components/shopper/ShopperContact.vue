<template>
<div id="contactform">
  <shopper-header></shopper-header>
    <div id='thankyou'>
      <img id="photo" src='../../assets/Thankyou.jpg'><br><br>
      <p> Dear {{ shopperData.fullname }}, we hope to hear any issues that you may have. </p>
    </div>
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
import db from '../../firebase.js';
import firebase from "firebase";
import emailjs from 'emailjs-com';
import ShopperHeader from './ShopperHeader.vue';

export default {
  components: { ShopperHeader },
  methods: {
    sendEmail: async function(e) {
  
      await emailjs.sendForm('aas_service3103', 'contact_form', e.target, 'user_2STTOk9RixwRQS3H8AcRw')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
            alert("Email sent! We will get back to you within 3 working days.")
        }).catch((error => {
          console.log('FAILED...', error);
        }))
        location.reload();

    },
    fetchItems:function(){
      db.collection("shoppers").doc(this.id).get().then((doc) => {
        this.shopperData = doc.data();
          });
    },
  },
  data() {
      return {
          id: "",
          shopperData: [],
          name:'',
          email:'',
          message:'',
      }
  },
  created(){
    var user = firebase.auth().currentUser;
    this.id = user.uid;
    this.fetchItems()},
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
  float:right;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 45%;
  margin-top:100px;
  margin-right:50px;
}
label {
  float: left;
}
#thankyou{
  margin-top:100px;
  width:50%;
  float:left;
}
#photo{
  width:80%
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