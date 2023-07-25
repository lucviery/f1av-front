import axios from "axios";

export const http = axios.create({
  baseURL: "http://146.190.0.92:8089/api/",
  //baseURL: "http://localhost:8082/api/",
});
