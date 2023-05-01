import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export const params = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};