<template>
    <v-card color="#5C98C8" dark class="near-offer__card">
        <v-card-title class="offer-card__header">{{userInformation.generalInfo.name}}</v-card-title>
         <v-row>
         <v-col>
            <v-card-subtitle>
                <div class="offer-card__div--card-subtitile" v-t="'card.helpWith'" />
                <ul>
                    <li
                        v-for="(attr, index) in userInformation.generalInfo.attributes"
                        :key="index"
                        class="offer-card__li--card-attribute"
                >{{$t(`settings.categories.cat:${attr}`)}}</li>
                </ul>
              </v-card-subtitle>
         </v-col>
            <v-col v-if="userInformation.address.showAddress">
                <v-card-subtitle>
                    <div class="offer-card__div--card-subtitile">{{ $t('card.address') }}:</div>
                    <div class="offer-card__div--card-address">{{$t('address.street')}}: {{userInformation.address.street}} {{userInformation.address.houseNumber}}</div>
                    <div class="offer-card__div--card-address">{{$t('address.city')}}: {{userInformation.address.city}}</div>
                    <div class="offer-card__div--card-address">{{$t('address.country')}}: {{userInformation.address.country}}</div>
                </v-card-subtitle>
            </v-col>
         </v-row>
<!--          <v-card-actions>-->
<!--        <v-spacer></v-spacer>-->
        <v-divider class="mx-4"></v-divider>
            <v-card-text class="offer-card__card_text--chips">
                <span v-if="userInformation.generalInfo.showPhoneNumber">
                    <v-chip
                        @click="isPhoneNUmberVisible = true"
                        color="#6CBD6F"
                        text-color="white"
                    >
                        <span v-if="!isPhoneNUmberVisible">
                            <v-icon left>mdi-phone-outline</v-icon>
                            {{$t('common.showPhone')}}
                        </span>
                        <span v-else>
                            <v-icon left>mdi-phone-outline</v-icon>
                            <a class="offer-card__a" :href="`tel:${userInformation.generalInfo.number}`">{{userInformation.generalInfo.number}} </a>
                        </span>
                    </v-chip>
                </span>
                <span v-if="userInformation.generalInfo.showEmail">
                    <v-chip
                        @click="isEmailVisible = true"
                        color="#F5B278"
                        text-color="white"
                    >
                        <span v-if="!isEmailVisible">
                            <v-icon left>mdi-email-outline</v-icon>
                            {{$t('common.showEmail')}}
                        </span>
                        <span v-else>
                            <v-icon left>mdi-email-outline</v-icon>
                            <a class="offer-card__a" :href="`mailto:${userInformation.email}`">{{userInformation.email}}</a>
                        </span>
                    </v-chip>
                </span>
            </v-card-text>
<!--          </v-card-actions>-->
    </v-card>
</template>

<script>
    import { ATTRIBUTES_OPTIONS } from '@/utils/constants'

    export default {
        name: "OfferCard",
        props: {
            userInformation: {
                type: Object
            }
        },
        computed: {
            getAttributesTexts() {
                return this.userInformation.generalInfo.attributes.map(
                    attr => ATTRIBUTES_OPTIONS.find(x => x.value === attr)
                )
            }
        },
        data: () => ({
          isPhoneNUmberVisible: false,
          isEmailVisible: false
        })
    }
</script>

<style scoped lang="scss">
    .offer-card {
        &__header {
            color: white;
            font-size: 1.8rem;
            font-weight: 500;
        }

        &__li {
            &-attribute {
                color: #ededed;
                font-weight: 400;
            }
        }

        &__div {
            &--card {
                &-address {
                    color: #ededed;
                    font-weight: 400
                }
                &-subtitile {
                    color: #ededed;
                    font-size: 1rem;
                    font-weight: 500;
                }
            }
        }
        &__a {
            color: white !important;
        }
    }
    @media (min-width: 768px) {
        .offer-card {
            &__card_text {
                &--chips {
                    display: flex;
                    flex-direction: row;
                    & > *:not(:first-child) {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
    @media (max-width: 768px) {
        .offer-card {
            &__card_text {
                &--chips {
                    display: flex;
                    flex-direction: column;
                    & > *:not(:first-child) {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
