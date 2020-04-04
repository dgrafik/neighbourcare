<template>
    <v-dialog v-model="dialog" :width="isMobile ? '90%' : '50%'">
        <template v-slot:activator="{ on }">
            <v-btn text :small="footer" v-on="on" :class="{'help__button--open': !footer, 'button-color': true}">
                <v-icon left v-if="!footer">mdi-help</v-icon>
                {{footer ? $t('help.button') : $t('help.buttonHome')}}
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline" v-t="'help.title'"/>
            </v-card-title>
            <v-card-text>
                <h3 v-t="'help.header'" />
                <p>
                    <strong v-t="'help.1stParagraphBold'" /><span v-t="'help.1stParagraph'" />
                </p>
                <p>
                    <strong  v-t="'help.2ndParagraphBold'" />
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
                    <span v-t="'help.5thParagraph'"/>
                    <strong v-t="'help.5thParagraphBold'" />
                </p>
                <p v-t="'help.6thParagraph'" />
                <p>
                    {{$t('help.7thParagraph')}}
                    <strong v-t="'help.7thParagraphBold'" />
                </p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false" v-t="'common.close'" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "Help",
        props: {
            footer: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            isMobile() {
                return screen.width <= 768
            }
        },
        data: () => ({
            dialog: false
        })
    }
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
