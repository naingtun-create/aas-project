<template>

    <div id="companyPage">
      <div id="intro">
        <p> FOOD & DRINK <p>
        <p id="title"> ECO-STRAW </p>
        <p> Our Shlurple collapsible, reusable straws are made up of 4 stainless steel straws 
            that snap together, thanks to an inner silicone straw, to become one super-powered Shlurple!
            <br><br>The box is made of a wheat composite which uses reclaimed wheat straw from farms.</p>
        <img
            src="https://cf.shopee.com.my/file/37fdccd60905a08435c673d0c9331a23">
      </div>
      <div id="contents">
        <NewProductForm></NewProductForm>
      </div>
    </div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'

export default {
    name: "companyPage",
    data: () => {
        return {
       
        }
    },
    components: {
        NewProductForm: NewProductForm
    }
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
    border: 1px solid #222; 
    margin: 100px;  
}
#bold{
    font-weight: bold;
}
#title{
    font-weight: bold;
    font-size:80px;
    font-family: 'Anton', sans-serif;
    color:#c9AA88
}
</style>