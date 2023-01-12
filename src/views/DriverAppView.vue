<template>
  <v-app>
    <v-app-bar height="80" class="px-1">
      <v-row align-self="center" justify="center">
        <v-col cols="2" align-self="center" justify="center">
          <v-btn icon outlined>
            <v-icon>person</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4" align-self="center" justify="center">
          <v-btn text rounded block>
            {{$t('driver.enServicio')}}
          </v-btn>
        </v-col>
        <v-col cols="4" align-self="center" justify="center">
          <v-btn text rounded block>
            {{$t('driver.apagar')}}
          </v-btn>
        </v-col>
        <v-col cols="2" align-self="center" justify="center">
          <v-btn icon small>
            <v-avatar color="#3C2190">
              <v-icon color="white">alarm</v-icon>
            </v-avatar>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card widht="100%" height="100%">
      <google-maps />
    </v-card>
    <new-travel-dialog v-if="newTravel" v-model="newTravel" :travel="travel"></new-travel-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'
import { NewTravelDialog } from '../components/newTravelDialog'
import { GoogleMaps } from '../components/googlemaps'
import { mapMutations } from 'vuex'

  export default {
    name: 'DriverAppView',
    components: {
      GoogleMaps,
      NewTravelDialog
    },
    data(){
      return{
        show: true,
        newTravel: false,
        travel: {}
      }
    },
    computed: {
      token(){
        return this.$store.state.token
      }
    },
    sockets:{
      DRIVER_CONNECTED(){
        console.log('driver connected')
      },
      ERROR_TO_CONNECT_DRIVER(){
        console.log('error to connect driver')
      },
      driver_new_travel(payload){

        console.log('payload: ', payload)

        this.travel = payload
        this.newTravel = true
      }
    },
    async mounted(){
      if(this.$route.query.travelAccept == 1){
        this.newTravel = true
      }
      this.$socket.emit('driver_connected', this.$store.state.token)
      axios.post(process.env.VUE_APP_API+'/api/auth', {
        token: this.token
      }).then(({data: {user}}) => {
        if(user.role != 'DRIVER'){
          this.show = false
          this.setErrorAlert(true)
          this.setErrorAlertText(this.$t('Alert.noTienePermisos'))
          this.$router.push({
            name: 'home'
          })
        }
      }).catch(() => {
        this.show = false
        this.setErrorAlert(true)
        this.setErrorAlertText(this.$t('Alert.algoImprevisto'))
        this.$router.push({
          name: 'home'
        })
      })
    },
    methods:{
      ...mapMutations(['setErrorAlert', 'setErrorAlertText']),
    }
  }
</script>

