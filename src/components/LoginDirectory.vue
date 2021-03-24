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
  background-image: url("https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80");
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
  text-decoration: underline;
}
.delete {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 80px;
  height: 36px;
  color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  margin-bottom: 15px;
  margin-top: 20px;
}
.delete:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>