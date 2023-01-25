<template>
  <Fragment>
    <v-card height="100%" width="100%" :loading="mapLoading">
      <gmap-map ref="mapRef" 
      v-if="mapEnabled"
      :center="myCurrentLocation"
      :zoom="13"
      map-type-id="roadmap"
      style="width:100%; height:100%; min-height: 60vh;"
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
    </v-card>
  </Fragment>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { mapMutations } from 'vuex'


export default {
  name: 'GoogleMaps',
  props: {
    destinations: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    origin: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return{
      mapLoading: false,
      mapEnabled: true,
      myCurrentLocation: {
        lat: 0,
        lng: 0
      }
    }
  },
  created(){
    console.log('created: ', {
      origin: this.origin,
      destinations: this.destinations
    })
    this.getCurrentLocation()
    if(this.destinations.length > 0){
      this.drawLineBetweenEndPoints()
    }
  },
  watch:{
    origin(){
      this.mapLoading = true
      this.mapEnabled = false
      setTimeout(() => {
        this.mapEnabled = true
        this.getCurrentLocation()
        this.mapLoading = false
      }, 0);
    }
  },
  methods:{
    ...mapMutations(['setOriginState', 'setTravelDuration', 'setTravelDistance', 'setAlertState', 'setAlertType', 'setAlertText']),
    getCurrentLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          if(Object.keys(this.origin).length === 0){
            this.myCurrentLocation = {
              address: this.$t('GoogleMap.1'),
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
          else{
            this.myCurrentLocation = {
              address: 'origin',
              lat: this.origin.lat,
              lng: this.origin.lng
            }
          }
        })
      } else {
        this.setAlertState(true)
        this.setAlertType('error')
        this.setAlertText(this.$t('GoogleMap.2'))
      }
    },
    get Google(){
      return gmapApi
    },
    drawLineBetweenEndPoints(){
      if(this.destinations.length > 0){
        let google = this.Google()
  
        let directionService = new google.maps.DirectionsService()
        let directionDisplay = new google.maps.DirectionsRenderer()
        
        console.log('direction service: ', directionService)

        console.log('destination: ', this.destinations)

        let travel = {
          origin: this.origin,
          destination: {
            lat: this.destinations[0].lat,
            lng: this.destinations[0].lng
          },
          travelMode: 'DRIVING'
        }
  
        console.log('googlemaps travel: ', travel)
        if(this.destinations.length > 1){

            const waypoints = this.destinations.map((destination, index) => {
              console.log('destination: ', destination)
              if(index != this.destinations.length - 1) return {
                location: destination
              }
            }).filter(el => el != null || el != undefined)

            console.log('waypoints: ', waypoints)

            let travel = {
              origin: this.origin,
              destination: {
                lat: this.destinations[this.destinations.length - 1].lat,
                lng: this.destinations[this.destinations.length - 1].lng
              },
              travelMode: 'DRIVING',
              waypoints
            }
    
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

                this.setTravelDistance(res.routes[0].legs[0].distance.text)
                this.setTravelDuration(res.routes[0].legs[0].duration.text)
                directionDisplay.setMap(map.$mapObject)
                directionDisplay.setDirections(res)
              }
            })
          return
        }
  
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
            this.setTravelDistance(res.routes[0].legs[0].distance.text)
            this.setTravelDuration(res.routes[0].legs[0].duration.text)
            directionDisplay.setMap(map.$mapObject)
            directionDisplay.setDirections(res)
          }
        })
      }
    }
  }
}
</script>

<style>

</style>