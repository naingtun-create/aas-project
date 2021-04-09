<template>
  <div id="contents">
    <v-container fluid>
      <v-layout>
        <ul id="itemsList">
          <li v-for="item in items" :key="item.id">
            <v-card
              class="mx-auto my-12"
              width="650"
              height="830"
              color="green lighten-5"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-img height="500" v-bind:src="item.image"></v-img>
              <h1 id="productTitle">
                <b>{{ item.title }}</b>
              </h1>
              <p class="my-4 subtitle-1">
                <b>${{ item.price }}</b>
              </p>
              <p class="my-4 subtitle-1">CATEGORY: {{ item.category }}</p>
              <v-divider class="mx-4"></v-divider>
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
    fetchItems() {
      var k = this.companyID

      db.collection("products")
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
      this.$router.push({ name: "companyProduct", params: { id: doc_id } });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#title {
  font-weight: bold;
  font-size: 80px;
  font-family: "Anton", sans-serif;
}

#content {
  float: right;
  padding: 30px;
  width: 80%;
  background-color: #fffaf0;
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
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  margin: 10px;
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
  font-size: 30px;
  text-align: start;
  padding: 20px;
}

p {
  text-align: start;
  padding-left: 25px;
}
</style>
