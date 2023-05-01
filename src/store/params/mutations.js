export default {
  ADD_SMILE_PARAMS(state, currentCard) {
    state.happySmile.push(currentCard);
  },
  ADD_SAD_PARAMS(state, currentCard) {
    state.sadSmile.push(currentCard);
  },
  ADD_HEART_PARAMS(state, currentCard) {
    state.heart.push(currentCard);
  },
  RESET_PARAMS(state) {
    state.happySmile.length = 0;
    state.sadSmile.length = 0;
    state.heart.length = 0;
  }
};
