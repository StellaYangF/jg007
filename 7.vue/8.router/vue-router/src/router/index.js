import Vue from "vue";
import VueRouter from "vue-router";
// import VueRouter from '@/vue-router' // customized vue-router
import Home from "../views/Home.vue";
import A from "../components/A.vue";
import B from "../components/B.vue";

debugger;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    children: [
     
      {
        path: "b",
        name: "b",
        component: B
      }
    ]
  },
  {
    path: "/a",
    name: "a",
    component: A
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
