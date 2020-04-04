const SET_SUCCESS_SNACK = (state, text) => {
  state.notification = {
      text: text,
      visible: true,
      timeout: 4000,
      color: '#6CBD6F'
    }
}

const SET_ERROR_SNACK = (state, text) => {
  state.notification = {
      text: text,
      visible: true,
      timeout: 4000,
      color: 'error'
    }
}

const SET_INFO_SNACK = (state, text) => {
  state.notification = {
      text: text,
      visible: true,
      timeout: 10000,
      color: '#5C98C8'
    }
}

export default {
  SET_SUCCESS_SNACK,
  SET_ERROR_SNACK,
  SET_INFO_SNACK
}
