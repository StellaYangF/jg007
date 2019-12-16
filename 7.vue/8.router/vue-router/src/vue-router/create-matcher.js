import { createRouteMap } from './create-route-map'
import { createRoute } from './history/base'

export function createMatcher (routes, router) {
  // collect all the routerPath
  // pathList: [ '/', '/about', '/about/a', '/about/b' ]
  const { pathList, pathMap } = createMatcher(routes);

  function addRoutes (routes) { // dynamic route authorization
    createRouteMap(routes, pathList, pathMap);
  }

  function match (location) {
    let record = pathMap[location]
    let local = {
      path: location
    }
    if (record) return createRoute(record, local)
    return createRoute(null, local)
  }

  function redirect () {}

  function alias () {}

  function _createRoute () {}

  return {
    match,
    addRoutes
  }
}

function matchRoute () {}

function resolveRecordPath () {}