<template>
  <div class="near-offer">
    <div
      v-if="mobileListView"
      class="near-offer__div--offer-list"
    >
      <div class="near-offer__div--offer-list-mobile">
        <div class="near-offer__div--offer-list-filters">
          <gmap-autocomplete
            class="near-offer__autocomplete"
            @place_changed="setPlace"
            @keypress.enter="$event.preventDefault()"
          >
            <template v-slot:input="slotProps">
              <v-text-field
                ref="input"
                v-model="placeAddress"
                class="near-offer__input--autocomplete"
                prepend-inner-icon="place"
                :placeholder="$t('home.search')"
                @listeners="slotProps.listeners"
                @attrs="slotProps.attrs"
              />
            </template>
          </gmap-autocomplete>
        </div>
        <div class="near-offer__div--offer-list-cards">
          <span class="near-offer__span--slider">
            <span class="near-offer__span--slider-text">
              {{ $t('search.distance', {radius: this.radius} )}}
            </span>
            <VueSlider
              v-model="radius"
              :min="0.5"
              :max="15"
              :interval="0.5"
              class="near-offer__slider"
              tooltip="none"
            />
          </span>
          <v-autocomplete
            v-model="appliedFilters"
            :items="categoryOptions"
            chips
            small-chips
            :label="$t('search.categoryFilter')"
            multiple
            clearable
            deletable-chips
            hide-selected
            outlined
            dense
          >
            <template v-slot:selection="data">
              <v-chip
                color="#5C98C8"
                text-color="white"
                close
                @click:close="removeCategoryFilter(data.item.value)"
              >
                {{ data.item.text }}
              </v-chip>
            </template>
          </v-autocomplete>
          <div v-if="filteredUsers.length">
            <h3>
              {{ $t('search.found') }} {{ filteredUsers.length }} {{ filteredUsers.length === 1 ? $t('search.user')
                : $t('search.users') }}
            </h3>
            <div
              v-for="(marker, index) in filteredUsers"
              :id="'card-' + index"
              :key="index"
              @mouseover="test(marker)"
            >
              <OfferCard :user-information="marker" />
            </div>
          </div>
          <div
            v-if="!filteredUsers.length"
            v-t="'search.notFound'"
            class="text-center"
          />
        </div>
      </div>
    </div>
    <Map
      v-if="mobileMapView"
      id="map"
      class="near-offer__map"
      :radius="radius"
      :center-on-marker="centerOnMarker"
      :active-users="filteredUsers"
      @scrollToClickedCard="scrollToCard"
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
          :color="listView? '#F5B278' : '#5C98C8'"
          dark
          fab
          @click="listView = !listView"
        >
          <v-icon v-if="listView">
            mdi-map
          </v-icon>
          <v-icon v-else>
            mdi-format-list-bulleted-square
          </v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </div>
</template>
<script>
import Map from '@/components/Map.vue';
import OfferCard from '@/components/OfferCard.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { CATEGORY_IDS, MOBILE_BREAKPOINT_NAMES } from '@/utils/constants';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { isPointWithinRadius } from 'geolib';

