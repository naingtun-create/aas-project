<template>
    <div id = "Activities">
        <shopper-header></shopper-header>
        <h2>Environmental Statistics in Singapore</h2>
        <v-divider></v-divider>
        <div id="charts">
          <BarChart></BarChart>
          <LineChart></LineChart>
        </div>
        <div id="Activities">
          <h2>Latest Eco-friendly Activities</h2>
          <v-divider></v-divider>
          <DisplayActivity></DisplayActivity>
        </div>
      
        
    </div>
</template>

<script>
import BarChart from "../chart/Recycling";
import LineChart from "../chart/waste";
import DisplayActivity from "./DisplayActivity.vue"
export default {
  components: {
    BarChart,
    LineChart,
    DisplayActivity
  }
};
</script>

<style scoped>
#charts {
  padding: 4% 20% 4% 20% ;
}

h2 {
  text-align: left;
  padding-left: 3%;
  padding-top: 2%;
}

</style>