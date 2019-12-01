export default {
  SUB_NUM({ commit, state }, payload = {}) {
    console.log('I am param: ', payload);
    let { num } = state;
    num -= 1;
    // 调用 commit (对应的 mutation 方法) 修改数据
    commit('CHANGE_NUM', { num });
  }
};
