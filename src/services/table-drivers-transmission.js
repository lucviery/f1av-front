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
};
