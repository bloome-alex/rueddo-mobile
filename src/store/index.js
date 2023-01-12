import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'

Vue.use(vuejsStorage)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorAlert: false,
    errorAlertText: '',
    token: '',
  },
  getters: {
  },
  mutations: {
    setErrorAlert(state, payload){
      state.errorAlert = payload
    },
    setErrorAlertText(state, payload){
      state.errorAlertText = payload
    },
    setToken(state, payload){
      state.token = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    vuejsStorage({
      keys: ['token']
    })
  ]
})
