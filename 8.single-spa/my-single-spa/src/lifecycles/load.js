import {
  LOAD_ERROR,
  LOAD_RESOURCE_CODE,
  NOT_LOADED,
  SKIP_BECAUSE_BROKEN,
  NOT_BOOTSTRAPPED
} from "../applications/app.helper";
import {
  getProps,
  smellLikeAPromise,
  validateLifeCyclesFn,
  flatternFnArray
} from "./helper";
import { ensureAppTimeouts } from "../applications/timeouts";

export function toLoadPromise(app) {
  if(app.status !== NOT_LOADED && qpp.status !== LOAD_ERROR) {
    return Promise.resolve(app);
  }
  app.status = LOAD_RESOURCE_CODE;

  const loadPromise = app.loadApp(getProps(app));

  if (!smellLikeAPromise(loadPromise)) {
    console.log('app loadFunction must return a promise');
    app.status = SKIP_BECAUSE_BROKEN;
    return Promise.resolve(app);
  }
  return loadPromise.then(module => {
    let errorMsg = [];
    if (typeof module !== "object") {
      errorMsg.push(`app ${app.name} does not export anything`);
    }

    ["bootstrap", "mount", "unmount"].forEach(lifecycle => {
      if (!validateLifeCyclesFn(module[lifecycle])) {
        errorMsg.push(`app ${app.name} does not export ${lifecycle} as a function or function array`);
      }
    })
    
    if (errorMsg.length) {
      console.log(errorMsg);
      app.status = SKIP_BECAUSE_BROKEN;
      return app;
    }
    
    app.status = NOT_BOOTSTRAPPED;
    app.bootstrap = flatternFnArray(module.bootstrap, `app: ${app.name} bootstrap functions`);
  })
}
