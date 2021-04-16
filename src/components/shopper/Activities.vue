<template>
    <div id = "Activities">
        <shopper-header></shopper-header>
        <h2>Environmental Statistics of the Month (Singapore)</h2>
        <v-divider></v-divider>
        <div id="charts">
            <div id='halfleft'>
                <BarChart></BarChart>
            </div>
            <div id='halfright'>
                <LineChart></LineChart>
            </div>
        </div>
        <h2 class="ecoh2">Latest Eco-friendly Activities</h2>
        <v-divider></v-divider>
        <DisplayActivity></DisplayActivity>
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#charts {
  padding: 4% 20% 4% 20% ;
}
.ecoh2 {
  margin-top: 25px;
  padding-top: 25%;
}
h2 {
  text-align: left;
  padding-left: 3%;
  padding-top: 2%;
  font-family:"Nunito";
}
#halfleft{
  width:50%;
  float:left;
  margin-left:-40px;
}
#halfright{
  width:50%;
  float:right;
  margin-left: 20px;
}
</style>