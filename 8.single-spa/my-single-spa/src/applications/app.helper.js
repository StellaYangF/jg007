export const NOT_LOADED = 'NOT_LOADED';
export const LOAD_RESOURCE_CODE = 'LOAD_RESOURCE_CODE'
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
export const BOOTSTRAPPING = 'BOOTSTRAPPING';
export const NOT_MOUNTED = 'NOT_MOUNTED';
export const MOUNTING = 'MOUNTING';
export const MOUNTED = 'MOUNTED';
export const UNMOUNTING = 'UNMOUNTING';
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
export const LOAD_ERROR = 'LOAD_ERROR';
export const UPDATING = 'UPDATING';

export function notSkipped(app) {
  return app.status !== SKIP_BECAUSE_BROKEN;
}

export function withoutLoadError(app) {
  return app.status !== LOAD_ERROR;
}

export function isLoaded(app) {
  return app.status !== NOT_LOADED && app.status !== LOAD_ERROR && app.status !== LOAD_RESOURCE_CODE;
}

export function isntLoaded(app) {
  return !isLoaded(app);
}

export function isActive(app) {
  return app.status === MOUNTED;
} 

export function isntActive(app) {
  return !isActive(app);
}

export function shouldBeActive(app) {
  try {
    return app.activityWhen(window.location);
  }catch(e) {
    app.status = SKIP_BECAUSE_BROKEN;
    throw e;
  }
}

export function shouldntBeActive(app) {
  try {
    return !app.activityWhen(window.location);
  }catch(e) {
    app.status = SKIP_BECAUSE_BROKEN;
    throw e;
  }
}