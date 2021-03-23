<template>
    <div id = "OnlineMarketPlace">
        <h1>Our Products</h1>
        <ul id="itemsList">
            <li v-for="item in items" v-bind:key="item.title">
                <v-card :loading="loading" class="mx-auto my-12" max-width="374">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img height="250" v-bind:src="item.image"></v-img>
                    <v-card-title>{{item.title}}</v-card-title>
                    <div class="my-4 subtitle-1">${{item.price}} </div>

                    <v-divider class="mx-4"></v-divider>                  
                    <v-card-text>
                        <div class="my-4 subtitle-1"> {{item.company}}</div>
                        <div>{{item.description}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="deep-purple lighten-2" text>Learn More</v-btn>
                    </v-card-actions>
                </v-card>
            </li>
        </ul>        
    </div>
</template>

<script>
import db from '../firebase.js'

export default {
  name: 'OnlineMarketPlacePage',
  data(){
    return{
        items:[],
    }
  },
  methods:{
    fetchItems:function(){
      db.collection('products').get().then(snapshot => {
        let item = {}
        snapshot.docs.forEach(doc => {
          item = doc.data();
          item.show = false
          this.items.push(item)
        });
      });
    },
  },
  created(){this.fetchItems()},
}

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
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  height:50px;
}
</style>