import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test1: null,
    test2: null,
    test3: null,
    test4: null
  },
  getters: {
    test1: state => {
      return state.test1;
    }
  },
  mutations: {
    TEST1(state, data) {
      state.test1 = data;
    }
  },
  actions: {}
});
