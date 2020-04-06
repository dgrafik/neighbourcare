<template>
  <div class="home-page">
    <div class="home-page__div">
      <!--      <h1 class="shrink home-page__h1">Neighbour care</h1>-->
      <v-img
        alt="Neighbour care logo"
        class="shrink ml-auto mr-auto home-page__img"
        contain
        :src="require('@/assets/logo/logo.png')"
      />
      <h2
        v-t="'home.findHero'"
        class="home-page__h2--find"
      />
      <gmap-autocomplete
        @place_changed="setPlace"
        @keypress.enter="$event.preventDefault()"
      >
        <template v-slot:input="slotProps">
          <v-text-field
            ref="input"
            class="home-page__input"
            :placeholder="$t('home.search')"
            color="#3a4748"
            @listeners="slotProps.listeners"
            @attrs="slotProps.attrs"
          />
        </template>
      </gmap-autocomplete>
    </div>
    <div class="home-page__div--login-options">
<!--      <bulma-dropdown :options="options" @select="selected = $event" placeholder="Search"/>-->
<!--      <custom-google-autocomplete :options="options">-->
<!--        <div slot-scope="{ inputAttrs, inputEvents, loading, results }">-->
<!--          &lt;!&ndash;          <v-autocomplete&ndash;&gt;-->
<!--          &lt;!&ndash;        v-bind="inputAttrs"&ndash;&gt;-->
<!--          &lt;!&ndash;        :items="results"&ndash;&gt;-->
<!--          &lt;!&ndash;        color="white"&ndash;&gt;-->
<!--          &lt;!&ndash;        :search-input.sync="inputAttrs"&ndash;&gt;-->
<!--          &lt;!&ndash;      ></v-autocomplete>&ndash;&gt;-->
<!--          <input-->
<!--            v-bind="inputAttrs"-->
<!--            type="search"-->
<!--            v-on="inputEvents"-->
<!--          >-->
<!--          <div>{{inputAttrs}}</div>-->
<!--          <div v-if="loading">loading</div>-->
<!--          <div-->
<!--            v-for="(prediction, index) in results"-->
<!--            :key="'prediction-' + index"-->
<!--          >-->
<!--            {{ prediction.description }} DUPA!-->
<!--          </div>-->
<!--        </div>-->
<!--      </custom-google-autocomplete>-->
      <h2
        v-if="!userUID"
        v-t="'home.becameHero'"
        class="home-page__h2"
      />
      <div
        v-if="!userUID"
        class="home-page__div--login-buttons"
      >
        <Help :footer="false" />
        <v-btn
          v-if="false"
          class="home-page__button--facebook"
        >
          <v-icon left>
            mdi-facebook
          </v-icon>
          Log in with Facebook
        </v-btn>
        <!--        <v-img class="home-page__image&#45;&#45;google" src="@/assets/google-button.png"></v-img>-->
        <v-btn
          outlined
          class="home-page__button--email"
          @click="$emit('openLoginEmailSheet')"
        >
          <v-icon left>
            mdi-email-outline
          </v-icon>
          {{ $t('login.button') }}
        </v-btn>
        <CreateAccountEmail
          v-if="!isMobile"
          @closeCreateAccSheet="closeEmailCreateAcc"
        />
        <CreateAccountEmailMobile
          v-if="isMobile"
          @closeCreateAccDialMobile="closeEmailCreateAcc"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateAccountEmail from '@/components/CreateAccountEmail.vue';
import CreateAccountEmailMobile from '@/components/CreateAccountEmailMobile.vue';
import Help from '@/components/Help.vue';
import { MOBILE_BREAKPOINT_NAMES } from '@/utils/constants';
// import { BulmaDropdown } from 'vue-custom-google-autocomplete'

