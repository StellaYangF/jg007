import axios from 'axios';
import { Toast } from 'cube-ui';

const PRODUCTION = 'production';
const DEV_BASE_URL = 'http://localhost:3000/api';
const PRO_BASE_URL = '/';
let isResponseInterceptor = false;
const toggleLoading = (data, ajaxInsance, url) => {
  const ctx = ajaxInsance;
  if (isResponseInterceptor) {
    if (ctx.queue.length === 0) {
      ctx.toast.show();
    }
    ctx.queue[url] = url;
    return data;
  } else {
    delete ctx.queue[url];
    if (ctx.queue.length === 0) {
      ctx.toast.hide();
      return data;
    }
   return false;
  }
};

class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV !== PRODUCTION ? DEV_BASE_URL : PRO_BASE_URL;
    this.timeout = 3000;
    this.queue = {};
    this.toast = Toast.$create({
      txt: 'Loading...',
      time: 0,
    });
  }

  setInterceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      isResponseInterceptor = true;
      toggleLoading(config, this, url);
    }, err => Promise.reject(err));

    instance.interceptors.response.use((res) => {
      isResponseInterceptor = false;
      if (this.queue.length === 0) {
        this.toast.show();
      }
    }, err => Promise.reject(err));
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    this.setInterceptors(instance, options.url);
    return instance(config);
  }
}

export default new AjaxRequest();
