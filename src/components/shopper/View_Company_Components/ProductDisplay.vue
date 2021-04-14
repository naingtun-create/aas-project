<template>
  <div id="contents">
    <v-container fluid>
      <v-layout>
        <ul id="itemsList">
          <li v-for="item in items" :key="item.id">
            <v-card
              class="mx-auto"
              width="250"
              height="400"
              color="green lighten-5"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-img height="200" v-bind:src="item.image"></v-img>
              <h1 id="productTitle">
                <b>{{ item.title }}</b>
              </h1>
              <p class="my-4 subtitle-1">
                <b>${{ item.price }}</b>
              </p>
              <p id="description">Category: {{ item.category }}</p>
              <v-divider class="mx-4"></v-divider>

              
              <v-card-actions>
                <v-btn
                  x-small
                  depressed
                  outlined
                  color="indigo"
                  v-on:click="route(item.id)"
                  >Learn More</v-btn>
              </v-card-actions>

            </v-card>
          </li>
        </ul>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "../../../firebase.js";

export default {
  props: ["companyID"],
  data() {
    return {
      items: [],
    };
  },
  methods: {
    fetchItems: async function(){
      var k = this.companyID
    
      await db.collection("products")
        .where("company", "==", k)
        .get()
        .then((snapshot) => {
          let item = [];
          snapshot.docs.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            console.log(item);
            this.items.push(item);
          });

          console.log(this.items);
        });
    },
    route: function(id) {
      let doc_id = id;
      this.$router.push({ name: "product", params: { id: doc_id } });
    },
  },
  created() {
    console.log(this.companyID)
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  margin: 20px;
}
.v-card--reveal {
  align-items: flex-start;
  bottom: 0;
  justify-content: flex-start;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
#productTitle {
  font-family: "Lucida Console", Times, serif;
  font-size: 12px;
  text-align: start;
  padding: 5px;
}
p {
  text-align: start;
  padding-left: 5px;
}
#description {
  font-family: "Lucida Console", Times, serif;
  font-size: 10px;
  text-align:start;
  margin-top:-5px;
}
</style>