export default {
  name: 'Home',
  components: {
    CreateAccountEmail,
    CreateAccountEmailMobile,
    Help,
    // BulmaDropdown
  },
  watch: {
    // search(val) {
    //   console.log('xxdss');
    //   console.log(val);
    //   this.$gmapApiPromiseLazy().then(() => {
    //     const options = {
    //       componentRestrictions: { country: this.$i18n.locale },
    //     };
    //     // this.autocomplete = new this.google.maps.places.Autocomplete(document.getElementById('dupa1'), options);
    //     const geocoder = new this.google.maps.places.Autocomplete(
    //       document.getElementById('dupa1'),
    //       options,
    //     );
    //     console.log(geocoder.getPlace());
    //     geocoder.addListener('place_changed', this.onPlaceChanged);
    //     // (results, status) => {
    //     //   if (status === 'OK') {
    //     //     console.log(results)
    //     //   }
    //     // });
    //   });
    // },
  },
  computed: {
    ...mapState('user', ['userUID']),
    isMobile() {
      return MOBILE_BREAKPOINT_NAMES.includes(this.$vuetify.breakpoint.name);
    },
    items() {
      return [];
    },
  },
  data() {
    return {
      options: {
        apiKey: 'AIzaSyCs6tLc1gAnB4uqpIzgZciRxENSCsnncHg',
        deepSearch: true,
        cors: true,
        params: {},
        focus: false
      },
      search: null,
      center: {
        lat: 45.508,
        lng: -73.587,
      },
      createAccSheet: false,
    };
  },
  methods: {
    ...mapActions('places', ['searchPlaces', 'setSearchedAddress']),
    async setPlace(place) {
      await this.searchPlaces(place);
      this.setSearchedAddress(place);
      this.$router.push({ name: 'Search' });
    },
    closeEmailCreateAcc(accCreated) {
      this.createAccSheet = false;
      if (accCreated) {
        this.$router.push({ name: 'AccountInformation' });
      }
    },
    onPlaceChanged() {
      const place = this.autocomplete.getPlace();
      console.log(place);
      // if (!place.geometry) {
      //   // User entered the name of a Place that was not suggested and
      //   // pressed the Enter key, or the Place Details request failed.
      //   this.$emit('no-results-found', place, this.id);
      //   return;
      // }
      // if (place.address_components !== undefined) {
      //   // return returnData object and PlaceResult object
      //   this.$emit('placechanged', this.formatResult(place), place, this.id);
      //   // update autocompleteText then emit change event
      //   this.autocompleteText = document.getElementById(this.id).value;
      //   this.onChange();
      // }
    },
  },
};
</script>
<style scoped lang="scss">
  @import '~vuetify/src/styles/settings/_variables';

    .theme--light.v-input input, .theme--light.v-input textarea {
        color: #3a4748 !important;
    }

    .home-page {
        padding-bottom: 84px !important;
        background-color: #F5B278;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__div {
            width: 75%;
            text-align: center;

            &--login-options {
                width: 75%;
                margin-top: 30px;
                text-align: center;
            }
        }

        &__button {
            &--facebook {
                margin-top: 15px;
                color: white !important;
                background-color: #4267B2 !important;
                border-color: #357ebd !important;
            }

            &--email {
                margin-top: 15px;
                color: #3a4748 !important;
                background-color: transparent !important;
            }
        }
    }

    @media #{map-get($display-breakpoints, 'sm-only')} {
      .home-page {
        &__div {
          &--login-buttons {
            width: 50%;
            display: flex;
            flex-direction: column;
            margin: auto;
          }
        }
      }
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      .home-page {
        &__div {
          &--login-buttons {
            display: flex;
            flex-direction: column;
            margin: auto;
          }
        }
      }
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        .home-page {
            &__input {
                width: 50%;
                margin: auto;
                color: #3a4748 !important;
            }

            &__h1 {
                font-size: 3.5rem;
                font-weight: 700;
                margin-bottom: 50px;
                letter-spacing: 2px;
            }

            &__h2 {
                font-size: 2.4rem;
                font-weight: 500;

                &--find {
                    font-size: 2.4rem;
                    font-weight: 500;
                    margin-top: 30px;
                }
            }

            &__div {
                &--login-buttons {
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                    margin: auto;
                }
            }

            &__img {
                width: 50%;
                height: auto;
            }
        }
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
        .home-page {
            &__input {
                width: 90%;
                margin: auto;
            }

            &__h1 {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 50px;
                letter-spacing: 2px;
            }

            &__h2 {
                font-size: 2rem;
                font-weight: 500;

                &--find {
                    font-size: 2rem;
                    font-weight: 500;
                    margin-top: 30px;
                }
            }

        }
    }
</style>
