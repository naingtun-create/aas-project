<template>
    <div id="HomePage">
        <img id="example1"
         src="https://youmatter.world/app/uploads/sites/2/2018/12/sustainable-development-definition-examples.jpg">
    <h1>{{ this.$store.state.authStore.test }}</h1>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>
  .bg {
    background-image:cover;
    height:1000px;
  }
#example1 {
  /* Set up proportionate scaling */
  width: 100%;
  height: 75%;
	
  /* Set up positioning */
  top:200;
  bottom:0;
}
</style>