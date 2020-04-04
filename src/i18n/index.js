import VueI18n from 'vue-i18n'
import pl from '@/i18n/locale/pl.json'
import en from '@/i18n/locale/en.json'
// import axios from 'axios'
import Vue from 'vue'

Vue.use(VueI18n)

export const availableLanguages = ['en', 'pl']

const detectCurrentLang = () => {
  return localStorage.getItem('nh-lang') || (availableLanguages.includes(navigator.language) ? navigator.language : 'en')
}

export const i18n = new VueI18n({
  locale: detectCurrentLang(),
  fallbackLocale: detectCurrentLang(),
  messages: {
    en: en,
    pl: pl,
  }
})

// export const changgeLanguage = (lang) => {
//   if (availableLanguages.includes(lang)) {
//     loadedLanguages.includes(lang) ?
//   }
// }

// function setI18nLanguage (lang) {
//   i18n.locale = lang
//   axios.defaults.headers.common['Accept-Language'] = lang
//   document.querySelector('html').setAttribute('lang', lang)
//   return lang
// }

// export function loadLanguageAsync(lang) {
//   if (i18n.locale === lang) {
//     return Promise.resolve(setI18nLanguage(lang))
//   }
//
//   if (loadedLanguages.includes(lang)) {
//     return Promise.resolve(setI18nLanguage(lang))
//   }
//   console.log(`@/i18n/locale/${lang}.js`)
//   return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/locale/${lang}.js`).then(
//     messages => {
//       i18n.setLocaleMessage(lang, messages.default)
//       loadedLanguages.push(lang)
//       return setI18nLanguage(lang)
//     }
//   )
// }
