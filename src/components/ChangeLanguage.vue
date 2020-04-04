<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
                    small
                    color="#3a4748"
                    v-on="on"
                    text
            >
                {{ $t(`languages.lang:${$i18n.locale}`) }}
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                    v-for="(lang, index) in availableLanguages"
                    :key="index"
                    @click="changeLanguage(lang)"
            >
                <v-list-item-title color="#3a4748">{{ $t(`languages.lang:${lang}`) }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    import { availableLanguages } from '@/i18n/index'
    export default {
        name: "ChangeLanguage",
        computed: {
          availableLanguages() {
              return availableLanguages
            }
        },
        methods: {
            changeLanguage(lang) {
                this.$i18n.locale = lang
                localStorage.setItem('nh-lang', lang)
            }
        }
    }
</script>

<style scoped>

</style>
