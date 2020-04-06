<template>
  <v-dialog
    v-model="dialog"
    :width="isMobile ? '90%' : '50%'"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        :small="footer"
        :class="{'help__button--open': !footer, 'button-color': true}"
        v-on="on"
      >
        <v-icon
          v-if="!footer"
          left
        >
          mdi-help
        </v-icon>
        {{ footer ? $t('help.button') : $t('help.buttonHome') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span
          v-t="'help.title'"
          class="headline"
        />
      </v-card-title>
      <v-card-text>
        <h3 v-t="'help.header'" />
        <p>
          <strong v-t="'help.1stParagraphBold'" /><span v-t="'help.1stParagraph'" />
        </p>
        <p>
          <strong v-t="'help.2ndParagraphBold'" />
          <ul>
            <li v-t="'help.cleaningPoint'" />
            <li v-t="'help.careOfBabyPoint'" />
            <li v-t="'help.takingDogPoint'" />
            <li v-t="'help.pickingUpPoint'" />
            <li v-t="'help.drivingUpPoint'" />
            <li v-t="'help.careOfPetPoint'" />
            <li v-t="'help.lessonsPoint'" />
          </ul>
        </p>
        <p v-t="'help.3rdParagraph'" />
        <p>
          <strong v-t="'help.4thParagraphBold'" />
          <span v-t="'help.4thParagraph'" />
          <strong v-t="'help.4thParagraphBold2'" />
          <span v-t="'help.4thParagraph2'" />
        </p>
        <p>
          <span v-t="'help.5thParagraph'" />
          <strong v-t="'help.5thParagraphBold'" />
        </p>
        <p v-t="'help.6thParagraph'" />
        <p>
          {{ $t('help.7thParagraph') }}
          <strong v-t="'help.7thParagraphBold'" />
        </p>
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
  name: 'Help',
  props: {
    footer: {
      type: Boolean,
      default: true,
    },
  },
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
    .v-application .headline {
        color: #3a4748 !important;
    }
    .button-color {
        color: #3a4748;
    }
    @media (min-width: 768px) {
        .help {
            &__button {
                &--open {
                    margin-top: 15px;
                }
            }
        }
    }
    @media (max-width: 768px) {
        .help {
            &__button {
                &--open {
                    margin-top: 15px;
                }
            }
        }
    }
</style>
