import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { params } from "./params";
import { cards } from "./cards";


const store = new Vuex.Store({
  modules: {
    params: params,
    cards:cards,
  },
});
export default store;
