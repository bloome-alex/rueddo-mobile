<template>
  <v-app>
    <v-app-bar height="80" class="px-1" app>
        <v-app-bar-nav-icon icon="person"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <span class="text-h6">Próximo destino: {{ alphabet[index] }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small class="mr-4">
            <v-avatar color="#3C2190">
                <v-icon color="white">alarm</v-icon>
            </v-avatar>
        </v-btn>
    </v-app-bar>
    <v-card widht="100%" height="40vh" v-if="loadPropsGoogleMaps">
        <google-maps :origin="myCurrentLocation" :destinations="destination"></google-maps>
    </v-card>
    <v-card height="55vh">
        <v-row>
            <v-col offset="1" cols="10" class="mt-4 mb-2">
                <v-btn color="success" block @click="nextTravel" :disabled="nextTravelButtonDisabled">Llegué</v-btn>
            </v-col>
            <v-col offset="1" cols="10" class="mt-2 mb-2">
                <v-btn color="secondary" block :disabled="!nextTravelButtonDisabled">Finalizar viaje</v-btn>
            </v-col>
            <v-col offset="1" cols="10" class="my-2">
                <v-btn color="error" block>Cancelar viaje</v-btn>
            </v-col>
        </v-row>
        <v-card-title>Detalles del viaje: </v-card-title>
        <v-card-text>
            <v-icon>place</v-icon><b>Dirección: </b>{{ destinations[0].address }}<br/><br/>
            <v-icon>home</v-icon><b>Piso / Dto: </b>{{ destinations[0].floor }}<br/><br/>
            <v-icon>contact_page</v-icon><b>Contacto: </b>{{ destinations[0].contact }}<br/><br/>
            <v-icon>phone</v-icon><b>Telefono: </b>{{ destinations[0].phone }}<br/><br/>
            <v-icon>question_answer</v-icon><b>Mensaje (opcional): </b>{{ destinations[0].message }}<br/><br/>
        </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
    import { ProfileMenu } from '@/components/ProfileMenu'
    import { GoogleMaps } from '@/components/googlemaps'
import { mapMutations } from 'vuex'

    export default {
        name: 'NextTravel',
        components: {
            ProfileMenu,
            GoogleMaps
        },
        data(){
            return {
                nextTravelButtonDisabled: false,
                loadPropsGoogleMaps: false,
                alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
                profileMenu: false,
                myCurrentLocation: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        created(){
            this.getCurrentLocation()
        },
        computed: {
            destination(){
                return [{
                    lat: this.destinations[0].lat,
                    lng: this.destinations[0].lng
                }]
            },
            destinations(){
                console.log('destinations: ', [{
                    lat: this.$store.state.nextTravel.origin.lat,
                    lng: this.$store.state.nextTravel.origin.lng,
                    address: this.$store.state.nextTravel.origin.address,
                    floor: this.$store.state.nextTravel.origin.floor,
                    contact: this.$store.state.nextTravel.origin.contact,
                    phone: this.$store.state.nextTravel.origin.phone,
                    message: this.$store.state.nextTravel.origin.message
                }])
                if(this.$store.state.nextTravel.index == 0) return [{
                    lat: this.$store.state.nextTravel.origin.lat,
                    lng: this.$store.state.nextTravel.origin.lng,
                    address: this.$store.state.nextTravel.origin.address,
                    floor: this.$store.state.nextTravel.origin.floor,
                    contact: this.$store.state.nextTravel.origin.contact,
                    phone: this.$store.state.nextTravel.origin.phone,
                    message: this.$store.state.nextTravel.origin.message
                }]
                return [{
                    lat: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].lat,
                    lng: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].lng,
                    address: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].address,
                    floor: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].floor,
                    contact: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].contact,
                    phone: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].phone,
                    message: this.$store.state.nextTravel.destinations[this.$store.state.nextTravel.index - 1].message
                }]
            },
            index(){
                return this.$store.state.nextTravel.index
            }
        },
        methods:{
            ...mapMutations(['travelNext']),
            nextTravel(){
                this.travelNext()
                this.loadPropsGoogleMaps = false
                setTimeout(()=>{
                    if(this.$store.state.nextTravel.index === this.$store.state.nextTravel.destinations.length){
                        this.nextTravelButtonDisabled = true
                    }
                    this.loadPropsGoogleMaps = true
                }, 1)
            },
            profileMenuChange(value){
                this.profileMenu = value
            },
            getCurrentLocation(){
                if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    this.myCurrentLocation = {
                        address: 'Tu ubicación',
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    this.loadPropsGoogleMaps = true
                })
                } else {
                console.log("Geolocation is not suported by this browser")
                }
            },
        }
    }
</script>

<style>
    body{
        overflow-y: hidden
    }
</style>