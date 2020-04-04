const SET_ADDRESS_SEARCHED_PLACE = (state, placeAddress) => {
  state.searchedPlace.address = placeAddress
}

const SET_LOCATION_SEARCHED_PLACE = (state, placeLocation) => {
  state.searchedPlace.location = { ...placeLocation }
}

const SET_LOCATION_SEARCHED_CENTER = (state, placeLocation) => {
  state.searchedCenter = { ...placeLocation }
}

const SET_MARKERS = (state, markers) => {
  state.markers = markers
}

export default {
  SET_ADDRESS_SEARCHED_PLACE,
  SET_LOCATION_SEARCHED_PLACE,
  SET_LOCATION_SEARCHED_CENTER,
  SET_MARKERS
}
