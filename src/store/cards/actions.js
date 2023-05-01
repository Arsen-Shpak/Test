import axios from "axios";

export default {
  async GET_CARDS_FROM_API({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/cards");
      commit("SET_CARDS_TO_STATE", response.data);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      alert("Error", err);
    }
  },
  async GET_CURRENT_CARD({ dispatch, commit }, currentInd) {
    try {
      const cards = await dispatch("GET_CARDS_FROM_API");
      // console.log(cards);
      const currentCard = cards.find(
        (element) => Number(element.id) === currentInd
      );
      commit("SET_CURRENT_CARD", currentCard);
      // console.log(currentCard);
    } catch (err) {
      alert("Error", err);
    }
  },
  // async GET_CURRENT_PHONE({ dispatch, commit }, id) {
  //   try {
  //     const phones = await dispatch("GET_PHONES_FROM_API");
  //     const currentPhone = phones.find((element) => element.itemId === id);
  //     commit("SET_CURRENT_PHONE", currentPhone);
  //     console.log(currentPhone);
  //   } catch (err) {
  //     alert("Error", err);
  //   }
  // },
};
