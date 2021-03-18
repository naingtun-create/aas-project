<template>
    <div id="navbar">
        <ul id="login">
        <router-link to="/login" exact>Login</router-link>
      </ul>

      <ul id="signup">
        <router-link to="/signup" exact>Sign Up</router-link>
      </ul>
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
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#websitename {
  background-color: pink;
  text-align: center;
  font-size: 40px;
}
#login {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#signup {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>