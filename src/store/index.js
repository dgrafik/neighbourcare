import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import places from './places'
import notification from './notification'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    places,
    notification,
  }
})
