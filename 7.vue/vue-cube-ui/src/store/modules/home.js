import fecth from '@/api/home';
import types from '../actions-type';

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  actions: {
    async [types.SET_CATEGORIES]({ commit }) {
      const categories = await fecth.fetchCategory();
      commit(types.SET_CATEGORIES, categories);
    },
  },
  mutations: {
    [types.SET_CATEGORIES](state, payload) {
      state.categories = payload;
    },
  },
};
