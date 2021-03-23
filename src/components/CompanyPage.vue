<template>
<div id="companyPage">
    <div id="intro">
        <div id="heading">
            <p id="title" style="float:left">Shlurple</p>
            <img style="float:right" src="https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/47048761_335724880552808_8218427797866020864_n.png?_nc_cat=109&ccb=1-3&_nc_sid=6e5ad9&_nc_ohc=yT94h9Dqx14AX-xfDpI&_nc_ht=scontent-xsp1-3.xx&oh=08c999948f94804f657fa3093df8422c&oe=607ECD95">
        </div>
            <h3> Our Story </h3>
                <p> In 2018, Shlurple was born from an ingrained love of the sea… watching a turtle cry in pain 
                    as a single-use plastic straw was removed from its nostril was the catalyst for us to want 
                    to make a change.
                    <br>
                    <br>Shlurple’s mission has always been to provide alternatives to single-use plastic. 
                    So, guided by our love for turtles and life as a whole, we have created a range of products 
                    that not only reduce unnecessary waste but provide a platform to discuss the cleaning up of our act 
                    and our oceans. We will continue to grow our following and provide alternatives until we solve 
                    our current plastic pollution problem. 
                    <br>
                    <br>We hope you join us on our journey and remember… BUY A SHLURPLE, SAVE A TURTLE.
                </p>
    </div>

    <div id="products">
        <h3 id="introproduct">Our Products </h3>
    <div id="contentsproduct">
        <NewProductForm></NewProductForm>
    </div>
    </div>

    <div id="promotionals">
        <h3 id="intropromo">Upcoming Promotional Activities </h3>
    <div id="contents">
        <NewPromoForm></NewPromoForm>
    </div>
    </div>
</div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'
import NewPromoForm from './NewPromoForm.vue'

export default {
    name: "companyPage",
    data: () => {
        return {   
        }
    },
    components: {
        NewProductForm: NewProductForm,
        NewPromoForm: NewPromoForm,
    }
}
</script>

<style scoped>
#intro {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#introproduct {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#intropromo {
    float:left;
    padding-top:100px;
    padding-left:200px;
    font-size:30px;
    text-align:left;
}
#contentsproduct {
    width:40%;
    padding-top:150px;
    float:right;
    font-size:40px;
    margin: 100px;  
    padding-left:100px;
}
#contents {
    width:40%;
    padding-top:50px;
    float:right;
    font-size:40px;
    margin: 50px;  
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
#heading {
    display: inline-block;
}
#products {
    padding-top:0px;
    width:60%;
}
#promotionals {
    padding-top:0px;
    width: 60%;
}
</style>