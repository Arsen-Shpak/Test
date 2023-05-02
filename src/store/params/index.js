import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

export const params = {
  state,
  mutations,
  getters,
  namespaced: true,
};