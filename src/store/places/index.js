import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    searchedPlace: {
      location: {
        lat: null,
        lng: null,
      },
      address: null
    },
    markers: [],
    searchedCenter: {
        lat: null,
        lng: null,
      },
  },
  actions,
  mutations
}
