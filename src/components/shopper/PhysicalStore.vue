<template>
  <div>
    <shopper-header></shopper-header>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters class="mb-6">
        <v-col cols="2">
          <v-card class="pa-4" elevation="2" id="filterbar" outlined>
            <v-card-title>Categories</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                label="Decor"
                v-model="selectedCategories"
                value="Decor"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                label="Clothes"
                v-model="selectedCategories"
                value="Clothes"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                label="Food"
                v-model="selectedCategories"
                value="Food"
                hide-details
                dense
              ></v-checkbox>
            </v-container>
            <br />
            <v-divider></v-divider>
            <v-card-title>Location</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                label="North"
                v-model="selectedRegion"
                value="North"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                label="South"
                v-model="selectedRegion"
                value="South"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                label="East"
                v-model="selectedRegion"
                value="East"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                label="West"
                v-model="selectedRegion"
                value="West"
                hide-details
                dense
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-subtitle
              >Or simply put in your postal code!</v-card-subtitle
            >
            <v-text-field
              label="Postal Code"
              v-model="postalCode"
              outlined
              :rules="[numberRule]"
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col cols="10">
          <v-card id="map" class="pa-4" elevation="2" outlined>
            map
            <v-divider></v-divider>
            <ul id="locationList">
              <li v-bind:key="l.id" v-for="l in locations">
                <h2 id="LName">{{ l.id + ". " + l.name }}</h2>
                <p>{{ l.address }}</p>
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: ["Decor", "Clothes", "Food"],
    numberRule: (v) => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999999) return true;
      return "It has to be a number";
    },
    selectedCategories: [],
    selectedRegion: [],
    postalCode: "XXXXXX",
    locations: [
      {
        id: 1,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
      {
        id: 2,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
      {
        id: 3,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
      {
        id: 4,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
      {
        id: 5,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
      {
        id: 6,
        name: "CoCoNut",
        address: "Tampines 1 st 82 BLK 856E",
      },
    ],
  }),
};
</script>

<style scoped>
#locationList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 200px;
  list-style-type: none;
  text-align: left;
  padding: 10px;
  margin: 10px;
}
</style>
