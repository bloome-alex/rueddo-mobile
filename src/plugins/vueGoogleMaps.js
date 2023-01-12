import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyA3RF6XSAF3YwB89_68mqta7kt9qwfPgx8',
        libraries: 'places',
    }
});

export default VueGoogleMaps