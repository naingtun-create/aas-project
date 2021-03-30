<template>
    <div id="loginDir">
        <h1>All About Sustainability</h1>
        <h2>Come be part of the<br>Eco-Friendly Movement</h2>
        <h3>Account Type</h3>
        <div style="margin-left: 0px; margin-top:100px; position: aboslute;right:150px;">
            <ul>
                <li>
                    <v-btn><router-link to="/companylogin" exact>As a Company</router-link></v-btn>
                </li>
                <li>
                    <v-btn><router-link to="/shopperlogin" exact>As a Shopper</router-link></v-btn>
                </li>
            </ul>
        </div>
    </div>
</template>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#loginDir {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
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
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:75px;
  color: rgb(8, 31, 37);
}
h3 {
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
  margin-top:175px;
  color: rgb(16, 240, 210);
}
h4 {
  font-size: 20px;
  font-family: Nunito;
  font-weight: normal;
}
ul {
  list-style-type: none;
  margin-top: -20px;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  font-family: Nunito;
  font-weight: bold;
  color: rgb(0, 114, 180);
  text-decoration: none;
}
.router-link-active {
  color:white
}
</style>