<template>
    <div id = "OnlineMarketPlace">
      <shopper-header></shopper-header>
      <h1 id="title">Our Products</h1>
          <div id='search'>
            <v-toolbar floating width="400">   
                <v-text-field  single-line hide-details label="Search for products" prepend-icon="mdi-magnify" v-model="search"></v-text-field>
            </v-toolbar><br><br>
          </div>
           
          <div id='nav'>  
            <v-card>
                <v-card-title id="categories">Categories</v-card-title>
                <v-container class="pt-0" id="info" fluid>
                    <v-checkbox
                        label="All"
                        v-model="selectedCategories"
                        value="All"
                        hide-details
                        dense
                    ></v-checkbox>
                    <v-checkbox
                        label="ACCESSORY"
                        v-model="selectedCategories"
                        value="ACCESSORY"
                        hide-details
                        dense
                    ></v-checkbox>
                    <v-checkbox
                        label="CLEANING"
                        v-model="selectedCategories"
                        value="CLEANING"
                        hide-details
                        dense
                    ></v-checkbox>
                    <v-checkbox
                        label="CLOTHING"
                        v-model="selectedCategories"
                        value="CLOTHING"
                        hide-details
                        dense
                    ></v-checkbox>
                    <v-checkbox
                        label="FOOD and DRINK"
                        v-model="selectedCategories"
                        value="FOOD and DRINK"
                        hide-details
                        dense
                    ></v-checkbox>
                </v-container>
                <br>
                <v-divider></v-divider>
                <v-card-title id="categories">Sort By Price</v-card-title>
                <v-container class="pt-0" fluid>
                    <v-checkbox id="info"
                        label="Descending"
                        v-model="sortPrice"
                        hide-details
                        value = "Descending"
                        dense
                        @click = "sortByPrice"
                    ></v-checkbox>
                    <v-checkbox
                        label="Ascending"
                        v-model="sortPrice"
                        hide-details
                        value = "Ascending"
                        dense
                        @click = "sortByPrice"
                    ></v-checkbox>
                </v-container>
            </v-card>
          </div>
              
       
        <div id="content">          
            <v-container fluid>
                <v-layout>
                    <ul id="itemsList">
                        <li v-for="item in filteredProduct" :key="item.id">
                            <v-card class="mx-auto my-12" width="650" height = "830" color="#EBFFED">
                                <v-img height="500" v-bind:src="item.image"></v-img>
                                <div id='leftInfo'>
                                <h1 id="productTitle"><b>{{item.title}}</b></h1>
                                <p id='name'>{{item.companyName}}</p>
                                <p>CATEGORY: {{item.category}} </p>  
                                <p id="price"><b>$ {{item.price}}</b></p>
                                </div>         
                                <button id='rightBtn' v-on:click="route(item.id)">Learn More</button> 
                            </v-card>
                        </li>
                
                    </ul>
         
                </v-layout> 
            </v-container>  
        </div>
    </div>
</template>

<script>
import db from '../../firebase.js'

export default {
  name: 'OnlineMarketPlacePage',
  data(){
    return{
        items:[],
        search:"",
        sortPrice:"",
        selectedCategories:"All",
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
    },
    sortByPrice:function(){
      if(this.sortPrice == "Descending"){
        this.items.sort(function(a, b) {return parseFloat(b.price) - parseFloat(a.price);});
      } else{
        this.items.sort(function(a, b) {return parseFloat(a.price) - parseFloat(b.price);});
      }
    },
    selectByCategory:function(){
      this.items.filter(item => item.category.toLowerCase() == this.selectedCategories.toLowerCase());
    }
  },
  created(){this.fetchItems()},
  computed:{
      filteredProduct:function(){
        var finalList = []
        finalList = this.items
        if(this.search != "" && this.selectedCategories != "All"){
          finalList = this.items.filter((item) => {return item.category.toLowerCase().match(this.selectedCategories.toLowerCase()) && (item.title.toLowerCase().match(this.search.toLowerCase()) || item.company.toLowerCase().match(this.search.toLowerCase()));})
        } else if(this.search != ""){
          finalList = this.items.filter((item) => {return item.title.toLowerCase().match(this.search.toLowerCase()) || item.company.toLowerCase().match(this.search.toLowerCase());})
        } else if(this.selectedCategories != "All"){
          finalList = this.items.filter((item) => {return item.category.toLowerCase().match(this.selectedCategories.toLowerCase())});
        } 
        return finalList;
      }
  }
}

</script>

<style scoped>
#title{
  font-weight: bold;
  font-size:80px;
  font-family: 'Montserrat', sans-serif;
  padding-top:30px
}
#nav {
  float: left;
  width: 20%;
  padding: 30px; 
  padding-top:180px;
  margin-left:10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;

}
#content {
  float: right;
  width: 78%;
  height: 700px; 
  margin-top:10px;
}  
#search {
  float: right;
  height: 100px; 
  padding: 10px; 
  margin-right:30px;
} 

#rightBtn{
  width: 30%;
  float: right;
  margin-right:40px;
  margin-top:110px
}

#leftInfo{
  width: 60%;
  float: left;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  text-align:start;
  padding:20px;
}
p {
    text-align:start;
    padding-left:25px;
}
#price {
  font-size:40px;
}
#name {
  font-size:30px;
  font-family: 'Montserrat', sans-serif;
}
#info{
  font-size:20px;
  font-family: 'Montserrat', sans-serif;
}
#categories{
  font-size:30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
button {
  height: 120px;
  background-color: #c9AA88;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border-width: 1px;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
}
</style>