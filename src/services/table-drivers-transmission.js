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

  getTableEquipCopaComData: (categoryId, seasonId, dateCopa) => {
    return http.get(`result/category/${categoryId}/season/${seasonId}/classificationEquip?dateLocal=${dateCopa}`);
  },

  getTableEquipCopa: (categoryId, seasonId) => {
    return http.get(`result/category/${categoryId}/season/${seasonId}/classificationEquip`);
  },
};
