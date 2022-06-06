import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/read",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "board" */ "../views/Read.vue"),
  },
  {
    path: "/writeform",
    component: () => import(/* webpackChunkName: "board" */ "../views/WriteForm.vue"),
  },
  {
    path: "/updateform",
    component: () => import(/* webpackChunkName: "board" */ "../views/UpdateForm.vue"),
  },
  {
    path: "/join",
    component: () => import(/* webpackChunkName: "auth" */ "../views/auth/Join.vue"),
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
