<template>
    <gmap-map ref="mapRef" 
    :center="myCurrentLocation"
    :zoom="13"
    map-type-id="roadmap"
    style="width:100%; height:100%;"
    disableDefaultUI="true"
    :options="{
      disabledDefaultUi: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      zoomControl: false,
    }"
    > 
        <gmap-marker :position="myCurrentLocation">
            <v-img src="../../assets/login-hero.png" style="z-index: 60;"/>
        </gmap-marker>  
    </gmap-map>
  </template>
  
  <script>
  import { gmapApi } from 'vue2-google-maps'
  
  export default {
    props:{
      originLat:{
        type: Number,
        required: false,
        default: 0
      },
      originLng:{
        type: Number,
        required: false,
        default: 0
      },
      destinationLat:{
        type: Number,
        required: false,
        default: 0
      },
      destinationLng:{
        type: Number,
        required: false,
        default: 0
      }
    },
    data(){
      return{
        myCurrentLocation: {
          lat: 0,
          lng: 0
        },
        destination: {
          lat: 0,
          lng: 0
        }
      }
    },
    created(){
      if(this.originLat == 0 || this.originLng == 0){
        this.getCurrentLocation()
      }else {
        this.myCurrentLocation = {
          lat: this.originLat,
          lng: this.originLng
        }
      }
      if(this.destinationLat != 0 || this.destinationLng != 0){
        this.destination = {
          lat: this.destinationLat,
          lng: this.destinationLng
        }
        this.drawLineBetweenEndPoints()
      }
    },
    methods:{
      getCurrentLocation(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {
            this.myCurrentLocation = {
                address: 'Tu ubicación',
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
          })
        } else {
          console.log("Geolocation is not suported by this browser")
        }
      },
      get Google(){
        return gmapApi
      },
      drawLineBetweenEndPoints(){
        console.log('DRAWING')
        let google = this.Google()
  
        let directionService = new google.maps.DirectionsService()
        let directionDisplay = new google.maps.DirectionsRenderer()
  
        let travel = {
          origin: this.myCurrentLocation,
          destination: this.destination,
          travelMode: 'DRIVING'
        }
  
        console.log('TRAVEL: ', travel)

        directionService.route(travel, (res, status) => {
          if(status === 'OK'){
            let map = this.$refs.mapRef
  
            directionDisplay = new google.maps.DirectionsRenderer({
              polylineOptions:{
                strokeColor: "#2ab4a6",
                stropeOpacity: 0.8,
                strokeWeight: 5,
              }
            })
            directionDisplay.setMap(map.$mapObject)
            directionDisplay.setDirections(res)
          }
        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>