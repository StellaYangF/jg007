import axois from 'axios';
import { Toast } from 'cube-ui';

class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/';
    this.timeout = 3000;
    this.toast = Toast.$create({
      txt: 'loading...',
      time: 0,
    });
    this.queue = {};
  }

  setInterceptor(instance, url) {
    instance.interceptors.request.use((config) => {
      if (Object.keys(this.queue).length === 0) {
        this.toast.show();
      }
      this.queue[url] = url;
      return config;
    }, err => Promise.reject(err));
    instance.interceptors.response.use((res) => {
      delete this.queue[url];
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
      if (res.data.code === 0) {
        return res.data.data;
      }
      return false;
    }, err => Promise.reject(err));
  }

  request(options) {
    const instance = axois.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    this.setInterceptor(instance, options.url);
    return instance(config);
  }
}

export default new AjaxRequest();
