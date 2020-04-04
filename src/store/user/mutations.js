const SET_USER_UID = (state, uid) => {
  state.userUID = uid
}

const SET_USER_INFORMATION = (state, user) => {
   state.userInformation.generalInfo = user.generalInfo
   state.userInformation.address = user.address
   state.userInformation.socialMedia = user.socialMedia
   state.userInformation.location = {
     lat: user.coordinates.latitude,
     lng: user.coordinates.longitude
   }
}

const SET_USER_OBJECT = (state, user) => {
  state.userObject = user
}

export default {
  SET_USER_UID,
  SET_USER_INFORMATION,
  SET_USER_OBJECT
}
