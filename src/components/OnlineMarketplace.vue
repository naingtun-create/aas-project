<template>
    <div id = "OnlineMarketPlace">
        
        <v-container fluid>
          <h1>Our Products</h1>
          <v-toolbar floating>   
            <v-text-field single-line hide-details label="Search for products" prepend-icon="mdi-magnify" v-model="search"></v-text-field>
          </v-toolbar>
          <v-layout>
            <v-row dense>
                <div v-for="item in filteredProduct" :key="item.id">
                <v-col>

                    <v-card 
                     class="mx-auto my-12" width="374" height = "550" color="green lighten-5">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>
                         <v-img height="300" v-bind:src="item.image"></v-img>
                        <v-card-title><b>{{item.title}}</b></v-card-title>
                        <p lass="my-4 subtitle-1">{{item.company}}</p>
                        <p class="my-4 subtitle-1">${{item.price}} </p>

                        <v-divider class="mx-4"></v-divider>                  

                        <v-card-actions>
                            <v-btn x-large depressed outlined color="indigo" v-on:click="route(item.id)">Learn More</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                </div>
            </v-row>
         
        </v-layout> 
        </v-container>  
    </div>
</template>

<script>
import db from '../firebase.js'

export default {
  name: 'OnlineMarketPlacePage',
  data(){
    return{
        items:[],
        search:"",
    }
  },
  methods:{
    fetchItems:function(){
      db.collection('products').get().then(snapshot => {
        let item = []
        snapshot.docs.forEach(doc => {
          item = doc.data();
          item.id = doc.id,
          this.items.push(item)
        });
      });
    },
    route:function(id){
      let doc_id = id;
      this.$router.push({name: 'product', params: {id: doc_id}});
    }
  },
  created(){this.fetchItems()},
  computed:{
      filteredProduct:function(){
          return this.items.filter((item) => {return item.title.toLowerCase().match(this.search.toLowerCase()) || item.company.toLowerCase().match(this.search.toLowerCase());})
      }
  }
}

</script>

<style scoped>
.v-card--reveal {
  align-items: flex-start;
  bottom: 0;
  justify-content: flex-start;
  opacity: 0.5;
  position: absolute;
  width: 100%; 
}

p {
    text-align:start;
    padding-left:20px;
}
</style>