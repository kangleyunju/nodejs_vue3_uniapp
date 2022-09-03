import App from './App'
import store from './public/store.js'

import methods from './public/methods.js'
import diy from './public/diy.js'
Vue.mixin(methods).mixin(diy)

import messages from './locale/index'

// console.log = () => {}

Vue.prototype.$state = store.state
Vue.prototype.$change = store._mutations.change[0]

let i18nConfig = {
  locale: uni.getLocale(),
  messages,
  silentTranslationWarn: true
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif
