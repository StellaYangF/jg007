import Vue from 'vue';
import Vuex from './vuex';
import { ADD_AGE} from './type.constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10,
  },
  mutations: {
    ADD_AGE(state, payload) {
      state.age += payload;
    }
  },
  actions: {
    
  }
});