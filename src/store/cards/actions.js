import axios from "axios";

export default {
  async GET_CARDS_FROM_API({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      commit("SET_CARDS_TO_STATE", response.data);
      return response.data;
    } catch (err) {
      alert("Error", err);
    }
  },
  async GET_CURRENT_CARD({ dispatch, commit }, currentInd) {
    try {
      const cards = await dispatch("GET_CARDS_FROM_API");
      const currentCard = cards.find(
        (element) => Number(element.id) === currentInd
      );
      commit("SET_CURRENT_CARD", currentCard);
    } catch (err) {
      alert("Error", err);
    }
  },
};
