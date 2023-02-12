import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EquipView from "../views/cabine/EquipView.vue";
import DriversView from "../views/cabine/DriversView.vue";
import TeamsView from "../views/cabine/TeamsView.vue";
import TelemetriaView from "../views/telemetria/TelemetriaView.vue";
import RealTimeView from "../views/telemetria/RealTimeView.vue";
import OpponentDriverView from "../views/telemetria/OpponentDriverView.vue";
import ClassificationEquipCopa from "../views/cabine/ClassificationEquipCopa.vue"

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
    path: "/cabine/copa",
    name: "copa",
    component: ClassificationEquipCopa,
  },
  {
    path: "/telemetria/weather",
    name: "tabela",
    component: TelemetriaView,
  }, 
  {
    path: "/telemetria/real-time",
    name: "realtime",
    component: RealTimeView,
  }, 
  {
    path: "/telemetria/opponent-driver",
    name: "opponentdriver",
    component: OpponentDriverView,
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
