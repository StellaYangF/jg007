export let _Vue
export function install (Vue) {
  // check VueRouter.install has been called
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) { // vm root instance
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this);
        // reactive data
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else { // children instance
        this._routerRoot = (this.parent && this.parent._router) || this
      }
    },
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router;
    }
  })  
}