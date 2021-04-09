<template>
    <div id="store">
    <shopper-header></shopper-header>
    <v-container fluid fill-height grid-list-lg>
        <v-layout row wrap align-content-start>
            <v-flex xs4 md3>
                <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <v-card color="#c9AA88" class="elevation-8 fill-height">
                        <v-container fluid grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12 class="stores-list">
                                    <br>
                                    <h1>All Stores</h1>
                                    <br>
                                    <v-container fluid class="stores-list-container">
                                        <v-layout row wrap>
                                            <ul>
                                                <v-flex xs12 v-for="store in stores" :key="store.id" 
                                                    class="store-container" @mouseover="hoveredOnStore=store.id" @mouseleave="hoveredOnStore=null" :class="[(hoveredOnStore===store.id && selectedStore!==store.id)? 'animated pulse store-hovered-on': '']">
                                                    <v-card class="store-item-card" 
                                                        @click.capture="onStoreClick(store,store.id)">
                                                        <v-card-text >
                                                            <a v-bind:href="store.website" target="_blank">{{store.name}}</a>
                                                            <p> {{store.Address}}</p>
                                                            <p>Singapore {{store.postalCode}}</p>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-flex>
                                            </ul>
                                        </v-layout>
                                    </v-container>
                                    
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <br>
                        <h1>Find Stores near me</h1> <br>
                        <p> Please ensure your browser enables location sharing </p>
                        <button v-on:click="trigger()"> Use Current Location </button> <br><br>
                    </v-card>
                    {{this.stores +this.useLocation}}

                </transition>
            </v-flex>
            <v-flex xs8 md9>
                <app-map-panel :testProp="useLocation" v-bind:stores="stores" v-bind:selectedStore="selectedStore" v-on:selectedMarker="selectedMarker"></app-map-panel>
            </v-flex>
        </v-layout>
    </v-container>
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
            storesEast:[],
            storesWest:[],
            storesNorth:[],
            storesSouth:[],
            storesCentral:[],
            selectedStore:{details:{},id:""},
            ignoreScrollToSelectedStore: false,
            hoveredOnStore: null,
            useLocation:0,
        }
    },
    watch: {
        selectedStore () {
            // need to wait until the selected store class changes
            if (this.ignoreScrollToSelectedStore) {
                this.ignoreScrollToSelectedStore = false
            } else {
                // triger the auto scroll only if the selection is triggered from outside the list
                setTimeout(() => {
                    this.scrollToSelectedStore()
                }, 50)
            }
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
        /** 
            console.log(this.stores)
            for(let i=0;i<this.stores.length;i++){
                var current = this.stores[i].region;
                console.log(this.stores[i].region)
                if(current=="central"){
                    this.storesCentral.push(this.stores[i]);
                } else if (current=="north"){
                    this.storesNorth.push(this.stores[i]);
                } else if (current=="south"){
                    this.storesSouth.push(this.stores[i]);
                } else if (current=="east"){
                    this.storesEast.push(this.stores[i]);
                } else if (current=="west"){
                    this.storesWest.push(this.stores[i]);
                }
            }
        },  */
        onStoreClick (store,id) {
            this.ignoreScrollToSelectedStore = true
            this.selectedStore = {details: store, id:id}
        },
        onRecenterMapLocation () {
            // need to emit the event to parent component
            // we can either use the event bus
            // or we can use vuex
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
            // scroll to the selected store
            const storesList = this.$el.querySelector('.container.stores-list-container')
            const selectedStore = this.$el.querySelector('.store-item-card.v-card.isSelected')
            if (storesList && selectedStore) {
                storesList.scrollTop = selectedStore.offsetTop - selectedStore.offsetHeight
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
.location-edit .inline-input {
    display: inline-flex;
    width: 70%;
}
.location-edit .inline-button {
    margin-left: 0;
    margin-right: 0;
}
.stores-list-container {
    padding-left: 0;
    padding-right: 0;
    height: 60vh;
    overflow: auto;
    padding-top: 10px;
}
.store-container {
    /*padding-left: 0!important;
    padding-right: 0!important;*/
}
.store-container.store-hovered-on .store-item-card {
    outline: 5px solid #9FA8DA;
    background-color: #BBDEFB;
}
.store-hours {
    padding-left: 20px;
}
.store-item-card {
    width: 500px;
    cursor: pointer;
}
.store-item-card.isSelected {
    border: 4px solid #5C6BC0;
    background-color: #BBDEFB;
}
.recenter-map-icon {
    cursor: pointer;
}
button {
  width: 400px;
  height: 120px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
}
</style>