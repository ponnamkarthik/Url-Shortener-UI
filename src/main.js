// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

import VueResource from 'vue-resource'
import SocialSharing from 'vue-social-sharing'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueClipboard)
Vue.use(SocialSharing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
