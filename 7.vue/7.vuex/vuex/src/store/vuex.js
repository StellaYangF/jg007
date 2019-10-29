let Vue;
const install = _vue => {
    Vue = _vue;
    console.log("install");
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        },
    })
};

const forEach = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        cb(key, obj[key]);
    })
}

class Store {
    constructor(options = {}) {
        this.s = new Vue({
            data() {
                return { state: options.state };
            }
        }); //維護全局數據
        let getters = options.getters;
        this.getters = {};
        forEach(getters, (getterName, fn) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => fn(this.state)
            })
        });

        // Object.keys(getters).forEach(getterName => {
        //     Object.defineProperty(this.getters, getterName, {
        //         get: () => {
        //             return getters[getterName](this.state);
        //         }
        //     })
        // });

        let mutations = options.mutations;
        this.mutations = {};
        forEach(mutations, (mutationName, fn) => {
            this.mutations[mutationName] = payload => fn(this.state, payload);
        });
        // Object.keys(mutations).forEach(mutationName => this.mutations[mutationName] = payload => {
        //     mutations[mutationName](this.state, payload);
        // })

        let actions = options.actions;
        this.actions = {};
        forEach(actions, (actionName, fn) => {
            this.actions[actionName] = payload => fn(this, payload);
        })
    }

    dispatch = (actionName, payload) => {
        this.actions[actionName](payload);
    }

    commit = (mutationName, payload) => { //this永远指向当前实例  => es7
        // 源码变量 控制 是否 是通过 mutation来更新状态
        this.mutations[mutationName](payload);
    }
    get state() {
        return this.s.state;
    }
}

export default {
    install,
    Store
};