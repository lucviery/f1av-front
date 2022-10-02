import { http } from "./config";

export default {
  getWeatherTelemetry: (schedule, sessionType) => {
    return http.get(`telemetry?scheduleId=${schedule}&sessionType=${sessionType}`);
  },

  getRealTimeTelemetry: (schedule) => {
    return http.get(`telemetry/real-time?scheduleId=${schedule}`);
  },

};