<template>
    <div id="navbar">
      <img src="https://pics.freeicons.io/uploads/icons/png/18453753581581665319-512.png" class="logo">
      <ul class="logo"> All About Sustainability</ul>
      <div class="links">
      <ul><router-link to="/" exact>Home</router-link></ul>
      <ul><router-link to="/physicalstore" exact>Physical Store</router-link></ul>
      <ul><router-link to="/onlinemarketplace" exact>Online Marketplace</router-link></ul>   
      <ul><router-link to="/incubator" exact>Incubator</router-link></ul>
      <ul><router-link to="/login" exact>Login</router-link></ul>
      <ul><router-link to="/signup" exact>Sign Up</router-link></ul>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
#navbar {
  display: flex;
  padding-top: 0px;
  color:white;
  background-color:#c9AA88;
  height:100px;
  font-size:35px;
  padding-top: 0px;
  font-family: "Sanchez";
}
.logo {
  height:80px;
  padding-left: 50px;
  
}
.links{
  padding-left: 40%;
  text-align: center;
  display:inline-flex;
}
</style>