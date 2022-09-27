import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EquipView from "../views/cabine/EquipView.vue";
import DriversView from "../views/cabine/DriversView.vue";
import TeamsView from "../views/cabine/TeamsView.vue";
import TelemetriaView from "../views/telemetria/TelemetriaView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cabine/equips",
    name: "equip",
    component: EquipView,
  },
  {
    path: "/cabine/drivers",
    name: "drivers",
    component: DriversView,
  },
  {
    path: "/cabine/teams",
    name: "teams",
    component: TeamsView,
  },
  {
    path: "/telemetria/weather",
    name: "tabela",
    component: TelemetriaView,
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
