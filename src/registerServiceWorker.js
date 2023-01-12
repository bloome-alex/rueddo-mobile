/* eslint-disable no-console */

import axios from 'axios'
import { register } from 'register-service-worker'

console.log('this register: ', `${process.env.BASE_URL}/worker.js`)

register(`http://localhost:7000/`, {
  ready () {
    
  },
  async registered (registration) {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.VUE_APP_PUSHWEB_PUBLIC_VAPID_KEY
    })
    console.log(subscription)
    try {
      await axios.post(process.env.VUE_APP_API + '/api/subscribe', subscription)
    } catch (error) {
      console.log('error: ', error)
    }
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
    console.log('Service worker has been registered.')
  },
  cached () {
    console.log('Content has been cached for offline use.')
  },
  updatefound () {
    console.log('New content is downloading.')
  },
  updated () {
    console.log('New content is available; please refresh.')
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
