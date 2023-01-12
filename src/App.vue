<template>
  <v-app>
    <v-main style="max-width:100vw; max-height: 100vh;">
      <router-view/>
    </v-main>
    <v-snackbar bottom color="rgba(0,0,0,0)" elevation="0" v-model="error">
      <v-alert type="error">
        {{errorText}}
      </v-alert>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    error:{
      get(){
        return this.$store.state.errorAlert
      },
      set(value){
        this.setErrorAlert(value)
      }
    },
    errorText(){
      return this.$store.state.errorAlertText
    }
  },
  methods:{
    ...mapMutations(['setErrorAlert'])
  }
};
</script>