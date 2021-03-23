<template>
  <div>
    <div id="intro">
        <p> {{this.category}} <p>
        <p id="title"> ECO-STRAW </p>
        <p>{{this.description}}</p>
        <img src="https://cf.shopee.com.my/file/37fdccd60905a08435c673d0c9331a23">
    </div>
    <div id="contents">
        <p id="bold"> View Seller: {{this.company}}</p>
        <p>SGD {{this.price}}</p>
        <p id="bold">Description:</p>
            <p>{{this.addInfo}}</p>
        <p id="bold"> Select Size: </p>
        <v-select v-model="selectedSize" :items="size" filled label="Size" dense ></v-select>
        <p id="bold"> Select Colour: </p>
        <v-select v-model="selectedColour" :items="colour" filled label="Colour" dense ></v-select>
        <br> 
        <span id="select">Selected Size: {{ selectedSize }}</span>
        <br>
        <span id="select">Selected Colour: {{ selectedColour }}</span>
        <br>
        <button>Add to Cart</button>
    </div> 
  </div>
</template>

<script>
export default {
  props: ["id"],
  data(){
    return{
      company:'Weety',
      image: "https://cf.shopee.com.my/file/37fdccd60905a08435c673d0c9331a23",
      price: 8,
      colour:['red','blue'],
      size:['S','M','L'],
      category: 'FOOD & DRINK',
      addInfo: 'Use, wash and dry within few seconds, no odour and sustainable up to 2 months',
      description:"Our Shlurple collapsible, reusable straws are made up of 4 stainless steel straws that snap together, thanks to an inner silicone straw, to become one super-powered Shlurple!   The box is made of a wheat composite which uses reclaimed wheat straw from farms.",
      currentSize: '',
      selectedSize: 'S',
      selectedColour: '',
      Quantity: 1,
    }
    },

}
</script>

<style scoped>
#intro {
    width:50%;
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#contents {
    width:40%;
    padding-top:100px;
    float:right;
    font-size:40px;
    margin: 100px;  
}
#bold{
    font-weight: bold;
    color:#c9AA88;
}
#title{
    font-weight: bold;
    font-size:80px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88;
}
#select{
    color:#c9AA88;
    font-size:40px;
}
button {
  width: 400px;
  height: 120px;
  background-color: #c9AA88;
  border-radius: 10px;
  border-width: 1px;
}
</style>

