<template>
  <v-app app>
    <v-app-bar height="80" class="px-1" app>
      <v-row align-self="center" justify="center">
        <v-col cols="2" align-self="center" justify="center">
          <v-btn icon outlined @click="profileMenu=true">
            <v-icon>person</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4" align-self="center" justify="center">
          <v-btn text rounded block @click="openService" :color="inServiceColor">
            {{$t('driver.enServicio')}}
          </v-btn>
        </v-col>
        <v-col cols="4" align-self="center" justify="center">
          <v-btn text rounded block @click="closeService" :color="outServiceColor">
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
      <google-maps/>
    </v-card>
    <new-travel-dialog v-if="newTravel" v-model="newTravel" :travel="travel"></new-travel-dialog>
    <profile-menu :value="profileMenu" @on-change="profileMenuChange"/>
  </v-app>
</template>

<script>
import axios from 'axios'
import { NewTravelDialog } from '../components/newTravelDialog'
import { GoogleMaps } from '../components/googlemaps'
import { mapMutations } from 'vuex'
import { ProfileMenu } from '@/components/ProfileMenu'

  export default {
    name: 'DriverAppView',
    components: {
      GoogleMaps,
      NewTravelDialog,
      ProfileMenu
    },
    data(){
      return{
        inServiceColor: 'grey',
        outServiceColor: 'red',
        inService: false,
        profileMenu: false,
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
      client_cancel_need_vehicle(){
        if(this.inService){
          this.travel = {}
          this.newTravel = false
          this.setErrorAlert(true)
          this.setErrorAlertText('El cliente canceló el viaje')
        }
      },
      DRIVER_CONNECTED(){
        if(this.inService){
          console.log('driver connected')
        }
      },
      ERROR_TO_CONNECT_DRIVER(){
        if(this.inService){
          console.log('error to connect driver')
        }
      },
      driver_new_travel(payload){
        if(this.inService){
          this.travel = payload
          this.newTravel = true
        }
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
      profileMenuChange(value){
        this.profileMenu = value
      },
      async openService(){
        const {data: {user: {driverEnabled}}} = await axios.post(process.env.VUE_APP_API + '/api/auth', {
          token: this.$store.state.token
        })

        if(driverEnabled){
          this.inService = true
          this.inServiceColor = 'success'
          this.outServiceColor = 'grey' 
        }
        else{
          this.setErrorAlert(true)
          this.setErrorAlertText('No estas habilitado para ponerte en servicio.')
        }

      },
      closeService(){
        this.inService = false
        this.inServiceColor = 'grey'
        this.outServiceColor = 'red'
      }
    }
  }
</script>

