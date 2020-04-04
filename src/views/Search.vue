<template>
  <div class="near-offer">
    <div class="near-offer__div--offer-list">
      <div v-if="mobileListView" class="near-offer__div--offer-list-mobile">
        <div class="near-offer__div--offer-list-filters">
          <gmap-autocomplete @place_changed="setPlace"  id='xxxD' @keypress.enter="$event.preventDefault()">
            <template v-slot:input="slotProps">
              <v-text-field
                      class="near-offer__input--autocomplete"
                      prepend-inner-icon="place"
                      v-model="placeAddress"
                      :placeholder="$t('home.search')"
                      ref="input"
                      @listeners="slotProps.listeners"
                      @attrs="slotProps.attrs"
              ></v-text-field>
            </template>
          </gmap-autocomplete>

        </div>
        <div class="near-offer__div--offer-list-cards">
          <v-slider
                  v-model="radius"
                  color="#5C98C8"
                  class="near-offer__slider"
                  :label="$t('search.distance')"
                  :thumb-size="30"
                  step="0.5"
                  min="0.5"
                  max="15"
                  thumb-label="always"
          ></v-slider>
          <div v-if="activeUsers.length">
            <h3>{{$t('search.found')}} {{activeUsers.length}} {{activeUsers.length === 1 ? $t('search.user') : $t('search.users')}}</h3>
            <div v-for="(marker, index) in activeUsers" :key="index" @mouseover="test(marker)" :id="'card-' + index">
              <OfferCard :userInformation="marker"/>
            </div>
          </div>
          <div class="text-center" v-if="!activeUsers.length" v-t="'search.notFound'"/>
        </div>
      </div>
    </div>
    <Map
            v-if="mobileMapView"
            class="near-offer__map"
            :radius="radius"
            :centerOnMarker="centerOnMarker"
            @scrollToClickedCard="scrollToCard"
            :activeUsers="activeUsers"
            id="map"
    />
    <v-speed-dial
              v-if="isMobile"
              class="near-offer__speed-dial"
              absolute
              bottom
      >
        <template v-slot:activator>
          <v-btn
                  v-model="listView"
                  :color="listView?  '#F5B278' : '#5C98C8'"
                  dark
                  fab
                  @click="listView = !listView"
          >
            <v-icon v-if="listView">mdi-map</v-icon>
            <v-icon v-else>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
  </div>
</template>
<script>
import Map from '@/components/Map.vue'
import OfferCard from '@/components/OfferCard.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Search',
  components: {
    Map,
    OfferCard
  },
  computed: {
    ...mapState('places', ['searchedPlace', 'searchedCenter', 'markers']),
    mobileListView() {
      if (screen.width > 768)
        return true
      else
        return this.listView
    },
    mobileMapView() {
      if (screen.width > 768)
        return true
      else
        return !this.listView
    },
    isMobile() {
      return screen.width <= 768
    },
    activeUsers() {
      return this.markers.filter(marker => marker.generalInfo.activeUser) || []
    },
  },
  mounted() {
    this.placeAddress = this.searchedPlace.address ?
            this.searchedPlace.address
            :
            localStorage.getItem('nh-place-searched-address')
    if (this.searchedPlace.location.lat == null && this.searchedPlace.location.lng == null)
      this.SET_LOCATION_SEARCHED_PLACE(JSON.parse(localStorage.getItem('nh-place-searched-location')))
    if (this.searchedCenter.lat == null && this.searchedCenter.lng == null)
      this.SET_LOCATION_SEARCHED_CENTER(JSON.parse(localStorage.getItem('nh-place-searched-location')))
  },
  watch: {
    async radius(newValue) {
      const payload = {
        radius: newValue,
        geometry: this.searchedCenter
      }
      await this.searchPlaces(payload)
    }
  },
  data: () => ({
    radius: 1,
    placeAddress: '',
    listView: true,
    centerOnMarker: {}
  }),
  methods: {
    ...mapActions('places', ['searchPlaces', 'setSearchedAddress']),
    ...mapMutations('places', ['SET_LOCATION_SEARCHED_PLACE', 'SET_LOCATION_SEARCHED_CENTER']),
    test (marker) {
      this.centerOnMarker = marker
    },
    scrollToCard(index){
      this.listView = true
      setTimeout(() => {
         const card = document.getElementById(`card-${index}`)
        card.scrollIntoView()
        card.addEventListener("transitionend", () => {
          card.classList.remove('zoomIn')
          card.classList.add('zoomOut')
        })
        if (card.classList.contains('zoomOut'))
          card.classList.remove('zoomOut')
        card.classList.add('zoomIn')
        }, 50);
    },
    async setPlace (place) {
      await this.searchPlaces(place)
      this.setSearchedAddress(place)
    }
    // setDocHeight() {
    //   document.documentElement.style.setProperty('--vh', `${(window.innerHeight - 84) / 100}px`);
    // }
  }
}
</script>
<style scoped lang="scss">
  @media (min-width: 768px) {
    .near-offer {
      display: flex;
      height: 100%;
      background-color: #F5B278;
    &__div {
      &--offer-list {
        flex: 1.5;
        flex-shrink: 1.5;
        padding-right: 30px;
        padding-left: 30px;
        &-filters {
          padding-left: 20px;
          padding-right: 20px;
        }
        &-cards {
          /*height: 70vh;*/
          /*overflow-y: scroll;*/
          /*overflow-x: hidden;*/
          /*scrollbar-width: none;*/
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 30px;
          & > *:last-child {
            padding-bottom: 20px;
          }
        }
      }
      &--card-subtitile {
        color: white;
      }
    }
    &__slider {
      margin-top: 20px;
    }
    &__card {
      margin-top: 20px;
      border-radius: 10px !important;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    &__map {
      flex: 2;
      height: calc(100vh - 84px);
      position: sticky;
      top: 84px;
      padding-top: 30px;
      padding-right: 30px;
      padding-bottom: 30px;
    }
    &__input {
      &--autocomplete {
        margin-top: 20px;
      }
    }
  }
}
   @media (max-width: 768px) {
    .near-offer {
      display: flex;
      flex-direction: column;
      height: 100%;
      &__div {
        &--offer-list {
          /*padding-right: 30px;*/
          /*padding-left: 30px;*/
          /*height: calc(100vh - 84px);*/
          &-mobile {
            height: 80vh;
          }
          &-filters {
            padding-left: 20px;
            padding-right: 20px;
          }
          &-cards {
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            padding-left: 20px;
            padding-right: 20px;
            & > *:last-child {
              padding-bottom: 30px;
            }
          }
        }
        &--card-subtitile {
          color: white;
        }
      }
    &__slider {
      margin-top: 20px;
    }
    &__card {
      margin-top: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    &__map {
      /*height: calc(var(--vh, 1vh) * 100);*/
      height: 75vh;
      margin-bottom: 30px;
    }
    &__input {
      &--autocomplete {
        margin-top: 20px;
      }
    }
      &__speed-dial {
        display: flex;
        width: 100vw;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 10px;
      }
  }
    }
  .zoomIn {
    transform: scale(1.1);
    transition-duration: 0.2s;
  }
  .zoomOut {
    transform: scale(1);
    transition-duration: 0.2s;
  }

</style>
