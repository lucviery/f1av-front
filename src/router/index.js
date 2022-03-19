import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EquipView from "../views/EquipView.vue";
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
  {
    path: "/equip",
    name: "equip",
    component: EquipView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
