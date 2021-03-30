<template>
  <div id="QC">
    <button v-on:click="add"> + </button> {{counter}} 
    <button v-on:click="subtract"> - </button>
  </div>
</template>

<script>
export default {
  name: 'QC',
  data() {
    return{
      counter:0
    }
  },
  props:{
    item: {
      type:Object
    }
  },
  methods: {
    add: function(){
      if(this.counter ==10){
        alert("You cannot buy more than 10 items.");
      } else {
        this.counter+=1;
      }
      this.$emit('counter', this.item, this.counter);
    },
    subtract: function(){
      if (this.counter>0){
        this.counter -=1;
      }
      this.$emit('counter', this.item, this.counter);
    }
  }
}
</script>

<style>
  button {
    background-color: BCC6CC;
    font-size: 16px;
    padding: 15px 24px;
    border-radius: 10px;
  } 
</style>
