import Vue from 'Vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10,
  }
})
