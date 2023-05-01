import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { params } from "./params";
import { cards } from "./cards";
// import { phones } from "./phones";
// import { favourites } from "./favourites";

const store = new Vuex.Store({
  modules: {
    params: params,
    cards:cards,
    // phones: phones,
    // cart: cart,
    // favourites: favourites,
  },
});
export default store;
