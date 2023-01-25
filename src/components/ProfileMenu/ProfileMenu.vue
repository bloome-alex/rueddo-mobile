<template>
  <v-navigation-drawer v-model="drawer" width="100%" app left temporary>
    <v-list>
        <v-btn block plain @click="drawer = false">Inicio</v-btn>
        <v-btn block plain @click="closeSesion">Cerrar sesión</v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'ProfileMenu',
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        drawer: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('on-change', value)
            }
        }
    },
    methods:{
        ...mapMutations(['reset']),
        closeSesion(){
            this.reset()
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>