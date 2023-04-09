import { http } from "./config";

export default {
  getWeatherTelemetry: (schedule, sessionType) => {
    return http.get(`telemetry?scheduleId=${schedule}&sessionType=${sessionType}`);
  },

  getRealTimeTelemetry: (schedule) => {
    return http.get(`telemetry/real-time?scheduleId=${schedule}`);
  },

  getDetailsEvent: (schedule) => {
    return http.get(`telemetry/details-event?scheduleId=${schedule}`);
  },  

  getLapHistory: (participantId) => {
    return http.get(`telemetry/lap-history?participantId=${participantId}`);
  },  

  getScheduleClassification: (scheduleId) => {
    return http.get(`telemetry/schedule-classification?scheduleId=${scheduleId}`);
  }, 

};