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
            <h2 class="home-page__h2--find" v-t="'home.findHero'" />
            <gmap-autocomplete @place_changed="setPlace" @keypress.enter="$event.preventDefault()">
                <template v-slot:input="slotProps">
                    <v-text-field
                            class="home-page__input"
                            :placeholder="$t('home.search')"
                            ref="input"
                            @listeners="slotProps.listeners"
                            @attrs="slotProps.attrs"
                            color="#3a4748"
                    ></v-text-field>
                </template>
            </gmap-autocomplete>
        </div>
        <div class="home-page__div--login-options">
            <h2 class="home-page__h2" v-if="!userUID" v-t="'home.becameHero'" />
            <div class="home-page__div--login-buttons" v-if="!userUID">
                <Help :footer="false"/>
                <v-btn class="home-page__button--facebook" v-if="false">
                    <v-icon left>mdi-facebook</v-icon>
                    Log in with Facebook
                </v-btn>
                <!--        <v-img class="home-page__image&#45;&#45;google" src="@/assets/google-button.png"></v-img>-->
                <v-btn outlined @click="$emit('openLoginEmailSheet')" class="home-page__button--email">
                    <v-icon left>mdi-email-outline</v-icon>
                    {{$t('login.button')}}
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

    import {mapActions, mapState} from 'vuex'
    import CreateAccountEmail from '@/components/CreateAccountEmail.vue'
    import CreateAccountEmailMobile from '@/components/CreateAccountEmailMobile.vue'
    import Help from '@/components/Help.vue'

    export default {
        name: 'Home',
        components: {
            CreateAccountEmail,
            CreateAccountEmailMobile,
            Help
        },
        computed: {
            ...mapState('user', ['userUID']),
            isMobile() {
                return screen.width <= 768
            }
        },
        data() {
            return {
                center: {lat: 45.508, lng: -73.587},
                createAccSheet: false
            }
        },
        methods: {
            ...mapActions('places', ['searchPlaces', 'setSearchedAddress']),
            async setPlace(place) {
                await this.searchPlaces(place)
                this.setSearchedAddress(place)
                this.$router.push({name: 'Search'})
            },
            closeEmailCreateAcc(accCreated) {
                this.createAccSheet = false
                if (accCreated) {
                    this.$router.push({name: 'AccountInformation'})
                }
            }
        }
    }
</script>
<style scoped lang="scss">
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

    @media (min-width: 768px) {
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

    @media (max-width: 768px) {
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

            &__div {
                &--login-buttons {
                    /*width: 75%;*/
                    display: flex;
                    flex-direction: column;
                    margin: auto;
                }
            }
        }
    }
</style>