export default {
  name: 'Search',
  components: {
    Map,
    OfferCard,
    VueSlider,
  },
  computed: {
    ...mapState('places', ['searchedPlace', 'searchedCenter', 'markers']),
    mobileListView() {
      if (!this.isMobile) return true;
      return this.listView;
    },
    mobileMapView() {
      if (!this.isMobile) return true;
      return !this.listView;
    },
    isMobile() {
      return MOBILE_BREAKPOINT_NAMES.includes(this.$vuetify.breakpoint.name);
    },
    activeUsers() {
      return this.markers.filter((marker) => marker.generalInfo.activeUser) || [];
    },
    filteredUsers() {
      const usersInRadius = this.markers.filter((marker) => isPointWithinRadius(
        { latitude: marker.location.lat, longitude: marker.location.lng },
        { latitude: this.searchedCenter.lat, longitude: this.searchedCenter.lng },
        this.radius * 1000,
      ));
      const activeUsers = usersInRadius.filter((user) => user.generalInfo.activeUser) || [];
      if (this.appliedFilters.length === 0) return activeUsers;
      return activeUsers.filter((user) => this.appliedFilters.some(
        (el) => user.generalInfo.attributes.includes(el),
      )) || [];
    },
    categoryOptions() {
      return [
        { value: 0, text: this.$i18n.t('settings.categories.cat:0') },
        { value: 10, text: this.$i18n.t('settings.categories.cat:10') },
        { value: 20, text: this.$i18n.t('settings.categories.cat:20') },
        { value: 30, text: this.$i18n.t('settings.categories.cat:30') },
        { value: 31, text: this.$i18n.t('settings.categories.cat:31') },
        { value: 40, text: this.$i18n.t('settings.categories.cat:40') },
        { value: 50, text: this.$i18n.t('settings.categories.cat:50') },
        { value: 60, text: this.$i18n.t('settings.categories.cat:60') },
      ];
    },
  },
  mounted() {
    this.placeAddress = this.searchedPlace.address
      ? this.searchedPlace.address
      : localStorage.getItem('nh-place-searched-address');
    if (this.searchedPlace.location.lat == null && this.searchedPlace.location.lng == null){
      const cachedLocation = JSON.parse(localStorage.getItem('nh-place-searched-location'))
      this.SET_LOCATION_SEARCHED_PLACE(cachedLocation);
      this.searchPlaces({ geometry: {...cachedLocation} })
    }
    if (this.searchedCenter.lat == null && this.searchedCenter.lng == null)
      this.SET_LOCATION_SEARCHED_CENTER(JSON.parse(localStorage.getItem('nh-place-searched-location')));
  },
  data: () => ({
    radius: 1,
    placeAddress: '',
    listView: true,
    centerOnMarker: {},
    CATEGORY_IDS,
    appliedFilters: [],
  }),
  methods: {
    ...mapActions('places', ['searchPlaces', 'setSearchedAddress']),
    ...mapMutations('places', ['SET_LOCATION_SEARCHED_PLACE', 'SET_LOCATION_SEARCHED_CENTER']),
    test(marker) {
      this.centerOnMarker = marker;
    },
    scrollToCard(index) {
      this.listView = true;
      setTimeout(() => {
        const card = document.getElementById(`card-${index}`);
        card.scrollIntoView();
        card.addEventListener('transitionend', () => {
          card.classList.remove('zoomIn');
          card.classList.add('zoomOut');
        });
        if (card.classList.contains('zoomOut')) card.classList.remove('zoomOut');
        card.classList.add('zoomIn');
      }, 50);
    },
    async setPlace(place) {
      await this.searchPlaces(place);
      this.setSearchedAddress(place);
    },
    removeCategoryFilter(id) {
      this.appliedFilters.splice(this.appliedFilters.indexOf(id), 1);
    },
  },
};
</script>
<style scoped lang="scss">
    @import '~vuetify/src/styles/settings/_variables';

    .v-text-field {
        padding-top: 0 !important;
        margin-top: 0 !important;
    }

    .vue-slider-dot {
      z-index: 1;
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        .near-offer {
            display: flex;
            height: 100%;
            background-color: #F5B278;

            &__div {
                &--offer-list {
                    flex: 1;
                    width: 0;
                    padding-left: 30px;

                    &-filters {
                        display: flex;
                        flex-direction: row;
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    &-cards {
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

            &__card {
                margin-top: 20px;
                border-radius: 10px !important;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }

            &__map {
                flex: 1;
                width: 0;
                height: calc(100vh - 84p);
                position: sticky;
                top: 84px;
                margin-bottom: 20px;
            }

            &__input {
                &--autocomplete {
                    margin-top: 20px;
                }
            }

            &__span {
                &--slider {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;

                    &-text {
                        white-space: nowrap;
                        width: 240px;
                    }
                }
            }

            &__slider {
                width: 100% !important;
            }

            &__chip--filter-cat {
                margin-right: 10px;
            }
          &__autocomplete {
            flex: 1;
          }
        }
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
        .near-offer {
            display: flex;
            flex-direction: column;
            height: 100%;

            &__div {
                &--offer-list {
                    &-mobile {
                        /*height: calc(100vh - 84px);*/
                        /*height: 80vh;*/
                    }

                    &-filters {
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    &-cards {
                        height: 100%;
                        padding-left: 20px;
                        padding-right: 20px;

                        & > *:last-child {
                            padding-bottom: 30px;
                        }

                        &-cards:last-child {
                            padding-bottom: 30px;
                        }
                    }
                }

                &--card-subtitile {
                    color: white;
                }
            }

            &__card {
                margin-top: 20px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }

            &__map {
              height: calc(100vh - 84px - 200px);
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

            &__span {
                &--slider {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;

                    &-text {
                        white-space: nowrap;
                        width: 240px;
                        margin-right: 10px;
                    }
                }
            }

            &__slider {
                width: 100% !important;
            }
          &__autocomplete {
            flex: 1;
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
