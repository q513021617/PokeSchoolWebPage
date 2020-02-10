// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import stores from './components/store/store'


import 'wc-messagebox/style.css'



import VueLocalStorage from 'vue-localstorage';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions

} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'



Vue.use(VueLocalStorage);
Vue.use(Vuetify,{
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#260c1a',
    secondary: '#f05d23',
    third:'#c5d86d',
    font:"#f7f7f2",

    accent: '#94d2e6',
    error: '#FF5252',
    info: '#f16f6f',
    success: '#4CAF50',
    warning: '#FF5252',
    login: '#f05d23'
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
// document.addEventListener('deviceready', function() {
new Vue({
  el: '#app',
  router,
  stores,
  VueLocalStorage,
  components: { App },
  template: '<App/>'
});
  // window.navigator.splashscreen.hide()
// }, false);
