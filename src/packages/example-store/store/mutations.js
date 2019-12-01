export default {
  CHANGE_NUM(state, payload) {
    const { num } = payload;
    state.num = num;
  }
};
