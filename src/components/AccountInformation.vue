<template>
  <div class="acc-info__div--main-container">
    <div class="acc-info__div">
      <h2
        v-t="'settings.header'"
        class="acc-info__h2"
      />
      <v-form
        ref="form"
        v-model="valid"
        class="acc-info__form"
      >
        <v-card class="acc-info__card">
          <v-card-title
            v-t="'settings.generalInf'"
            class="acc-info__h3"
          />
          <v-card-text>
            <v-text-field
              v-model="generalInfo.name"
              :placeholder="$t('settings.name')"
              :rules="[rules.required]"
              clearable
            />
            <v-text-field
              v-model="generalInfo.surname"
              :placeholder="$t('settings.surname')"
              clearable
            />
            <div class="acc-info__div--multiple">
              <v-text-field
                v-model="email"
                class="acc-info__input--multiple-left"
                :placeholder="$t('common.email')"
                type="email"
                :rules="[rules.required]"
                clearable
              />
              <v-text-field
                v-model="generalInfo.number"
                class="acc-info__input--multiple-right"
                :placeholder="$t('settings.phone')"
                type="number"
                :rules="[rules.required]"
                clearable
              />
            </div>
            <v-autocomplete
              v-model="generalInfo.attributes"
              :items="attributesOptions"
              chips
              small-chips
              :label="$t('settings.chooseCategory')"
              multiple
              deletable-chips
              clearable
              solo
              :rules="[attributesRequired]"
            />
            <v-tooltip
              v-if="canNotGeoLocateUser"
              left
              max-width="90%"
            >
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-switch
                    v-model="generalInfo.activeUser"
                    disabled
                    :label="$t('settings.visible')"
                    color="#6CBD6F"
                    hide-details
                    inset
                  />
                </div>
              </template>
              <span>{{ $t('settings.visibleError') }}</span>
            </v-tooltip>
            <v-switch
              v-else
              v-model="generalInfo.activeUser"
              :label="$t('settings.visible')"
              color="#6CBD6F"
              hide-details
              inset
            />
            <v-switch
              v-model="generalInfo.showEmail"
              :label="$t('common.showEmail')"
              :rules="[evenOneContactMethodEnabled]"
              color="#6CBD6F"
              inset
            />
            <v-switch
              v-if="generalInfo.number"
              v-model="generalInfo.showPhoneNumber"
              :rules="[evenOneContactMethodEnabled]"
              :label="$t('common.showPhone')"
              color="#6CBD6F"
              inset
            />
          </v-card-text>
        </v-card>

        <v-card class="acc-info__card">
          <v-card-title
            v-t="'settings.addressInf'"
            class="acc-info__h3"
          />
          <v-card-text>
            <p>
              {{ $t('settings.privacyInfo') }}
            </p>
            <v-switch
              v-model="address.showAddress"
              :label="$t('settings.addressVisible')"
              color="#6CBD6F"
              hide-details
              inset
            />
            <div v-if="address.showAddress || canNotGeoLocateUser">
              <div class="acc-info__div--multiple">
                <v-text-field
                  v-model="address.street"
                  class="acc-info__input--multiple-left"
                  :placeholder="$t('address.street')"
                  clearable
                  :rules="[streetRequired]"
                />
                <v-text-field
                  v-model="address.houseNumber"
                  class="acc-info__input--multiple-right"
                  :placeholder="$t('address.streetNum')"
                  :rules="[houseNumberRequired]"
                  clearable
                />
                <!--                        <v-text-field-->
                <!--                                class="acc-info__input&#45;&#45;multiple-right"-->
                <!--                                placeholder="Flat number"-->
                <!--                                v-model="address.flatNumber"-->
                <!--                        ></v-text-field>-->
              </div>
              <div class="acc-info__div--multiple">
                <v-text-field
                  v-model="address.zipCode"
                  class="acc-info__input--multiple-left"
                  :placeholder="$t('address.zipCode')"
                  clearable
                />
                <v-text-field
                  v-model="address.city"
                  class="acc-info__input--multiple-right"
                  :placeholder="$t('address.city')"
                  :rules="[cityRequired]"
                  clearable
                />
              </div>
              <v-text-field
                v-model="address.country"
                :placeholder="$t('address.country')"
                :rules="[countryRequired]"
                clearable
              />
            </div>
          </v-card-text>
        </v-card>
        <div v-if="false">
          <h3 class="acc-info__h3">
            Social media
          </h3>
          <v-text-field
            v-model="socialMedia.facebook"
            placeholder="Facebook account link"
            clearable
          />
        </div>
        <v-card class="acc-info__card">
          <v-card-title
            v-t="'settings.changePass'"
            class="acc-info__h3"
          />
          <v-card-text>
            <v-text-field
              v-model="password"
              :placeholder="$t('common.password')"
              type="password"
              :rules="[passwordConfirmationRule]"
            />
            <v-text-field
              v-model="confirmPassword"
              :placeholder="$t('createAccountEmail.confirmPassword')"
              type="password"
              :rules="[passwordConfirmationRule]"
            />
          </v-card-text>
        </v-card>
      </v-form>
      <v-btn
        v-t="'settings.action'"
        class="acc-info__button text-uppercase"
        color="#C5E1A5"
        @click="save"
      />
    </div>
  </div>
