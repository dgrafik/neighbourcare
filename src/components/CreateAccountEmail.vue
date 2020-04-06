<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn
        text
        class="create-acc__button--activator button-color"
        v-on="on"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        {{ $t('createAccountEmail.button') }}
      </v-btn>
    </template>
    <v-card class="create-acc__card">
      <v-card-title class="create-acc__card--title">
        <h2
          v-t="'createAccountEmail.header'"
          class="create-acc__h2"
        />
      </v-card-title>
      <v-card-text class="create-acc__div">
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            class="create-acc__input"
            :rules="[rules.required, rules.emailValidation]"
            :placeholder="$t('common.email')"
            autofocus
          />
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            type="password"
            :placeholder="$t('common.password')"
          />
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, passwordConfirmationRule]"
            type="password"
            :placeholder="$t('createAccountEmail.confirmPassword')"
          />
          <v-switch
            v-model="acceptPrivacyPolicy"
            :rules="[rules.required]"
            inset
            color="#6CBD6F"
          >
            <template v-slot:label>
              <div class="create-acc__div--conditions">
                {{ $t('createAccountEmail.termsAndCon') }}
                <TermsAndCondition />
              </div>
            </template>
          </v-switch>
          <v-switch
            v-model="acceptTermsAndConditions"
            :rules="[rules.required]"
            inset
            color="#6CBD6F"
          >
            <template v-slot:label>
              <div class="create-acc__div--conditions">
                {{ $t('createAccountEmail.privacyPolicy') }}
                <PrivacyPolicy />
              </div>
            </template>
          </v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions class="create-acc__card--actions">
        <v-btn
          v-if="!loading"
          v-t="'createAccountEmail.action'"
          class="create-acc__button text-uppercase"
          :disabled="!valid"
          outlined
          @click="createAccount"
        />
        <v-progress-circular
          v-if="loading"
          class="create-acc__button"
          size="36"
          :width="3"
          color="#3a4748"
          indeterminate
        />
        <v-btn
          v-t="'common.cancel'"
          class="create-acc__button text-uppercase"
          text
          color="red"
          @click="sheet = false"
        />
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import firebase from '@/firebase';
import { mapMutations } from 'vuex';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import TermsAndCondition from '@/components/TermsAndCondition.vue';

export default {
  name: 'CreateAccountEmail',
  components: {
    PrivacyPolicy,
    TermsAndCondition,
  },
  data: () => ({
    sheet: false,
    email: '',
    password: '',
    confirmPassword: '',
    valid: true,
    loading: false,
    acceptPrivacyPolicy: false,
    acceptTermsAndConditions: false,
    rules: {
      required: (value) => !!value || 'Required.',
      emailValidation: (value) => !!value.match(/^$|^[a-zA-Z0-9._%+-.]+@[a-zA-Z0-9]+\.[a-z]+/) || 'Email is badly formatted',
    },
  }),
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.confirmPassword) || "Password doesn't match.";
    },
  },
  methods: {
    ...mapMutations('notification', ['SET_SUCCESS_SNACK', 'SET_ERROR_SNACK']),
    async createAccount() {
      try {
        this.loading = true;
        await firebase.auth.createUserWithEmailAndPassword(this.email, this.password);
        this.SET_SUCCESS_SNACK(this.$t('notifications.accCreated'));
        this.$emit('closeCreateAccSheet', true);
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.valid = true;
        this.loading = false;
        this.acceptPrivacyPolicy = false;
        this.acceptTermsAndConditions = false;
      } catch (e) {
        this.SET_ERROR_SNACK(e.message);
        this.password = '';
        this.confirmPassword = '';
        this.valid = true;
        this.loading = false;
        this.acceptPrivacyPolicy = false;
        this.acceptTermsAndConditions = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
    .button-color {
        color: #3a4748;
    }

    .create-acc {
        &__card {
            padding-top: 50px;
            padding-bottom: 50px;
            /*height: 100% !important;*/
            &--actions {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }

        &__h2 {
            font-size: 2.5rem;
            font-weight: 200;
            margin-bottom: 20px;
        }

        &__input {
            margin-top: 20px;
        }

        &__div {
            width: 50%;
            margin: auto;
            display: flex;
            flex-direction: column;

            &--conditions {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            }
        }

        &__button {
            margin: auto;
            margin-top: 20px;
            width: 20%;
        }
    }

    @media (min-width: 768px) {
        .create-acc {
            &__div {
                width: 50%;
                margin: auto;
                display: flex;
                flex-direction: column;
                padding: 0 !important;
            }

            &__button {
                margin-left: 0 !important;
                margin-right: 0 !important;
                margin-top: 20px;
                width: 20%;

                &--activator {
                    margin-top: 15px;
                }
            }

            &__card {
                &--title {
                    padding: 0 !important;
                    margin: auto;
                    width: 50%;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .create-acc {
            &__div {
                width: 75%;
                margin: auto;
                display: flex;
                flex-direction: column;
                padding: 0 !important;
            }

            &__button {
                /*margin: auto;*/
                margin-top: 20px;
                margin-left: 0 !important;
                margin-right: 0 !important;
                width: 60%;

                &--activator {
                    margin-top: 15px;
                }
            }

            &__card {
                &--title {
                    padding: 0 !important;
                    margin: auto;
                    width: 75%;
                }
            }
        }
    }
</style>
