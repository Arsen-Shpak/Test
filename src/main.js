import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/styles/styles.scss";
import VueSwing from "vue-swing";

new Vue({
  render: (h) => h(App),
  router,
  store,
  VueSwing,
}).$mount("#app");

