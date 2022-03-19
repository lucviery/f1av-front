import { http } from "./config";

export default {
  getTableAtualizada: (categoryId, seasonId) => {
    return http.get(
      `result/category/${categoryId}/position?seasonId=${seasonId}`
    );
  },

  getTableConstructor: (seasonId) => {
    return http.get(`result/constructor?seasonId=${seasonId}`);
  },

  getTableEquip: (categoryId, seasonId) => {
    return http.get(
      `result/category/${categoryId}/equip-position?seasonId=${seasonId}`
    );
  },
};
