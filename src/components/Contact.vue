<template>
  <v-dialog
    v-model="dialog"
    :width="isMobile ? '90%' : '50%'"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-t="'contact.header'"
        text
        small
        class="button-color text-uppercase"
        v-on="on"
      />
    </template>
    <v-card>
      <v-card-title>
        <span
          v-t="'contact.header'"
          class="headline"
        />
      </v-card-title>
      <v-card-text>
        <h4 v-t="'contact.idea'" />
        <h4 v-t="'contact.bug'" />
        <h4 v-t="'contact.touch'" />
        <h3 v-t="'contact.contact'" />
        <div>
          <v-icon class="mr-2">
            mdi-at
          </v-icon>
          <a href="mailto:dominik.grafik@gmail.com">dominik.grafik@gmail.com</a>
        </div>
        <div>
          <v-icon class="mr-2">
            mdi-phone-outline
          </v-icon>
          <a href="tel:605434145">605434145</a>
        </div>
        <br>
        <h3>{{ $t('contact.basic') }}:</h3>
        <div>
          <v-icon class="mr-2">
            mdi-account
          </v-icon>
          <label>Dominik Grafik Development</label>
        </div>
        <div class="contact__div--address">
          <v-icon class="contact__icon--address mr-2">
            mdi-map-marker-outline
          </v-icon>
          <span class="contact__span--address">
            <label>
              {{ $t('address.street') }}: Główna 6
            </label>
            <label>
              {{ $t('address.city') }}: Malin
            </label>
            <label>
              {{ $t('address.zipCode') }}: 55-114
            </label>
            <label>
              {{ $t('address.country') }}: Poland
            </label>
          </span>
        </div>
        <div>
          <v-icon class="mr-2">
            mdi-information-outline
          </v-icon>
          <label>{{ $t('contact.taxNumber') }}: 9151810718</label>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-t="'common.close'"
          color="green darken-1"
          text
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { MOBILE_BREAKPOINT_NAMES } from '@/utils/constants';

export default {
  name: 'TermsAndCondition',
  data: () => ({
    dialog: false,
  }),
  computed: {
    isMobile() {
      return MOBILE_BREAKPOINT_NAMES.includes(this.$vuetify.breakpoint.name);
    },
  },
};
</script>

<style scoped lang="scss">
    .button-color {
        color: #3a4748;
    }
    .v-application .headline {
        color: #3a4748 !important;
    }
    .contact {
        &__div {
            &--address {
                display: flex;
                flex-direction: row;
            }
        }
        &__span {
            &--address {
                display: flex;
                flex-direction: column;
            }
        }
         &__icon {
            &--address {
                align-self: flex-start;
            }
        }
    }
</style>
