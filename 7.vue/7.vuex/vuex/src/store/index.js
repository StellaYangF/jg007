import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        a: {
            state: { a: 1 }
        },
        b: {
            state: { b: 2 }
        }
    },
    state: {
        age: 10,
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
        asyncMinus({ commit }, payload) { // 异步获取完后，提交到mutations
            setTimeout(() => {
                commit('syncMinus', payload)
            }, 1000);

        }
    },
    modules: {}
})