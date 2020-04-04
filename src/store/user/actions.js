import firebase from '@/firebase'
import { i18n } from '@/i18n/index.js'

const setUserUID = async ({ commit, dispatch, state }, user) => {
  try {
    commit('SET_USER_UID', user ? user.uid : null)
    commit('SET_USER_OBJECT', user ? user : null)
    localStorage.setItem('nh-user-information-mail', user ? user.email : '')
      if (state.userUID !== null)
        commit('notification/SET_SUCCESS_SNACK', i18n.t('notifications.logged.in'), { root: true })
    await dispatch('getUserInformation')
  } catch (e) {
    throw new Error(e)
  }
}

const loginEmail = async ({ commit, dispatch }, credentials) => {
    try {
        const response = await firebase.auth.signInWithEmailAndPassword(
            credentials.email, credentials.password
        )
        commit('SET_USER_UID', response.user.uid)
        await dispatch('getUserInformation')
        commit('notification/SET_SUCCESS_SNACK', i18n.t('notifications.logged.in'), { root: true })
    } catch (e) {
        commit('notification/SET_ERROR_SNACK', e.message, { root: true })
    throw new Error(e)
  }
}

const getUserInformation = async ({ commit, state }) => {
    try {
        if (state.userUID != null) {
            const response = await firebase.firestoreCollVol.doc(state.userUID).get()
            try {
                const responseData = response.data().d
                commit('SET_USER_INFORMATION', responseData)
                const userData = {
                    generalInfo: responseData.generalInfo,
                    address: responseData.address,
                    socialMedia: responseData.socialMedia,
                    location: {
                        lat: responseData.coordinates.latitude,
                        lng: responseData.coordinates.longitude
                    }
                }
                localStorage.setItem('nh-user-information', JSON.stringify(userData))
            } catch (e) {
                console.debug(e)
            }
        }
    } catch (e) {
        throw new Error(e)
    }
}

// const loginFacebook = async ({ commit }, credentials) => {
//     try {
//         const user = await firebase.auth.signInWithEmailAndPassword(
//             credentials.email, credentials.password
//         )
//         commit('SET_USER_UID', user.uid)
//     } catch (e) {
//     throw new Error(e)
//   }
// }

export default {
    setUserUID,
    loginEmail,
    getUserInformation
}
