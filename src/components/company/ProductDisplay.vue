<template>
  <div id="productdisplay">
    <div id="contents">
      <v-container fluid>
        <v-layout>
          <ul id="itemsList">
            <li v-for="item in items" :key="item.id">
              <v-card class="mx-auto" width="250" height="400" color="green lighten-5">
                <template slot="progress">
                  <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>
                <v-img height="200" v-bind:src="item.image"></v-img>
                <h1 id="productTitle">
                  <b>{{ item.title }}</b>
                </h1>
                <div id="price">
                  <p class="my-4 subtitle-1">
                    <b>${{ item.price }}</b>
                  </p>
                  <p id="description">Category: {{item.category}}</p>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-btn small depressed outlined color="indigo" v-on:click="route(item.id)">Learn More</v-btn>
                    <error-prevention-dialog id="delete" :itemName="item.title" :itemID="item.id" type="products"/>
                  </v-card-actions>
                </div>
              </v-card>
            </li>
          </ul>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import firebase from "firebase";
import ErrorPreventionDialog from "./ErrorPreventionDialog.vue"

export default {
  components: { ErrorPreventionDialog },
  data() {
    return {
      items: [],
    };
  },
  component: {
      ErrorPreventionDialog: ErrorPreventionDialog
  },
  methods: {
    fetchItems: async function() {
      var user = firebase.auth().currentUser;
      var k = user.uid;
      await db.collection("products")
        .where("company", "==", k)
        .get()
        .then((snapshot) => {
          let item = [];
          snapshot.docs.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.items.push(item);
          });
        });
    },
    route: function(id) {
      let doc_id = id;
      this.$router.push({name: 'companyProduct', params: {id: doc_id}});
    },
  },
  created() {
      this.fetchItems();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");

#title {
    font-weight: bold;
    font-size:80px;
    font-family: 'Anton', sans-serif;
}
#content {
    float: left;
    padding: 0px;
    width: 100%;
    background-color: #FFFAF0;
    height: 700px; 
}  
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
h1 {
  height:85px;
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
  font-family: "Nunito";
  font-size: 13px;
  text-align:start;
  padding:10px;
}
#price {
  margin-top: -20px;
}
p {
  text-align:start;
  padding-left:10px;
}
#description {
  font-family: "Lucida Console", Times, serif;
  font-size: 13px;
  text-align:start;
  margin-top:-5px;
}
#delete {
  margin-left:30px;
}
</style>