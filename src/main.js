// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/style/reset.css'
import './common/style/fonts.css'
import './common/style/style.css'
import util from './common/util.js'
import store from './store/store.js'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(util);
Vue.prototype.$http = axios



  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
  })
