<template>
    <div class="map-panel-container elevation-8 brown lighten-4">
        <input type='text' placeholder='Put in your address to check out stores in the area!'
         v-model='address' @click='locatorButtonPressed' id='autocomplete' />

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
            address:"",
            mapCenter: {lat: 0, lng: 0},
            myCoordinates: {lat: 0,lng: 0},
            zoom: 11,
            test:null,
            error:"",
            spinner:false,
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
        addMapMarkers(){
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
            alert("Please enable location services. Hold on! This might take a while!")
            this.$getLocation({})
                .then(coordinates => {
                    this.myCoordinates = coordinates;
                })
                .catch(error => alert(error));
            setTimeout(() => {
                const location = {
                    lat: this.myCoordinates.lat,
                    lng: this.myCoordinates.lng
                }
                this.zoom=14;
                this.centerOnStore(location)
            }, 5000)
        },
        locatorButtonPressed(){
            console.log(this.address);
            this.spinner=true;
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.getAddressFrom(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        this.showUserLocationOnMap(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                    },
                    () => {
                        this.error = 
                            "Locator is unable to find your address. Please type your address manually.";
                        this.spinner=false;
                    }
                );
            } else {
                this.spinner = false;
                console.log("Your browser does not support Geolocation API");
            }
        },

        showUserLocationOnMap(latitude,longitude){
            new window.google.maps.Marker({
                position: new window.google.maps.LatLng(latitude,longitude),
            })
        }
    },
    created(){
        this.addMapMarkers();
        this.recenterMapLocation();
    },
    googleMapsReady () {
        this.mapMarkerIconSize = new window.google.maps.Size(100, 100)
    },
    mounted(){
        let autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            {
                bounds: new window.google.maps.LatLngBounds(
                    new window.google.maps.LatLng(1.3521,103.8198)
                )
            }
        );
        autocomplete.addListener("place_changed",() => {
            let place = autocomplete.getPlace();
            this.myCoordinates.lat = place.geometry.location.lat()
            this.myCoordinates.lng = place.geometry.location.lng()
            const location = {
                    lat: this.myCoordinates.lat,
                    lng: this.myCoordinates.lng
                }
            this.zoom=14;
            this.centerOnStore(location)
        })
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap");
.map-panel-container {
  height: 100%;
}
.map {
  flex: 100% 1 1;
  height: 100%;
}
#autocomplete{
    width:100%;
    height:50px;
    text-align:center;
    background-color:white;
    font-family:'Nunito';
}
.pac-item{
    padding:10px;
    font-size:16px;
    cursor:pointer;
}
.pac-item:hover{
    background-color: blue;
}
.pac-item-query{
    font-size:16px;
}
</style>