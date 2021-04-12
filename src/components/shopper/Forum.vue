<template>
    <div id = "forum">
        <shopper-header></shopper-header>
        <p>This is Forum page</p>
        <BarChart></BarChart>
        <LineChart></LineChart>
        
    </div>
</template>

<script>
import BarChart from "../chart/Recycling";
import LineChart from "../chart/waste";
export default {
  components: {
    BarChart,
    LineChart
  }
};
</script>

<style scoped>
</style>