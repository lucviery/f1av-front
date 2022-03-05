import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConstructorView from "../views/ConstrutoresView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/constructor",
    name: "constructor",
    component: ConstructorView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
