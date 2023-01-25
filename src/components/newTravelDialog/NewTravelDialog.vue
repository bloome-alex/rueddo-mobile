<template>
  <v-dialog v-model="inputModel" width="1000" persistent>
      <v-card min-height="600" width="100%">
          <v-card-title class="justify-center">{{$t('notificacion.nuevoViaje.title')}}</v-card-title>
        <v-tabs
            v-model="tab"
            fixed-tabs
            center-active
            centered
        >
            <v-tabs-slider color="primary"></v-tabs-slider>
        
            <v-tab
                v-for="item in items"
                :key="item"
            >
            {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item">
                <v-card width="100%" height="400" v-if="item === 'Ubicación'">
                    <google-maps :origin="{lat: originLat, lng: originLng}" :destinations="destinations"/>
                </v-card>
                <v-card width="100%" height="400" v-if="item === 'Detalles del viaje'">
                    <v-card-text>
                        <v-icon left>place</v-icon> <b>Origen del viaje:</b> {{ origin }} <br /><br />
                        <v-icon left>place</v-icon> <b>Destino del viaje:</b> {{ destination }} <br /><br />
                        <v-icon left>timer</v-icon> <b>Fecha y hora:</b> {{ date }} <br /><br />
                        <v-icon left>local_shipping</v-icon> <b>Tamaño del vehículo:</b> {{ vehicleSize }} <br /><br />
                        <v-icon left>accessibility_new</v-icon> <b>Se necesita ayuda:</b> {{ helpers }} <br /><br />
                        <v-icon left>monetization_on</v-icon> <b>Metodo de pago: </b> {{ payMethod }} <br /><br />
                        <v-icon left>place</v-icon> <b>Ubicación del pago: </b> {{ payLocation }} <br /><br />
                    </v-card-text>
                </v-card>
                <v-card width="100%" height="400" v-if="item === 'Información adicional'" style="overflow: auto">
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Detalles del origen
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-icon>place</v-icon><b>Dirección: </b>{{ originAddress }}<br/><br/>
                                    <v-icon>home</v-icon><b>Piso / Dto: </b>{{ originFloor }}<br/><br/>
                                    <v-icon>contact_page</v-icon><b>Contacto: </b>{{ originContact }}<br/><br/>
                                    <v-icon>phone</v-icon><b>Telefono: </b>{{ originPhone }}<br/><br/>
                                    <v-icon>question_answer</v-icon><b>Mensaje (opcional): </b>{{ originMessage }}<br/><br/>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel v-for="(destination, index) in destinations" :key="index">
                                <v-expansion-panel-header>
                                    Detalles del destino ({{alphabet[index]}})
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-icon>place</v-icon><b>Dirección: </b>{{ destination.address }}<br/><br/>
                                    <v-icon>home</v-icon><b>Piso / Dto: </b>{{ destination.floor }}<br/><br/>
                                    <v-icon>contact_page</v-icon><b>Contacto: </b>{{ destination.contact }}<br/><br/>
                                    <v-icon>phone</v-icon><b>Telefono: </b>{{ destination.phone }}<br/><br/>
                                    <v-icon>question_answer</v-icon><b>Mensaje (opcional): </b>{{ destination.message }}<br/><br/>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <br/>
                        <v-icon>email</v-icon><b>Email de contacto: </b>{{ clientEmail }}
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn block color="primary" @click="acceptTravel">{{$t('notificacion.nuevoViaje.aceptar')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import {GoogleMaps} from '../googlemaps'

export default {
    name: 'NewTravelDialog',
    components: {
        GoogleMaps
    },
    props: {
        value: Boolean,
        travel: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            alphabet: ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
            originLat: this.travel.origin.lat,
            originLng: this.travel.origin.lng,
            destinations: this.travel.destinations,
            origin: this.travel.origin.address,
            destination: this.travel.destinations[0].address,
            date: this.travel.delivery, 
            vehicleSize: this.travel.vehicle, 
            helpers: this.travel.help, 
            payMethod: this.travel.methodOfPay, 
            payLocation: this.travel.payLocation, 
            originAddress: this.travel.origin.address, 
            originFloor: this.travel.origin.floor, 
            originContact: this.travel.origin.contact, 
            originPhone: this.travel.origin.phone, 
            originMessage: this.travel.origin.optionalMessage, 
            destinationAddress: this.travel.destinations[0].address, 
            destinationFloor: this.travel.destinations[0].floor, 
            destinationContact: this.travel.destinations[0].contact, 
            destinationPhone: this.travel.destinations[0].phone,
            destinationMessage: this.travel.destinations[0].optionalMessage,
            clientEmail: this.travel.designedClient,
            tab: null,
            items: [
                'Ubicación',
                'Detalles del viaje',
                'Información adicional'
            ]
        }
    },
    mounted(){
        console.log('travel: ', this.travel)
    },
    computed: {
        inputModel: {
            get(){
                return this.value
            },
            set(newValue){
                this.$emit('input', newValue)
            }
        }
    },
    methods: {
        ...mapMutations(['setNextTravel']),
        acceptTravel(){
            this.$socket.emit('accept_travel')
            this.inputModel = false
            this.setNextTravel({
                origin: {
                    lat: this.originLat,
                    lng: this.originLng,
                    address: this.originAddress,
                    floor: this.originFloor,
                    contact: this.originContact,
                    phone: this.originPhone,
                    message: this.originMessage
                },
                destinations: this.destinations,
                index: 0
            })
            this.$router.push('/next-travel')
        }
    }
}
</script>

<style>

</style>