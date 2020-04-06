import firebase from '@/firebase';

// const getPlaces = async ({ commit }) => {
//   try {
//     // const response = await mockedApi.get('new-event')
//     // commit('SET_FORM_SELECTS', response)
//   } catch (e) {
//     throw new Error(e)
//   }
// }

const setSearchedAddress = ({ commit }, place) => {
  const { formatted_address, geometry } = place;
  commit('SET_LOCATION_SEARCHED_PLACE', {
    lat: geometry.location.lat(),
    lng: geometry.location.lng(),
  });
  commit('SET_LOCATION_SEARCHED_CENTER', {
    lat: geometry.location.lat(),
    lng: geometry.location.lng(),
  });
  commit('SET_ADDRESS_SEARCHED_PLACE', formatted_address);
  localStorage.setItem('nh-place-searched-address', formatted_address);
  localStorage.setItem('nh-place-searched-location', JSON.stringify({
    lat: geometry.location.lat(),
    lng: geometry.location.lng(),
  }));
};

const searchPlaces = async ({ commit }, place) => {
// const searchPlaces = async ({ commit, state, dispatch }, data) => {
  try {
    const { geometry } = place;
    let lat = null;
    let lng = null;
    if (geometry.location) {
      lat = geometry.location.lat();
      lng = geometry.location.lng();
    } else {
      lat = geometry.lat;
      lng = geometry.lng;
    }
    const radius = 15;
    const query = firebase.geocollection.near({
      center: new firebase.firebase.firestore.GeoPoint(
        lat, lng,
      ),
      radius,
    });
    const markers = [];
    query.get().then((value) => {
      value.docs.forEach((doc) => {
        const {
          generalInfo, address, socialMedia, email,
        } = doc.data();
        markers.push({
          generalInfo,
          address,
          socialMedia,
          email,
          location: {
            lat: doc.data().coordinates.latitude,
            lng: doc.data().coordinates.longitude,
          },
        });
      });
      commit('SET_MARKERS', markers);
      localStorage.setItem('nh-markers-all-range', JSON.stringify(markers));
      localStorage.setItem('nh-markers-radius', radius);
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  // getPlaces,
  setSearchedAddress,
  searchPlaces,
};
