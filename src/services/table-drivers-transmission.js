import { http } from "./config";

export default {
  getTableAtualizada: () => {
    return http.get("season");
  },
};
