<template>
  <v-card color="#3284DC" width="100%" height="100%" class="pa-10">
    <v-row justify="center">
      <v-img max-width="200" max-height="100" src="../assets/logo-rueddo-white.png" />
    </v-row>
    <v-row justify="center" class="mt-16">
      <v-img max-width="80%" src="../assets/login-hero.png" />
    </v-row>
    <v-row justify="center" class="mt-16">
      <v-text-field dark v-model="email" :label="$t('HomeView.email')"/>
    </v-row>
    <v-row justify="center">
      <v-text-field dark v-model="password" type="password" :label="$t('HomeView.contraseña')"/>
    </v-row>
    <v-row justify="center">
      <v-btn @click="login" :loading="loginButtonIsLoading" rounded block color="white" class="red--text text--darken1">Entrar</v-btn>
      <v-btn rounded text block color="white" class="mt-4">{{$t('HomeView.olvidéMiContraseña')}}</v-btn>
    </v-row>
    <v-row justify="center">
      <v-btn rounded block color="white" class="mt-4 orange--text">{{$t('HomeView.entrarConGoogle')}}</v-btn>
      <v-btn rounded text block color="white" class="mt-4">{{$t('HomeView.nuevoEnRueddo')}}</v-btn>
    </v-row>
  </v-card>
</template>

<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Home',
    data(){
      return{
        email:'',
        password:'',
        loginButtonIsLoading: false,
      }
    },
    methods:{
      ...mapMutations(['setErrorAlert', 'setErrorAlertText', 'setToken']),
      login(){
        this.loginButtonIsLoading = true
        axios.post(process.env.VUE_APP_API + '/api/login', {
          email: this.email,
          password: this.password
        }).then(({data: {token}}) => {
          this.setToken(token)
          this.$router.push('/app')
        }).catch(() => {
          this.setErrorAlert(true)
          this.setErrorAlertText(this.$t('Alert.credencialesInvalidas'))
        }).finally(()=>{
          this.loginButtonIsLoading = false
        })
      }
    }
  }
</script>
