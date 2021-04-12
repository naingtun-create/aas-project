<template>
    <div class="map-panel-container elevation-8 brown lighten-4">
        <googlemaps-map
            ref="map"
            class="map"
            :center.sync="mapCenter"
            :zoom.sync="zoom">

            <googlemaps-marker
                v-for="marker in mapMarkers"
                :key="marker.id"
                :title="marker.title"
                :animation="marker.animation"
                :icon="marker.icon"
                :position="marker.position"
                :popup="marker.popup"
                @click="onMapMarkerClick(marker.id)"
                @mouseover="onMapMarkerMouseOver(marker.id)"
                @mouseout="onMapMarkerMouseOut(marker.id)">
            </googlemaps-marker>
        </googlemaps-map>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            mapCenter: {lat: 0, lng: 0},
            myCoordinates: {lat: 0,lng: 0},
            zoom: 11,
            test:null,
            mapMarkers: null,
            mapMarkerIconSize: null,
            ignoreCenterOnSelectedStore: false,
            selectedLat:1.3521,
            selectedLong:103.8198,
            selectedMarker:null,
            imgLocation: 'https://image.flaticon.com/icons/png/128/684/684908.png',
            myLocation:'https://www.flaticon.com/svg/vstatic/svg/106/106175.svg?token=exp=1617872600~hmac=201d3e04f68d92cb330f8e01327208f8'
        }
    },
    props:{
        stores: {
            type: Array,
        },
        selectedStore: {
            type: Object,
        },
        testProp:{
            type:Number,
        },
    },
    watch: {
        selectedStore (newValue, oldValue) {
            this.selectMapMarker(oldValue, false)
            this.selectMapMarker(newValue, true)
        },
        testProp: function() {
            this.useLocation();
        },
    },
    methods: {
        ...mapActions(['onMapMarkerClick','centerOnStore','selectMapMarker']),
        // -------------------
        // events
        // -------------------
        onMapMarkerClick (id) {
            this.selectedMarker = id
            this.$emit('selectedMarker', this.selectedMarker);

        },
        onMapMarkerMouseOver (id) {
            const marker = this.mapMarkers[id]
            marker.animation = 1
            setTimeout(() => {
                marker.animation = 4
            }, 300)
        },
        onMapMarkerMouseOut (id) {
            const marker = this.mapMarkers[id]
            marker.animation = 4
        },
        // -------------------
        // other methods
        // -------------------
        addMapMarkers(){
            // go through the stores list and add a map marker for each
            let markers = {}
            for (let i = 0; i < Object.keys(this.stores).length; i++) {
                const marker = {}
                marker.id = this.stores[i].id
                marker.title = this.stores[i].name + '\n' + this.stores[i].Address
                marker.animation = 4
                marker.position = {
                    lat: this.stores[i].ip.latitude,
                    lng: this.stores[i].ip.longitude
                }
                marker.icon = null
                markers[this.stores[i].id] = marker
            }
            this.mapMarkers=markers
        },
        centerOnStore (location) {
            // will repositioned the map center to the specific location
            if (this.ignoreCenterOnSelectedStore) {
                this.ignoreCenterOnSelectedStore = false
            } else {
                if (location) {
                    this.mapCenter = location
                }
            }
        },
        recenterMapLocation (){
            setTimeout(() => {
                const location = {
                        lat: 1.3521,
                        lng: 103.8198
                    }
                this.addMapMarkers()    
                this.centerOnStore(location)
            }, 500);
        },
        selectMapMarker (store, isOn) {
            // will make the specified id marker either heilighted or not
                if (this.mapMarkers && this.mapMarkers[store.id]) {
                    if (isOn) {
                        const icon = {url:this.imgLocation, scaledSize: this.mapMarkerIconSize}
                        this.mapMarkers[store.id].icon = icon
                        this.mapMarkers[store.id].label = this.stores[store.id]
                        const storeLocation = Object.assign({}, this.mapMarkers[store.id].position)
                        this.centerOnStore(storeLocation)
                        this.zoom=14
                    } else {
                        const icon = null
                        this.mapMarkers[store.id].label = null
                        this.mapMarkers[store.id].icon = icon                        
                    }
            }
        },
        useLocation() {
            this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
                alert("Hold on! This might take a while!")
            setTimeout(() => {
                const location = {
                    lat: this.myCoordinates.lat,
                    lng: this.myCoordinates.lng
                }
                this.zoom=14;
                this.centerOnStore(location)
            }, 3000)
        }
        
    },
    created(){
        this.addMapMarkers();
        this.recenterMapLocation();
    },
    googleMapsReady () {
        this.mapMarkerIconSize = new window.google.maps.Size(100, 100)
    }
}
</script>
<style>
.map-panel-container {
    height: 100%;
}
.map {
    flex: 100% 1 1;
    height: 100%;
}
</style>