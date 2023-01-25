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
    </gmap-map>
  </template>
  
  <script>
  import { gmapApi } from 'vue2-google-maps'
  
  export default {
    props:{
      destination: {
        type: Object,
        required: true
      }
    },
    data(){
        return{
            myCurrentLocation: {
                lat: 0,
                lng: 0
            },
        }
    },
    created(){
        this.getCurrentLocation()
    },

    watch:{
        getCurrentLocation(){
            console.log('cambio')
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
            this.drawLineBetweenEndPoints({lat: position.coords.latitude, lng: position.coords.longitude})
          })
        } else {
          console.log("Geolocation is not suported by this browser")
        }
      },
      get Google(){
        return gmapApi
      },
      drawLineBetweenEndPoints(origin){
        let google = this.Google()
  
        let directionService = new google.maps.DirectionsService()
        let directionDisplay = new google.maps.DirectionsRenderer()

        let travel = {
          origin,
          destination: this.destination
        }

        console.log('travel: ', travel)

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