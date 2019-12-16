import { install } from './install'
import { createMatcher } from './create-matcher'
import { HashHistory } from './history/hash'

export default class VueRouter {
  constructor(options = {}) {
    // matcher has two methods: match addRoutes
    this.matcher = createMatcher(options.routes || [], this)

    let mode = options.mode || 'hash'
    
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    this.mode = mode
    
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
    }
  }

  init (app) {
    const history = this.history;
    const setupHashLister = () => {
      history.setupListener();
    }
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashLister()
    )
    history.listen(route => app._route = route);
  }
  match(location) {
    return this.matcher.match(location);
  }
}
VueRouter.install = install