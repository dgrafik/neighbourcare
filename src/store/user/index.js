import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    userUID: null,
    userObject: null,
    userInformation: {
      generalInfo: {},
      address: {},
      socialMedia: {},
      location: {
        lat: null,
        lng: null,
      }
    },
  },
  actions,
  mutations
}
