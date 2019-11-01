import axios from 'axios';
import { Toast } from 'cube-ui';

const PRODUCTION = 'production';
const DEV_BASE_URL = 'http://localhost:3000/api';
const PRO_BASE_URL = '/';

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
      if (this.queue.length === 0) {
        this.toast.show();
      }
      this.queue[url] = url;
      return config;
    }, err => Promise.reject(err));

    instance.interceptors.response.use((res) => {
      delete this.queue[url];
      if (this.queue.length === 0) {
        this.toast.hide();
      }
      if (res.data.code === 0) {
        return instance(res);
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
