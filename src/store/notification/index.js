import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    notification: {
      text: '',
      visible: false,
      timeout: 0,
      color: ''
    }
  },
  mutations
}
