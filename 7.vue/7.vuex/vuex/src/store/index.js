import Vue from "vue";
// import Vuex from "vuex";
import Vuex from './vuex'

Vue.use(Vuex);
const persist = store => {
  store.subscribe((mutation, state)=>{
    localStorage.setItem('vuex-state', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  plugins: [
    persist,
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
          state: { c: 1 },
          mutations: {
            syncAdd(state, payload) {
              console.log("add");
            }
          }
        }
      }
    },
    b: { state: { b: 1 } }
  },

  state: {
    age: 10
  },

  getters: {
    myAge(state) {
      return state.age + 10;
    }
  },

  mutations: {
    // 发布订阅
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },

  actions: {
    asyncMinus({ commit }, payload) {
      // 异步获取完后，提交到mutations
      setTimeout(() => {
        commit("syncMinus", payload);
      }, 1000);
    }
  }
});
