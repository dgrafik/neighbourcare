<template>
  <v-app
    id="main-container"
    class="main-font-color"
  >
    <div />
    <v-app-bar
      app
      color="#F5B278"
      dark
      flat
      height="84px"
      :absolute="$route.name === 'Home'"
      class="navbar__bar"
    >
      <div
        v-if="$route.name !== 'Home'"
        class="navbar__div--img"
      >
        <v-img
          alt="Neighbour care logo"
          class="shrink navbar__img"
          contain
          :src="require('@/assets/logo/logo.png')"
          @click="goToHomePage"
        />
        <!--          <h1 class="shrink navbar__h1" @click="goToHomePage">Neighbour care</h1>-->
      </div>

      <v-spacer />
      <ChangeLanguage />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-avatar
              :color="userUID ? '#C5E1A5' : '#3a4748'"
              size="48"
            >
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuContent"
            :key="index"
            @click="item.f"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
      :timeout="notification.timeout"
      top
      right
    >
      {{ notification.text }}
      <v-icon
        dark
        text
        @click="notification.visible = false"
      >
        mdi-close
      </v-icon>
    </v-snackbar>
    <LoginEmail
      :sheet="loginSheet"
      @click:outside="closeEmailLogin"
      @closeLoginEmailSheet="closeEmailLogin"
    />
    <v-content class="content generic--background">
      <router-view @openLoginEmailSheet="openEmailLogin" />
    </v-content>
    <v-footer
      color="#F5B278"
      min-height="84px"
    >
      <cookie-law theme="blood-orange">
        <div
          slot-scope="props"
          class="cookies__div"
        >
          <span slot="message">
            Neighbour care {{ $t('cache.info') }}
          </span>
          <span>
            <PrivacyPolicy />
            <v-btn
              color="#5C98C8"
              @click="props.accept"
            >
              <v-icon left>mdi-cookie</v-icon>
              {{ $t('cache.button') }}
            </v-btn>
          </span>
        </div>
      </cookie-law>
      <span
        v-if="!isMobile"
        class="footer__span--all-info"
      >
        <Help />
        <PrivacyPolicy />
        <span class="footer__span--date">{{ new Date().getFullYear() }} — </span><strong>Neighbour care</strong>
        <TermsAndCondition />
        <Contact />
      </span>
      <span
        v-if="isMobile"
        :class="{'footer__span--all-info': true, 'footer__span--all-info-space': $route.name === 'Search'}"
      >
        <span class="text-center">
          <span class="footer__span--date">{{ new Date().getFullYear() }} — </span><strong>Neighbour care</strong>
        </span>
        <Help />
        <PrivacyPolicy />
        <TermsAndCondition />
        <Contact />
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from '@/firebase';
import { mapActions, mapState, mapMutations } from 'vuex';
import LoginEmail from '@/components/LoginEmail.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import TermsAndCondition from '@/components/TermsAndCondition.vue';
import Contact from '@/components/Contact.vue';
import Help from '@/components/Help.vue';
import CookieLaw from 'vue-cookie-law';
import ChangeLanguage from '@/components/ChangeLanguage.vue';
import { MOBILE_BREAKPOINT_NAMES } from '@/utils/constants';

export default {
  name: 'App',
  components: {
    LoginEmail,
    PrivacyPolicy,
    TermsAndCondition,
    CookieLaw,
    Contact,
    Help,
    ChangeLanguage,
  },
  created() {
    this.createUserObserver();
  },
  mounted() {
    this.searchedPlace = {
      location: {
        lat: null,
        lng: null,
      },
      address: null,
    };
    // firebase.firebase.analytics().logEvent('notification_received')
  },
  computed: {
    ...mapState('user', ['userUID']),
    ...mapState('notification', ['notification']),
    menuContent() {
      return this.userUID
        ? [
          { title: this.$t('menu.home'), f: this.goToHomePage },
          { title: this.$t('menu.settings'), f: this.openAccountSettings },
          { title: this.$t('menu.logout'), f: this.logout },
        ]
        : [
          { title: this.$t('menu.login'), f: this.openEmailLogin },
        ];
    },
    isMobile() {
      return MOBILE_BREAKPOINT_NAMES.includes(this.$vuetify.breakpoint.name);
    },
  },
  data: () => ({
    loginSheet: false,
  }),
  methods: {
    ...mapActions('user', ['setUserUID']),
    ...mapMutations('notification', ['SET_SUCCESS_SNACK', 'SET_ERROR_SNACK']),
    async logout() {
      try {
        await firebase.auth.signOut();
        this.SET_SUCCESS_SNACK(this.$t('notifications.logged.out'));
      } catch (e) {
        this.SET_ERROR_SNACK(e.message);
      }
      await this.setUserUID({ uid: null });
      localStorage.removeItem('nh-user-information');
      localStorage.removeItem('nh-user-information-mail');
    },
    openAccountSettings() {
      this.$router.push({ name: 'AccountInformation' });
    },
    closeEmailLogin() {
      this.loginSheet = false;
    },
    openEmailLogin() {
      this.loginSheet = true;
    },
    createUserObserver() {
      firebase.auth.onAuthStateChanged(async (user) => {
        await this.setUserUID(user);
        // this.user = user
      });
    },
    goToHomePage() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
<style scoped lang="scss">
    @import '~vuetify/src/styles/settings/_variables';

    .main-font-color {
        color: #3a4748 !important;
        font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif;
    }
    .button-color {
        color: #3a4748 !important;
    }
  .v-application--is-ltr .v-toolbar__content > .v-btn.v-btn--icon:last-child {
    margin-right: 0 !important;
  }
  .v-btn--outlined {
      border: thin solid #3a4748;;
  }
  .v-icon {
      color: white;
  }
  .Cookie--blood-orange {
      background-color: #3a4748 !important;
  }
  .generic {
      &--background {
          background-color: #F5B278;
      }
  }
   @media (min-width: 768px) {
        .navbar {
            &__h1 {
              font-weight: 700;
              letter-spacing: 2px;
              font-size: 2.7rem;
              cursor: pointer;
              color: #3a4748;
          }
            &__div{
                &--img {
                    width: 90%;
                }
            }
            &__img {
                width: 30%;
                height: auto;
                margin-left: 30px;
                cursor: pointer;
            }
        }
       .footer {
           &__span {
                &--all-info {
                    margin: auto;
                }
               &--date {
                   color: #3a4748;
               }
           }
        }
       .cookies {
           &__div {
               display: flex;
               width: 100%;
               justify-content: space-between;
               align-items: center;
           }
       }
    }
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
        .navbar {
            &__h1 {
              font-weight: 700;
              letter-spacing: 2px;
              font-size: 2rem;
              cursor: pointer;
              color: #3a4748;
          }
          &__div {
              &--img {
                  width: 65%;
              }
          }
          &__img {
              cursor: pointer;
          }
        }
        .footer {
           &__span {
                &--all-info {
                    display: flex;
                    flex-direction: column;
                    margin: auto;
                    &-space {
                        margin-bottom: 54px;
                    }
                }
           }
            &--date {
                   color: #3a4748;
               }
        }
        .cookies {
           &__div {
               text-align: center;
               display: flex;
               flex-direction: column;
               width: 100%;
               justify-content: center;
               align-items: center;
           }
       }
    }
</style>
