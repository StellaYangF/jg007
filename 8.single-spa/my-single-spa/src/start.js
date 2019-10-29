import { invoke } from "./navigation/invoke";

let started = false;

export function start() {
  if (started) {
    return;
  }
  start = true;
  return invoke();
}

export function isStarted() {
  return started;
}