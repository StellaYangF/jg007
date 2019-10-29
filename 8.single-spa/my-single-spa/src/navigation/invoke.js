export function invoke() {};

import {
  getAppsToLoad,
  getAppsToMount,
  getAppsToUnmount,
  getMountedApps
} from "../applications/apps";
import {} from "../lifecycles/load";
import {} from "../lifecycles/bootstrap";
import {} from "../lifecycles/mount";
import {} from "../lifecycles/unmount";
import { isStarted } from "../start";
import {} from "./hijackLocations";

let loadAppsUnderway = false;
let pendingPromises = [];
