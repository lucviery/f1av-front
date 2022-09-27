import { http } from "./config";

export default {
  getWeatherTelemetry: () => {
    return http.get(`telemetry`);
  },

};