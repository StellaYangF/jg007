import Vue from 'vue';
import Vuex from "./vuex";

Vue.use(Vuex);

const persits = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem("vuex-state", JSON.stringify(state));
  });
}

export default new Vuex.Store({
  plugins: [
    persits,
  ],
  modules: {
    a: {
      state: { a: 1 },
      modules: {
        c: {
          getters: {
            computedC(state) {
              return state.c + 100;
            }
          },
          state: { c: 1},
          mutations: {
            syncAdd(state, payload) {
              console.log("add");
              state.c + payload;
            }
          }
        }
      }
    },
    b: {
      state: { b: 1 },
    }
  },
  state: {
    age: 10,
    a: 100,
  },
  getters: {
    myAge(state) {
      return state.age + 18;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus({ commit }, payload) {
      setTimeout(() => {
        commit("syncMinus", payload);
      }, 1000);
    }
  }
})