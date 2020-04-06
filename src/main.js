/*eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps"
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { i18n } from '@/i18n/index.js'
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCs6tLc1gAnB4uqpIzgZciRxENSCsnncHg",
    libraries: "places" // necessary for places input
  }
});

Vue.use(CustomGoogleAutocomplete)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
