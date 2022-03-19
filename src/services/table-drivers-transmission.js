import { http } from "./config";

export default {
  getTableAtualizada: (categoryId) => {
    return http.get(`cabine/category/${categoryId}/position`);
  },

  getTableConstructor: () => {
    return http.get(`cabine/constructor`);
  },

  getTableEquip: (categoryId) => {
    return http.get(`cabine/category/${categoryId}/equip-position`);
  },
};