</template>r

<script>
import { gmapApi } from 'vue2-google-maps';
import { mapMutations, mapState } from 'vuex';
import firebase from '@/firebase';
import { ADDRESS_GEOCODER_MAP } from '@/utils/constants';

export default {
  name: 'AccountInformation',
  props: {
    alreadyCreated: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (!this.userInformation.generalInfo || !this.userInformation.address || !this.userInformation.socialMedia && !this.userInformation.coordinates) {
      this.generalInfo = { ...this.userInformation.generalInfo };
      this.address = { ...this.userInformation.address };
      this.socialMedia = { ...this.userInformation.socialMedia };
      this.location = { ...this.userInformation.location };
    } else if (JSON.parse(localStorage.getItem('nh-user-information')) !== null) {
      const {
        generalInfo, address, socialMedia, location,
      } = JSON.parse(localStorage.getItem('nh-user-information'));
      this.generalInfo = { ...generalInfo };
      this.address = { ...address };
      this.socialMedia = { ...socialMedia };
      this.location = { ...location };
    } else {
      this.SET_INFO_SNACK(this.$t('notifications.provideInfo'));
    }
    this.email = this.userInformation.email || localStorage.getItem('nh-user-information-mail');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.newLocation.lat = position.coords.latitude;
        this.newLocation.lng = position.coords.longitude;
        await this.getGeocodeAddress();
      });
    }
    if (this.isLocalizationEmpty && this.isAddressEmpty) this.generalInfo.activeUser = false;
  },
  computed: {
    ...mapState('user', ['userUID', 'userInformation', 'userObject']),
    google: gmapApi,
    passwordConfirmationRule() {
      return () => (this.password === this.confirmPassword) || "Password doesn't match.";
    },
    attributesRequired() {
      return () => (!!this.generalInfo.attributes.length) || 'Required';
    },
    fullAddress() {
      return this.address.flatNumber
        ? `${this.address.street} ${this.address.houseNumber}/${this.address.flatNumber}, ${this.address.zipCode}, ${this.address.city}, ${this.address.country}`
        : `${this.address.street} ${this.address.houseNumber}, ${this.address.zipCode}, ${this.address.city}, ${this.address.country}`;
    },
    evenOneContactMethodEnabled() {
      return () => (this.generalInfo.showPhoneNumber || this.generalInfo.showEmail)
                    || 'At least one contact method should be enabled if account is public';
    },
    streetRequired() {
      if (!this.isLocalizationEmpty) return true;
      return !!this.address.street || this.addressError;
    },
    houseNumberRequired() {
      if (!this.isLocalizationEmpty) return true;
      return !!this.address.houseNumber || this.addressError;
    },
    cityRequired() {
      if (!this.isLocalizationEmpty) return true;
      return !!this.address.city || this.addressError;
    },
    countryRequired() {
      if (!this.isLocalizationEmpty) return true;
      return !!this.address.houseNumber || this.addressError;
    },
    attributesOptions() {
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
    isAddressEmpty() {
      return !(this.address.street && this.address.houseNumber && this.address.city && this.address.country);
    },
    canNotGeoLocateUser() {
      return this.isLocalizationEmpty && this.isAddressEmpty;
    },
    isLocalizationEmpty() {
      return !this.location.lat && !this.location.lng && !this.newLocation.lat && !this.newLocation.lng;
    },
  },
  watch: {
    userUID(newVal) {
      if (!newVal) this.$router.push({ name: 'Home' });
    },
  },
  data: () => ({
    generalInfo: {
      name: '',
      surname: '',
      phone: '',
      attributes: [],
      showEmail: false,
      showPhoneNumber: true,
      activeUser: true,
    },
    address: {
      street: '',
      houseNumber: '',
      zipCode: '',
      city: '',
      country: '',
      showAddress: false,
    },
    location: {
      lat: null,
      lng: null,
    },
    newLocation: {
      lat: null,
      lng: null,
    },
    socialMedia: {
      facebook: '',
    },
    email: '',
    password: '',
    confirmPassword: '',
    valid: true,
    rules: {
      required: (value) => !!value || 'Required.',
    },
    addressError: 'This field is required, as we can not get you position. '
                + 'We can get your position based on address or enable localization.',
  }),
  methods: {
    ...mapMutations('notification', ['SET_SUCCESS_SNACK', 'SET_INFO_SNACK', 'SET_ERROR_SNACK']),
    ...mapMutations('user', ['SET_USER_INFORMATION']),
    async save() {
      this.$refs.form.validate();
      if (!this.valid) {
        this.SET_ERROR_SNACK(this.$t('notifications.requiredError'));
        return;
      }
      await this.changeEmail();
      await this.changePassword();
      if ((this.newLocation.lat && this.newLocation.lng)
                    && (this.newLocation.lat !== this.location.lat) && (this.newLocation.lng !== this.location.lng)) {
        await this.setToFirestore(this.newLocation.lat, this.newLocation.lng);
      } else if (!this.location.lat && !this.location.lng) {
        this.$gmapApiPromiseLazy().then(() => {
          const geocoder = new this.google.maps.Geocoder();
          const address = this.fullAddress;
          geocoder.geocode({ address }, async (results, status) => {
            const { geometry } = status === 'OK' ? results[0] : null;
            await this.setToFirestore(geometry.location.lat(), geometry.location.lng());
          });
        });
      }
    },
    async setToFirestore(lat, lng) {
      if (lat != null || lng != null) {
        try {
          const payload = {
            generalInfo: this.generalInfo,
            address: this.address,
            socialMedia: this.socialMedia,
            email: this.email,
            coordinates: new firebase.firebase.firestore.GeoPoint(lat, lng),
          };
          await firebase.geocollection.doc(this.userUID).set(payload);
          this.SET_SUCCESS_SNACK(this.$t('notifications.accUpdates'));
          this.SET_USER_INFORMATION(payload);
          localStorage.setItem('nh-user-information', JSON.stringify(payload));
        } catch (e) {
          this.SET_ERROR_SNACK(e.message);
        }
      } else {
        this.SET_ERROR_SNACK('Some error occur during geocoding!');
      }
    },
    async getGeocodeAddress() {
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new this.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: this.newLocation.lat, lng: this.newLocation.lng } },
          (results, status) => {
            if (status === 'OK') {
              results[0].address_components.forEach((element) => {
                for (const [variable, addressType] of Object.entries(ADDRESS_GEOCODER_MAP)) {
                  if (element.types.every((value, index) => value === addressType[index])) {
                    this.address[variable] = element.long_name;
                    break;
                  }
                }
              });
            }
          });
      });
    },
    async changeEmail() {
      if (this.userObject.email !== this.email && !this.email) {
        try {
          await firebase.auth.user.updateEmail(this.email);
        } catch (e) {
          this.SET_ERROR_SNACK(e.message);
        }
      }
    },
    async changePassword() {
      if (this.password && this.confirmPassword) {
        try {
          await firebase.auth.currentUser.updatePassword(this.password);
          this.password = '';
          this.confirmPassword = '';
        } catch (e) {
          this.SET_ERROR_SNACK(e.message);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
    @import '~vuetify/src/styles/settings/_variables';

    .acc-info {
        &__h2 {
            font-size: 2.5rem;
            font-weight: 500;
            margin-bottom: 20px;
            margin-top: 20px;
        }

        &__h3 {
            font-size: 1.5rem;
            font-weight: 200;
            margin-bottom: 15px;
            margin-top: 30px;
        }

        &__card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            border-radius: 10px !important;
        }

        &__input {
            &--multiple-left {
                margin-right: 15px;
                flex-grow: 0;
                flex-basis: 50%;
            }

            &--multiple-right {
                margin-left: 15px;
                flex-grow: 0;
                flex-basis: 50%;
            }
        }
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        .acc-info {
            &__div {
                margin-top: 8vh;
                margin: auto;
                padding-bottom: 50px;
                display: flex;
                flex-direction: column;
                width: 75%;

                &--multiple {
                    display: flex;
                    flex-direction: row;
                }

                &--main-container {
                    background-color: #F5B278;
                }
            }

            &__card--gen-info {
                /*color: white !important;*/
            }

            &__button {
                margin-top: 30px !important;
                margin: auto;
                width: 20%;
                color: white;
            }
        }
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
        .acc-info {
            &__div {
                margin-top: 8vh;
                margin: auto;
                padding-bottom: 50px;
                display: flex;
                flex-direction: column;
                width: 90%;

                &--multiple {
                    display: flex;
                    flex-direction: row;
                }
            }

            &__button {
                margin-top: 30px !important;
                margin: auto;
                width: 50%;
                color: white;
            }
        }

    }
</style>
