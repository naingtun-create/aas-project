<template>
    <div id="store">
    <shopper-header></shopper-header>
    <v-container fluid fill-height grid-list-lg>
        <v-layout row wrap align-content-start >
            <v-flex xs4 sm3>
                <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <v-card color="cyan accent-4" class="elevation-8 fill-height">
                        <v-container fluid grid-list-lg>
                            <v-layout row wrap>

                                <v-flex xs12 class="stores-list">
                                    <div class="subheading">Nearby Stores</div>
                                    <v-container fluid class="stores-list-container">
                                        <v-layout row wrap>
                                            <ul>
                                                <v-flex xs12 v-for="store in stores" :key="store.id"
                                                    class="store-container" @mouseover="hoveredOnStore=store.id" @mouseleave="hoveredOnStore=null" :class="[(hoveredOnStore===store.id && selectedStore!==store.id)? 'animated pulse store-hovered-on': '']">
                                                    <v-card class="store-item-card"
                                                        :class="{isSelected: selectedStore === store.id}"
                                                        @click.capture="onStoreClick(store.id)">
                                                        <v-card-text>
                                                            <p>{{store.name}}</p>
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
                    </v-card>
                </transition>
            </v-flex>
            <v-flex xs8 sm9>
                <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                    <app-map-panel v-bind:stores="stores" v-bind:selectedStore="selectedStore"></app-map-panel>
                </transition>
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
            selectedStore:null,
            ignoreScrollToSelectedStore: false,
            hoveredOnStore: null
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
        onStoreClick (storeId) {
            this.ignoreScrollToSelectedStore = true
            this.selectedStore = storeId
        },
        onRecenterMapLocation () {
            // need to emit the event to parent component
            // we can either use the event bus
            // or we can use vuex
            EventBus.recenterMapLocation()
        },
    },
    components: {
        'app-map-panel': MapPanel
    },
    created(){
        this.fetchItems()
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
    cursor: pointer;
}
.store-item-card.isSelected {
    border: 4px solid #5C6BC0;
    background-color: #BBDEFB;
}
.recenter-map-icon {
    cursor: pointer;
}
</style>