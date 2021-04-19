<template>
    <div id="store">
        <shopper-header></shopper-header>
        <div id='contents'>
        <v-container fluid fill-height grid-list-lg>
            <v-layout row wrap align-content-start>
                <v-flex xs4 xs3>
                    <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <v-card color="#4ca08b" class="elevation-8 fill-height">
                            <v-container fluid grid-list-lg>
                                <v-layout row wrap>
                                    <v-flex xs12 class="stores-list">
                                        <br>
                                        <h1 id='title'>Eco-Friendly Stores</h1>
                                        <br>
                                        <v-container fluid class="stores-list-container">
                                            <v-layout row wrap>
                                                <ul>
                                                    <v-flex xs12 v-for="store in stores" :key="store.id" 
                                                        class="store-container" @mouseover="hoveredOnStore=store.id" @mouseleave="hoveredOnStore=null" :class="[(hoveredOnStore===store.id && selectedSt!==store.id)? 'animated pulse store-hovered-on': '']">
                                                        <v-card class="store-item-card" 
                                                            :class="{isSelected: selectedSt === store.id}"
                                                            @click.capture="onStoreClick(store,store.id)">
                                                            <v-card-text>
                                                                <a v-bind:href="store.website" target="_blank">{{store.name}}</a>
                                                                <p> {{store.Address}}<br>Singapore {{store.postalCode}}</p>                                                   
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-flex>
                                                </ul>
                                            </v-layout>
                                        </v-container>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <h1 id='titlenearby'>Find Stores Nearby!</h1>
                            <button v-on:click="trigger()"> Use Current Location </button>
                            <p id="locationsharing"> Please ensure your browser enables location sharing </p>
                        </v-card>
                    </transition>
                </v-flex>
                <v-flex xs8 sm9>
                    <app-map-panel :testProp="useLocation" v-bind:stores="stores" v-bind:selectedStore="selectedStore" v-on:selectedMarker="selectedMarker"></app-map-panel>
                </v-flex>
            </v-layout>
        </v-container>
        </div>
    </div>
</template>

<script>
import EventBus from '../../eventBus.js'
import db from '../../firebase.js'
import MapPanel from './MapPanel'

export default {
    data () {
        return {
            stores:[],
            selectedStore:{details:{},id:""},
            selectedSt:null,
            hoveredOnStore: null,
            useLocation:0,
        }
    },
    watch: {
        selectedStore () {
            setTimeout(() => {
                this.scrollToSelectedStore()
            }, 50)
        }
    },
    methods: {
        fetchItems:function(){
            db.collection('physicalStores').get().then(snapshot => {
                let item = []
                snapshot.docs.forEach(doc => {
                    item = doc.data();
                    item.id = doc.id,
                    this.stores.push(item)
                });
            });
        },
        onStoreClick (store,id) {
            this.selectedStore = {details: store, id:id}
            this.selectedSt = id
        },
        onRecenterMapLocation () {
            EventBus.recenterMapLocation()
        },
        selectedMarker (id) {
            for (let i=0;i<this.stores.length;i++){
                if (id==this.stores[i].id){
                    this.onStoreClick(this.stores[i],id);
                }
            }
        },
        scrollToSelectedStore () {
            const storesList = this.$el.querySelector('.container.stores-list-container')
            const selectedSt = this.$el.querySelector('.store-item-card.v-card.isSelected')
            console.log(storesList )
            console.log(selectedSt) 
            if (storesList && selectedSt) {
                console.log(selectedSt.offsetTop - selectedSt.offsetHeight)
                storesList.scrollTop = selectedSt.offsetTop - selectedSt.offsetHeight
            }
        },
        trigger () {
            this.useLocation +=1;
        },
    },
    components: {
        'app-map-panel': MapPanel
    },
    created(){
        this.fetchItems();
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');
#store{
    height:600px;
}
#contents{
    padding-top:80px;
}
#title {
  font-family: "Nunito";
  font-size: 20px;
  margin-top:-20px;
}
#titlenearby {
  font-family: "Nunito";
  font-size: 20px;
}
p{
  font-size:12px;
  font-family: "Nunito";
}
#locationsharing{
  margin-top:5px;
}
.stores-list-container {
  padding-left: 0;
  padding-right: 0;
  height: 60vh;
  overflow: auto;
  margin-top:-20px;
  font-family: "Nunito";
}
.store-container {
  padding-left: 0!important;
  padding-right: 0!important;
}
.store-container.store-hovered-on .store-item-card {
  outline: 5px solid #9FA8DA;
  background-color: #BBDEFB;
}
.store-item-card {
  width: 250px;
  cursor: pointer;
  height: auto;
  height:105px;
  font-family: "Nunito";
}
.store-item-card.isSelected {
  border: 4px solid #5C6BC0;
  background-color: #BBDEFB;
}
.recenter-map-icon {
  cursor: pointer;
}
button {
  width: 160px;
  height: 40px;;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  font-size:12px;
  font-family:"Nunito";
}
</style>