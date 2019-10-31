import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/index.vue';
import loadable from '@/utils/loadable';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/course',
    name: 'course',
    component: loadable(() => import('@/views/Course/index.vue')),
  },
  {
    path: '/profile',
    name: 'profile',
    component: loadable(() => import('@/views/Profile/index.vue')),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
