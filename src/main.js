import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueGoogleMaps from './plugins/vueGoogleMaps'
import socketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import i18n from './i18n'

const SocketInstance = socketIO.connect(process.env.VUE_APP_API)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  vueGoogleMaps,
  render: h => h(App)
}).$mount('#app')
