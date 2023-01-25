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
    nextTravel: {}
  },
  getters: {
  },
  mutations: {
    setNextTravel(state, payload){
      state.nextTravel = payload
    },
    travelNext(state){
      state.nextTravel.index ++
    },
    reset(state){
      const defaultState = {
        errorAlert: false,
        errorAlertText: '',
        token: '',
      }

      state.errorAlert = defaultState.errorAlert
      state.errorAlertText = defaultState.errorAlertText
      state.token = defaultState.token
      
    },
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
